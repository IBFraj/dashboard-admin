const Admin = require("../models/Admin");


checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Admin.findOne({
    username: req.body.username
  }).exec((err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (admin) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    Admin.findOne({
      email: req.body.email
    }).exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (admin) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    
  };
  
  module.exports = verifySignUp;