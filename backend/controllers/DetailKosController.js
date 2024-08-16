const User = require('../models/User.js');
const DetailKos = require('../models/DetailKos.js');

// user controller
const reviewCurrentKos = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const kos = await DetailKos.findById(req.params.id);
    const name = await User.findById(req.user._id).select('nama_lengkap');

    if (!kos) return res.status(404).send('Kos not found');

    const review = {
      nama: name.nama_lengkap,
      rating,
      comment,
    };

    kos.reviews.push(review);

    kos.numReviews = kos.reviews.length;

    kos.ratings =
      kos.reviews.reduce((acc, item) => acc + item.ratings, 0) /
      kos.reviews.length;

    const newComment = await kos.save();

    return res.status(200).json(newComment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};

// pemilik controller
const editProfileCurrentKos = async (req, res) => {
  const {
    namaKos,
    alamat,
    jenis,
    kota,
    targetArea,
    hargaPerbulan,
    linkGmap,
    fasilitas,
    deskripsiKos,
    peraturanKos,
  } = req.fields;

  fasilitas = fasilitas.split(',');
  peraturanKos = peraturanKos.split(',');

  try {
    if (
      !namaKos ||
      !alamat ||
      !jenis ||
      !kota ||
      !targetArea ||
      !hargaPerbulan ||
      !linkGmap ||
      !deskripsiKos ||
      fasilitas ||
      !peraturanKos
    ) {
      return res.status(400).send({
        error: 'Semua field wajib di isi',
      });
    }

    const detailKos = await DetailKos.findByIdAndUpdate(req.params.id);

    if (!detailKos) res.status(404).json({ msg: 'Kos tidak ada' });

    if (detailKos) {
      detailKos.namaKos = namaKos;
      detailKos.alamat = alamat;
      detailKos.jenis = jenis;
      detailKos.kota = kota;
      detailKos.targetArea = targetArea;
      detailKos.hargaPerbulan = hargaPerbulan;
      detailKos.linkGmap = linkGmap;
      detailKos.fasilitas = fasilitas;
      detailKos.deskripsiKos = deskripsiKos;
      detailKos.peraturanKos = peraturanKos;
    }

    await detailKos.save();

    res.status(201).json({
      detailKos,
      statusCode: 201,
      message: 'Kos Berhasil di ubah',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};

// Admin controller
const getAllKos = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, parseInt(limit));

    const result = await DetailKos.aggregate([
      {
        $lookup: {
          from: 'pemiliks', // Nama koleksi yang tepat
          localField: 'idPemilik',
          foreignField: '_id',
          as: 'Pemilik',
        },
      },
      {
        $unwind: '$Pemilik', // Mengurai array Pemilik agar menjadi objek
      },
      {
        $project: {
          nama_kos: 1,
          alamat: 1,
          nama_pemilik: '$Pemilik.nama', // Hanya menampilkan field yang diperlukan
        },
      },
    ])
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .exec();

    const count = await DetailKos.countDocuments();

    res.status(200).json({
      result,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const deleteKosById = async (req, res) => {
  try {
    const kos = await DetailKos.findByIdAndDelete(req.params.id);
    if (!kos) return res.status(404).send('Kos not found');

    res.status(200).send('Kos deleted');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllKos,
  deleteKosById,
  reviewCurrentKos,
  editProfileCurrentKos,
};
