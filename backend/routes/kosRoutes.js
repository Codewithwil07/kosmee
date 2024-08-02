const { Router } = require('express');
const router = Router();

const user = require('../controllers/kosController');
const auth = require('../middlewares/authMiddleware');

// admin routes
router
  .route('/admin/data-kos')
  .get(auth.autentikasi, auth.jalurAdmin, user.getAllKos);
router
  .route('/admin/data-kos/:id')
  .delete(auth.autentikasi, auth.jalurAdmin, user.deleteKosById);
