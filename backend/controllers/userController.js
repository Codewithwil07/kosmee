const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const Pemilik = require('../models/Pemilik.js');
const cerateToken = require('../utils/createToken.js');
const DetailKos = require('../models/DetailKos.js');

const userRegister = async (req, res) => {
  let {
    nama_lengkap,
    nomor_hp,
    email,
    gender,
    status,
    tempat_tinggal,
    tanggal_lahir,
    password,
  } = req.body;

  const existingUser = await User.findOne({ nama_lengkap, email });
  if (existingUser)
    return res.status(400).send('nama lengkap dan email sudah ada!');

  password = bcrypt.hashSync(password, 10);

  const newUser = new User({
    nama_lengkap,
    nomor_hp,
    email,
    gender,
    status,
    tempat_tinggal,
    tanggal_lahir,
    password,
  });

  try {
    newUser.save();

    res.status(200).send({ nama: nama_lengkap, email: email });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error.message);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    cerateToken(res, existingUser._id);

    res.status(200).json({
      _id: existingUser._id,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

const userCurrentLogout = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json('Logged out Successfully');
};

// USER
const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  user
    ? res.status(200).json({
        _id: user._id,
        username: user.nama_lengkap,
        email: user.email,
      })
    : res.status(404).json({ message: 'User not found' });
};

const editProfileCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.nama_lengkap = req.body.nama_lengkap || user.nama_lengkap;
    user.nomor_hp = req.body.nomor_hp || user.nomor_hp;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.status = req.body.status || user.status;
    user.tempat_tinggal = req.body.tempat_tinggal || user.tempat_tinggal;
    user.tanggal_lahir = req.body.tanggal_lahir || user.tanggal_lahir;

    const updateUser = await user.save();

    res.json({
      nama_lengkap: updateUser.nama_lengkap,
      nomor_hp: updateUser.nomor_hp,
      email: updateUser.email,
      gender: updateUser.gender,
      status: updateUser.status,
      tempat_tinggal: updateUser.tempat_tinggal,
      tanggal_lahir: updateUser.tanggal_lahir,
    });
  } else {
    res.status(404).send('User not found');
  }
};

const editPasswordCurrentUser = async (req, res) => {
  let { newPassword, confPassword } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    } else if (newPassword !== confPassword) {
      return res.status(404).send('Password tidak cocok');
    } else if (newPassword === confPassword) {
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.status(200).send('Password berhasil diubah');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};

// PEMILIK KOST

const registerKos = async (req, res) => {
  const {
    nama,
    email,
    nomorHp,
    password,
    namaKos,
    alamat,
    jenis,
    kota,
    targetArea,
    hargaPerbulan,
    linkGmap,
    fasilitas,
  } = req.fields;

  try {
    if (
      !nama ||
      !email ||
      !nomorHp ||
      !password ||
      !namaKos ||
      !alamat ||
      !jenis ||
      !kota ||
      !targetArea ||
      !hargaPerbulan ||
      !linkGmap
    ) {
      return res.status(400).send({
        error:
          'Semua field wajib diisi: namaKos, alamat, jenis, kota, targetArea, hargaPerbulan, linkGmap',
      });
    }

    // Check if email already exists
    const existingPemilik = await Pemilik.findOne({ email });
    if (existingPemilik) {
      return res.status(400).send({ error: 'Email already exists' });
    }

    // Validate password
    if (password.length < 8) {
      return res
        .status(400)
        .send({ error: 'Password must be at least 8 characters long' });
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      return res.status(400).send({
        error:
          'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new Pemilik
    const newPemilik = new Pemilik({
      nama,
      email,
      nomorHp,
      password: hashPassword,
    });

    // Create new Kos
    const newKos = new DetailKos({
      namaKos,
      alamat,
      jenis,
      kota,
      targetArea,
      hargaPerbulan,
      linkGmap,
      fasilitas,
    });

    await newPemilik.save();
    await newKos.save();

    res.status(201).send({ newPemilik, newKos });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: 'Server error' });
  }
};

const loginpemilikKos = async (req, res) => {
  const { email, password } = req.body;
  try {
    const pemilik = await Pemilik.findOne({ email });
    if (!pemilik) return res.status(404).send('email invalid');

    const comparePass = await bcrypt.compare(password, pemilik.password);
    if (!comparePass) return res.status(401).send('password incorrect');

    cerateToken(res, pemilik._id);
    res.status(200).json({ email: email, password: password });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};

const logoutPemilikKos = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json('Logged out Successfully');
};

//  ADMIN KONOHA
const getAllUsers = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, parseInt(limit));

    const users = await User.find({})
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .exec();

    const count = await User.countDocuments();

    res.json({
      users,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    console.error(error.message);
    res.status(404).send('User not found');
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(404).send('User not found');
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id);

    if (!user) return res.status(404).send('User not found');

    if (user) {
      user.email = req.body.email;
      if (req.body.password)
        user.password = await bcrypt.hash(req.body.password, 10);
    }

    user.save();

    res.status(200).send('updated succesfully');
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  userRegister,
  userLogin,
  userCurrentLogout,
  getCurrentUser,
  editProfileCurrentUser,
  editPasswordCurrentUser,
  registerKos,
  loginpemilikKos,
  logoutPemilikKos,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
};
