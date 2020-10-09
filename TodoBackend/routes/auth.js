const express = require("express");
const router = express.Router();

const endpoints = require('../config/authendpoints');
const userController = require('../controllers/authController');

router.get(endpoints.users, userController.getUsers);
router.get(endpoints.user, userController.getUser);
router.post(endpoints.userLogin, userController.userLogin);
router.post(endpoints.adduser, userController.addUser);
router.patch(endpoints.updateuser, userController.updateUser);
router.delete(endpoints.deleteuser, userController.deleteUser);


module.exports = router;