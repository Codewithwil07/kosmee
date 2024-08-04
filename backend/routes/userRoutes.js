const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');

const validInfo = require('../middlewares/validInfo');
const user = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

// USER ROUTES
router.route('/').post(validInfo, user.userRegister);
router.route('/auth').post(user.userLogin);
router.get('/logout', user.userCurrentLogout);
router
  .route('/profile')
  .get(auth.autentikasi, user.getCurrentUser)
  .put(auth.autentikasi, validInfo, user.editProfileCurrentUser);
router
  .route('/changePassword/:id')
  .patch(auth.autentikasi, user.changePasswordCurrentUser);

// Pemilik Routes
router.route('/pemilik').post(formidable(), validInfo, user.registerKos);
router.route('/pemilik/auth').post(user.loginpemilikKos);
router.route('/pemilik/logout').get(user.logoutPemilikKos);

// Admin routes
router
  .route('/admin/dataUser')
  .get(auth.autentikasi, auth.jalurAdmin, user.getAllUsers);
router
  .route('/admin/dataUser/:id')
  .get(auth.autentikasi, auth.jalurAdmin, user.getUserById)
  .delete(auth.autentikasi, auth.jalurAdmin, user.deleteUserById)
  .patch(auth.autentikasi, auth.jalurAdmin, validInfo, user.updateUserById);
router
  .route('/admin/dataPemilik')
  .get(auth.autentikasi, auth.jalurAdmin, user.getAllPemilik);
router
  .route('/admin/dataPemilik/:id')
  .patch(auth.autentikasi, auth.jalurAdmin, validInfo, user.updatePemilikById)
  .delete(auth.autentikasi, auth.jalurAdmin, user.deletePemilikById);

module.exports = router;
