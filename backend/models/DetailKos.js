const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const DetailKosSchema = new mongoose.Schema(
  {
    nama_kos: { type: String, required: true },
    image: { type: String },
    id_pemilik: { type: mongoose.Schema.ObjectId, ref: 'Pemilik' },
    alamat: { type: String, required: true },
    kota: { type: String, required: true, index: true },
    target_area: { type: String, required: true, index: true },
    harga_perbulan: { type: Number, required: true, index: true },
    link_gmap: { type: String, required: true },
    review: [reviewSchema],
  },
  { timestamps: true }
);

const DetailKos = mongoose.model('DetailKos', DetailKosSchema);
module.exports = DetailKos;
