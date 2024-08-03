const express = require('express');
const router = express.Router();

const kos = require('../controllers/kosController');
const auth = require('../middlewares/authMiddleware');

// admin routes
router.get('/admin/dataKos', auth.autentikasi, auth.jalurAdmin, kos.getAllKos);
router.delete(
  '/admin/dataKos/:id',
  auth.autentikasi,
  auth.jalurAdmin,
  kos.deleteKosById
);

module.exports = router;
