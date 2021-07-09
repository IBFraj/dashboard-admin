const { ObjectId } = require("mongoose").Types;
const mongoose = require("mongoose");

const path = require("path");

const ENV = require("../models/static");

const {
  MissingPrameter,
  UknownError,
  MalformedObjectId,
  ElementNotFound,
} = require("../errors/general");

const Site = require("../models/Site");

exports.create = (name, zipCode, adresse, ville) =>
  new Promise((resolve, reject) => {
    if (name === undefined) {
      return reject(
        new MissingPrameter(
          "Please verify your form input, name is a required field"
        )
      );
    }
    if (zipCode === undefined) {
      return reject(
        new MissingPrameter(
          "Please verify your form input, zipCode is a required field"
        )
      );
    }
    try {
      const site = new Site();
      site.name = name;
      site.zipCode = zipCode;
      site.adresse = adresse;
      site.ville = ville;

      return site
        .save()
        .then(() => resolve(site))
        .catch((error) => {
          return reject(
            new UknownError(
              `Unexpected error server side using code ${error.code}`
            )
          );
        });
    } catch (err) {
      return reject(
        new UknownError(`Unexpected error server side using code ${err.code}`)
      );
    }
  });
exports.getSite = (id) =>
  new Promise((resolve, reject) => {
    if (id === undefined) {
      return reject(
        new MissingPrameter("please verify the url, clientId required!")
      );
    }
    if (!ObjectId.isValid(id)) {
      return reject(new MalformedObjectId("Please verify the clientId!"));
    }
    return Site.findById(id)

      .exec()
      .then((site) =>
        site
          ? resolve(site)
          : reject(
              new ElementNotFound(
                "There is no Site registered with the provided id."
              )
            )
      )
      .catch((e) => reject(new UknownError(e.message)));
  });
exports.update = (id, name, zipCode, adresse, ville) =>
  new Promise(async (resolve, reject) => {
    try {
      const site = await this.getSite(id);
      console.log(site);
      if (name) {
        site.name = name;
      }
      if (zipCode) {
        site.zipCode = zipCode;
      }
      if (adresse) {
        site.adresse = adresse;
      }
      if (ville) {
        site.ville = ville;
      }

      return site
        .save()
        .then((siteObject) => resolve(siteObject))
        .catch((e) => reject(new UnknownError(e.message)));
    } catch (e) {
      return reject(e);
    }
  });
exports.deleteSite = (id) =>
  new Promise((resolve, reject) => {
    if (id === undefined) {
      return reject(
        new MissingPrameter("please select the site you want to remove!")
      );
    }
    if (!ObjectId.isValid(id)) {
      return reject(new MalformedObjectId("Please verify the siteId!"));
    }
    return Site.findByIdAndUpdate(id, {
      $set: { deleted: true, deletedAt: new Date(), pin: null },
    })
      .exec()
      .then((data) => {
        if (!data) {
          return reject(
            new ElementNotFound(
              "Sorry but the siteId you've sent does not exist in our database!"
            )
          );
        }
        return resolve(data);
      })
      .catch((err) => reject(new UknownError(err.message)));
  });
exports.getPage = (filter, page, count) =>
  new Promise((resolve, reject) => {
    const pageNumber = page > 0 ? parseInt(page, 10) - 1 : 0;
    const countNumber = count ? parseInt(count, 10) : 10;
    return Site.find(filter)

      .skip(pageNumber * countNumber)
      .limit(countNumber)
      .then((admins) => resolve(admins))
      .catch((error) => reject(new UknownError(error.message)));
  });
exports.getCount = (filter) =>
  new Promise((resolve, reject) => {
    return Site.countDocuments(filter)
      .then(resolve)
      .catch((error) => reject(new UknownError(error.message)));
  });

exports.getAll = () =>
  new Promise((resolve, reject) => {
    return Site.find({ deleted: "false" })

      .exec()
      .then((site) => {
        if (site) {
          return resolve(site);
        }
        return reject(
          new ElementNotFound(
            "There is no site registered in our database that has the requested clientId"
          )
        );
      })
      .catch((e) => reject(new UknownError(e.message)));
  });
exports.removeMultiple = (ids) =>
  new Promise(async (resolve, reject) => {
    try {
      const query = { _id: { $in: ids } };
      const update = { deleted: true };

      return Site.updateMany(query, update)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => console.error(`Failed to update items: ${err}`));
    } catch (e) {
      return reject(e);
    }
  });
