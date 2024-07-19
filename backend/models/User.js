const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nama_lengkap: { type: String, required: true },
  nomor_hp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  gender: {
    type: String,
    enum: ['laki-laki', 'perempuan'],
    required: true,
  },
  status: {
    type: String,
    enum: ['karyawan', 'mahasiswa', 'lain-lain'],
    required: true,
  },
  tempat_tinggal: {
    type: String,
    required: true,
  },
  tanggal_lahir: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
