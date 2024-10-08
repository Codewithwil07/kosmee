const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    nama: { type: String, required: true },
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
    namaKos: { type: String, required: true, trim: true },
    images: [{ type: String, required: true }],
    idPemilik: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pemilik',
    },
    alamat: { type: String, required: true, trim: true },
    jenis: {
      type: String,
      required: true,
      trim: true,
      enum: ['Putra', 'Putri', 'Campuran'],
    },
    kota: { type: String, required: true, index: true, trim: true },
    targetArea: { type: String, required: true, index: true, trim: true },
    hargaPerbulan: { type: Number, required: true, default: 0 },
    linkGmap: { type: String, required: true, trim: true },
    fasilitas: [{ type: String, required: true }],
    deskripsiKos: { type: String, required: true, trim: true },
    peraturanKos: [{ type: String, required: true, trim: true }],
    reviews: [reviewSchema],
    ratings: { type: Number, required: true, default: 0 }, // added min and max values for rating
    numReviews: { type: Number, required: true, default: 0 }, // added min value for numReviews
  },
  { timestamps: true }
);

const DetailKos = mongoose.model('DetailKos', DetailKosSchema);
module.exports = DetailKos;
