const User = require('../models/authModel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const dotenv = require('dotenv');
const hashPassword = require('../config/passwordHarsh');
const FacebookStrategy = require('passport-facebook').Strategy;;

exports.addUser = (req, res) => {
     // * Create a Task
     const user = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        
    })
    
    const {fullname, username, email, password, confirmPassword} = req.body;
   
    if (password === confirmPassword){
        //check if users with the same email is also registered
        if((!email === req.body.email)){
        //   res.send("register", {
        //       message: 'User already existed',
        //       messageClass: 'alert-danger'
        //   });  
            console.log(email, "already exist")
       
          return;
        
        const hashPass = hashPassword.getHashPassword(password);
        //store user into the database if you are using one
        console.log(password);
        User.push({
            fullname, username, email, password: hashPass    
        });
    } 
     } 
     console.log(req.body);

    // Save user to database
    user.save((err, data) => {
        if (err) {
            res.send('err')
            console.log(err)
        } else {
            res.send('ok zidane')
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
exports.userLogin = (req, res) => {
     model = User;
   
    

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
    // this.model.findOne({ username: req.body.username }, (err, user) => {
    //   if (!user) { return res.sendStatus(403); }
    //   user.comparePassword(req.body.password, (error, isMatch) => {
    //     if (!isMatch) { return res.sendStatus(403); }
    //     const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
    //     res.status(200).json({ token: token });
    //   });
    // });
  //}

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