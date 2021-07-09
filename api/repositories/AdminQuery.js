const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongoose").Types;
const moment = require("moment");
const { ClientEmailExist } = require("../errors/admin/cliente");

var jwt = require("jsonwebtoken");
const ENV = require("../models/static");
const {
  MissingPrameter,
  UknownError,
  MalformedObjectId,
  ElementNotFound,
} = require("../errors/general");

const Admin = require("../models/Admin");

exports.login = (email, password) =>
  new Promise((resolve, reject) => {
    if (email === undefined) {
      return reject(
        new MissingPrameter("Please verify your form input, email ")
      );
    }
    if (password === undefined) {
      return reject(
        new MissingPrameter("Please verify your form input,password")
      );
    }
    return Admin.findOne({ email: email })
      .exec()
      .then((admin) => {
        if (admin) {
          if (bcrypt.compareSync(password, admin.password)) {
            return resolve(admin.toObject());
          } else {
            return reject(new ElementNotFound("sorry admin not found"));
          }
        } else {
          return reject(new ElementNotFound("sorry admin not found"));
        }
      });
  });
exports.create = (email, password, username) =>
  new Promise((resolve, reject) => {
    if (email === undefined) {
      return reject(
        new MissingPrameter(
          "Please verify your form input, email is a required field",
          "email"
        )
      );
    }
    if (password === undefined) {
      return reject(
        new MissingPrameter(
          "Please verify your form input, password is a required field",
          "password"
        )
      );
    }
    console.log(email);
    console.log(password);
    console.log(username);
    try {
      const admin = new Admin();
      admin.email = email;
      admin.password = bcrypt.hashSync(password, ENV.BCRYPT_SALT_ROUND);
      admin.username = username;

      // user.pin = pin;
      return admin
        .save()
        .then(() => resolve(admin))
        .catch((error) => {
          if (error.name === "MongoError" && error.code === 11000) {
            return reject(new ClientEmailExist("admin email already exists"));
          }
          return reject(
            new UknownError(
              `Unexpected error server side using code ${error.code}`
            )
          );
        });
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return reject(new ClientEmailExist("admin email already exists"));
      }
      return reject(
        new UknownError(`Unexpected error server side using code ${err.code}`)
      );
    }
  });
exports.getById = (id) =>
  new Promise((resolve, reject) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reject(new MalformedObjectId("Please verify your ID."));
      }
      return Admin.findById(id)
        .then((admin) =>
          admin
            ? resolve(admin)
            : reject(
                new ElementNotFound(
                  "There is no user registered with the provided id."
                )
              )
        )
        .catch((error) =>
          reject(
            new UknownError(
              `Unexpected error server side using code ${error.code}`
            )
          )
        );
    } catch (err) {
      return reject(
        new UknownError(`Unexpected error server side using code ${err.code}`)
      );
    }
  });
