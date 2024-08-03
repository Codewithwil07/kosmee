const express = require('express');
const router = express.Router();

const kos = require('../controllers/kosController');
// const auth = require('../middlewares/authMiddleware');

// admin routes
router.get('/admin/data-kos', kos.getAllKos);

router.delete('/admin/data-kos/:id', kos.deleteKosById);
