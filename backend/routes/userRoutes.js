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


// Admin routes
router.route('/admin').get(auth.autentikasi, auth.jalurAdmin, ctrl.getAllUsers);
router
  .route('/admin/:id')
  .get(auth.autentikasi, auth.jalurAdmin, ctrl.getAllUserById)
  .delete(auth.autentikasi, auth.jalurAdmin, ctrl.deleteUserById)
  .patch(auth.autentikasi, auth.jalurAdmin, validInfo, ctrl.updateUserById);
module.exports = router;
