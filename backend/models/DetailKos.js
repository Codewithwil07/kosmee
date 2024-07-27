const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const DetailKosSchema = new mongoose.Schema(
  {
    nama_kos: { type: String, required: true },
    image: [{ type: String, required: true }],
    id_pemilik: { type: mongoose.Schema.ObjectId, ref: 'Pemilik' },
    alamat: { type: String, required: true },
    kota: { type: String, required: true, index: true },
    target_area: { type: String, required: true, index: true },
    harga_perbulan: { type: Number, required: true, index: true },
    link_gmap: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const DetailKos = mongoose.model('DetailKos', DetailKosSchema);
module.exports = DetailKos;
