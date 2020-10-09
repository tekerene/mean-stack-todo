const User = require('../models/authModel');
const jwt = require('jsonwebtoken');

exports.addUser = (req, res) => {
     // * Create a Task
     const user = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        
    })
    console.log(req.body);
   
    // Save user to database
    user.save((err, data) => {
        if (err) {
            res.send('err')
            console.log(err)
        } else {
            res.send('ok')
            console.log(data +"user successfully added")
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

exports.userLogin = (req, res) => {
    model = User;

  login = (req, res) => {
    this.model.findOne({ username: req.body.username }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });
  }

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