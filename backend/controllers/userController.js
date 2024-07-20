const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const cerateToken = require('../utils/createToken.js');

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
    cerateToken(res, newUser._id);

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

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!existingUser || !isPasswordValid) {
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

  console.log(user);

  if (user) {
    user.nama_lengkap = req.body.nama_lengkap || user.nama_lengkap;
    user.nomor_hp = req.body.nomor_hp || user.nomor_hp;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.status = req.body.status || user.status;
    user.tempat_tinggal = req.body.tempat_tinggal || user.tempat_tinggal;
    user.tanggal_lahir = req.body.tanggal_lahir || user.tanggal_lahir;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await user.save();

    res.json({
      nama_lengkap: updateUser.nama_lengkap,
      nomor_hp: updateUser.nomor_hp,
      email: updateUser.email,
      gender: updateUser.gender,
      status: updateUser.status,
      tempat_tinggal: updateUser.tempat_tinggal,
      tanggal_lahir: updateUser.tanggal_lahir,
      password: updateUser.password,
    });
  } else {
    res.status(404).send('User not found');
  }
};

//  ADMIN KONOHA
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().limit(20);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(404).send('User not found');
  }
};

const getAllUserById = async (req, res) => {
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
  getAllUsers,
  getAllUserById,
  deleteUserById,
  updateUserById,
};
