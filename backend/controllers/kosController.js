const DetailKos = require('../models/DetailKos.js');

// Fitures controllers
const fetchFavoriteKos = async (req, res) => {
  try {
    const kos = await DetailKos.find().where('ratings').gt(1); // greater than

    if (kos.length === 0) return res.status(404).send('Tidak ada kos favorite');

    res.status(200).json(kos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Admin controller
const getAllKos = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;

    const result = await DetailKos.aggregate([
      {
        $lookup: {
          from: 'pemiliks', // Nama koleksi yang tepat
          localField: 'idPemilik',
          foreignField: 'id',
          as: 'Pemilik',
        },
      },
      {
        $unwind: '$Pemilik', // Mengurai array Pemilik agar menjadi objek
      },
      {
        $project: {
          namaKos: 1,
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

// User Controller

// Pemilik Controller

module.exports = {
  getAllKos,
  deleteKosById,
  fetchFavoriteKos,
};
