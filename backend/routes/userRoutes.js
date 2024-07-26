const { Router } = require('express');
const router = Router();

const validInfo = require('../middlewares/validInfo');
const ctrl = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.route('/').post(validInfo, ctrl.userRegister);
router.route('/auth').post(ctrl.userLogin);
router.get('/logout', ctrl.userCurrentLogout);

// USER ROUTES
router
  .route('/profile')
  .get(auth.autentikasi, ctrl.getCurrentUser)
  .put(auth.autentikasi, validInfo, ctrl.editProfileCurrentUser);
router
  .route('/profile/:id')
  .patch(auth.autentikasi, ctrl.editPasswordCurrentUser);

// Pemilik Routes
router
  .route('/pemilik')
  .post(validInfo, ctrl.registerPemilikKos, ctrl.registerKos);
router.route('/pemilik/auth').post(ctrl.loginpemilikKos);
router.route('/pemilik/logout').get(ctrl.logoutPemilikKos);

// Admin routes
router
  .route('/admin/data-user')
  .get(auth.autentikasi, auth.jalurAdmin, ctrl.getAllUsers);
router
  .route('/admin/data-user/:id')
  .get(auth.autentikasi, auth.jalurAdmin, ctrl.getUserById)
  .delete(auth.autentikasi, auth.jalurAdmin, ctrl.deleteUserById)
  .patch(auth.autentikasi, auth.jalurAdmin, validInfo, ctrl.updateUserById);

router
  .route('/admin/data-kos')
  .get(auth.autentikasi, auth.jalurAdmin, ctrl.getAllKos);
router
  .route('/admin/data-kos/:id')
  .delete(auth.autentikasi, auth.jalurAdmin, ctrl.deleteKosById);

module.exports = router;
