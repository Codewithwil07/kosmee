const { Router } = require('express');
const router = Router();

const product = require('../controllers/DetailKosController');
const auth = require('../middlewares/authMiddleware');

// User routes
router.route('/:id').post(auth.autentikasi, product.reviewCurrentKos);

module.exports = router;
