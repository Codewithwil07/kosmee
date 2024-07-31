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
    namaKos: { type: String, required: true, trim: true }, // added trim to remove whitespace
    images: [{ type: String, required: true }], // renamed to images (plural) for clarity
    idPemilik: {
      type: mongoose.Schema.ObjectId,
      ref: 'Pemilik',
      required: true,
    }, // added required: true
    alamat: { type: String, required: true, trim: true }, // added trim to remove whitespace
    jenis: {
      type: String,
      required: true,
      trim: true,
      enum: ['perempuan', 'laki-laki', 'campuran'],
    },
    kota: { type: String, required: true, index: true, trim: true }, // added trim to remove whitespace
    targetArea: { type: String, required: true, index: true, trim: true }, // renamed to targetArea (camelCase) for consistency
    hargaPerBulan: { type: Number, required: true, default: 0 }, // renamed to hargaPerBulan (camelCase) for consistency
    linkGmap: { type: String, required: true, trim: true }, // added trim to remove whitespace
    fasilitas: [{ namaFasilitas: { type: String, required: true } }], // added trim to remove whitespace
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0, min: 0, max: 5 }, // added min and max values for rating
    numReviews: { type: Number, required: true, default: 0, min: 0 }, // added min value for numReviews
  },
  { timestamps: true }
);

const DetailKos = mongoose.model('DetailKos', DetailKosSchema);
module.exports = DetailKos;
