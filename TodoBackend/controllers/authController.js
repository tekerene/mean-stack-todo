const User = require('../models/authModel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const dotenv = require('dotenv');
const _uAuth = require('lodash');
const hashPassword = require('../config/passwordHarsh');
const FacebookStrategy = require('passport-facebook').Strategy;;
 
exports.addUser = (req, res) => {
    const {fullname, username, email, password, confirmPassword} = req.body;
    let hashPass = hashPassword.getHashPassword(password);
    
     // * Create a Task
     const user = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    })
    
   
//     if (password === confirmPassword || hashPass === password){
//         //check if users with the same email is also registered
//         if((req.body.email === user.email)){
//         //   res.send("register", {
//         //       message: 'User already existed',
//         //       messageClass: 'alert-danger'
//         //   });  
//             console.log(email, "already exist")
     
//     }   
//     return;
// }
    // Save user to database
    user.save((err, data) => {
        if (err) {
            res.send('err')
            console.log(err)
        } else {
            res.send('ok teke')
            console.log(data,"user successfully added")
        }
    })
}
exports.getUsers = (req, res, user) => {
    const username = req.query.username;
    var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  
    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving todos.",
            user:data
        });
      });
  
}
const accessTokenSecret = 'youraccesstokensecret';
exports.userLogin = (req, res, next) => {
     
//     const { username, password } = req.body;

//         //Filter user from the users array by username and password
//    const user = User.find(u => { return u.username === username && u.password === password });


//     if (user) {
//         // Generate an access token
//         const accessToken = jwt.sign({ username: user.username,  password: user.password }, accessTokenSecret);

//         res.json({
//             accessToken
//         });
//     } else {
//         res.send('Username or password incorrect');
//         console.log("username or password incorrect");
//     }

 // login = (req, res) => {
   
     User.findOne({ username: req.body.username },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
            console.log(user.username)
            //return res.status(200);
            
            return res.status(200).json({ status: true, user : _uAuth.pick(user,['username','password']) });
              
        } 
        
    );
}

exports.getUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found with id' + req.params.id
                })
            }
            res.status(200).send(user)
            console.log(user)
        })
        .catch((er) => {
            return res.status(500).send({
                message: 'Error retrieving user with id' + req.params.id
            });
        });
}
exports.updateUser = (req, res) => {
    const user = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    User.findByIdAndUpdate(req.params.id, user, {
        new: true,
        status: 'not completed'
    }).then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "No user Found"
                })
            }
            res.status(200).send(user)
            console.log("user successfully updated" + user)
        })
        .catch((er) => {
            return res.status(404).send({
                message: "error while updating the user",
            });
        })
        console.log(user);
}
exports.deleteUser = (req, res) => {
    console.log('I am deleting a user')
    User.findByIdAndRemove(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: 'user Not Found with id' + req.params.id
                })
            }
            res.send({
                message: "user deleted successfully!"
            });
        })
        .catch((er) => {

            return res.status(500).send({
                message: 'Could Not Delete A user'
            });
        });
     
        
}
dotenv.config();
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});