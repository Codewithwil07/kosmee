const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    rating: { type: String, required: true },
    komentar: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

const DetailKosSchema = new mongoose.Schema(
  {
    nama_kos: { type: String, required: true },
    id_pemilik: { type: Number, required: true, ref: 'Pemilik' },
    alamat: { type: String, required: true },
    kota: { type: String, required: true, index: true },
    target_area: { type: String, required: true, index: true },
    nomor_hp: { type: String, required: true },
    harga: { type: String, required: true, index: true },
    link_gmap: { type: String, required: true },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const DetailKos = mongoose.model('DetailKos', DetailKosSchema);
module.exports = DetailKos;
