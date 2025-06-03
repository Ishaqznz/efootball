const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../Config/multerConfig');
const userAuth = require('../middlewares/userAuth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/accountData', userAuth.auth, upload.array('files', 9), userController.addAccount)
router.get('/getAccounts', userController.loadAccounts);
router.get('/getAccount/:id', userController.getAccount);
router.get('/userStatus', userAuth.auth, userController.getUserStatus);
router.get('/getUserAccounts/:id', userAuth.auth, userController.getUserAccounts)
router.patch('/userLogout', userController.logout);


module.exports = router;