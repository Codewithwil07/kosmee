const express = require('express');
const router = express.Router();

const detailKos = require('../controllers/DetailKosController');
const auth = require('../middlewares/authMiddleware');

// User routes
router.route('/:id').post(auth.autentikasi, detailKos.reviewCurrentKos);
module.exports = router;
