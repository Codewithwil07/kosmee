const express = require('express');
const router = express.Router();

const detailKos = require('../controllers/DetailKosController');
const auth = require('../middlewares/authMiddleware');

// User routes
router.route('/:id').post(auth.autentikasi, detailKos.reviewCurrentKos);

// Pemilik routes
router
  .route('/')
  .get(auth.autentikasi, auth.jalurPemilik, detailKos.editProfileCurrentKos);

module.exports = router;
