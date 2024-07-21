const monggose = require('mongoose');

const PemilikSchema = new monggose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nomor_hp: { type: String, required: true },
  password: { type: String, required: true },
});

const Pemilik = monggose.model('Pemilik', PemilikSchema);
export default Pemilik;
