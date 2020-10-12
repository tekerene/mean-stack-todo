const express = require("express");
const router = express.Router();
const passport = require('passport');

const endpoints = require('../config/authendpoints');
const userController = require('../controllers/authController');

router.get(endpoints.users, userController.getUsers);
router.get(endpoints.user, userController.getUser);
router.post(endpoints.userLogin, userController.userLogin);
router.post(endpoints.adduser, userController.addUser);
router.patch(endpoints.updateuser, userController.updateUser);
router.delete(endpoints.deleteuser, userController.deleteUser);
router.get("/facebook", passport.authenticate("facebook"));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/home"
    })
  );
  router.get("/fail", (req, res) => {
    res.send("Failed attempt");
  });
  router.get("/home", (req, res) => {
    res.send("successfully login");
  });
module.exports = router;