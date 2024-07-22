const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    nama: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    rating: { type: String, required: true },
    komentar: { type: String, required: true },
  },
  { timestamps: true }
);

const DetailKosSchema = new mongoose.Schema(
  {
    nama_kos: { type: String, required: true },
    id_pemilik: { type: mongoose.Schema.ObjectId, ref: 'Pemilik' },
    alamat: { type: String, required: true },
    kota: { type: String, required: true, index: true },
    target_area: { type: String, required: true, index: true },
    harga: { type: String, required: true, index: true },
    link_gmap: { type: String, required: true },
    review: [reviewSchema],
  },
  { timestamps: true }
);

const DetailKos = mongoose.model('DetailKos', DetailKosSchema);
module.exports = DetailKos;
