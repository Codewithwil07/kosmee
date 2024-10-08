const DetailKos = require('../models/DetailKos.js');

///--------- Fitures controllers

// Search dan filtering
const searchAndFilterkos = async (req, res) => {
  const { kota, hargaPerbulan, targetArea } = req.query;

  let hargaMaximax = null;
  let hargaMinimax = null;

  if (hargaPerbulan) {
    const hargaKimax = hargaPerbulan.split('-');
    hargaMaximax = parseInt(hargaKimax[0], 10);
    hargaMinimax = parseInt(hargaKimax[1], 10);
  }

  // Cek apakah query parameter ada
  if (Object.keys(req.query).length === 0) {
    return res.status(404).send('No query requested');
  }

  try {
    let filter = {};
    if (kota) {
      filter.kota = kota;
    }
    if (hargaMaximax !== null && hargaMaximax !== null) {
      filter.hargaPerbulan = { $gte: hargaMaximax, $lte: hargaMinimax };
    }

    if (targetArea) {
      filter.targetArea = targetArea;
    }

    console.log(filter);


    const kos = await DetailKos.find(filter);


    if (kos.length === 0) {
      return res.status(400).send('Data tidak ada');
    }

    res.status(200).json(kos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
//

const fetchFavoriteKos = async (req, res) => {
  try {
    const kos = await DetailKos.find().where('ratings').gt(5); // greater than

    if (kos.length === 0) return res.status(404).send('Tidak ada kos favorite');

    res.status(200).json(kos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const fetchRecomendedKosByLocated = async (req, res) => {
  try {
    const kos = await DetailKos.find().where('kota').equals(req.params.kota);

    if (!kos || kos.length === 0) {
      return res
        .status(404)
        .json({ message: 'Tidak ada kos yang ditemukan di kota ini.' });
    }

    res.status(200).json(kos);
  } catch (error) {
    console.error(error.message);
  }
};

//-----------

// User Controller

// Pemilik Controller

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

module.exports = {
  fetchFavoriteKos,
  fetchRecomendedKosByLocated,
  getAllKos,
  deleteKosById,
  searchAndFilterkos,
};
