const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongoose").Types;
const moment = require("moment");

const ENV = require("../models/static");

const {
  MissingPrameter,
  UknownError,
  MalformedObjectId,
  ElementNotFound,
} = require("../errors/general");

const { ClientEmailExist } = require("../errors/admin/cliente");
const Client = require("../models/Client");

exports.create = (
  enseigne,
  site,
  siret,
  codeNaf,
  numéroTva,
  téléphone,
  adresse,
  codePostal,
  ville,
  pays,
  emailClient
) =>
  new Promise((resolve, reject) => {
    if (emailClient === undefined) {
      return reject(
        new MissingPrameter(
          "Please verify your form input, email is a required field",
          "email"
        )
      );
    }
    if (numéroTva === undefined) {
      return reject(
        new MissingPrameter(
          "Please verify your form input, numéroTva is a required field",
          "email"
        )
      );
    }
    if (codeNaf === undefined) {
      return reject(
        new MissingPrameter(
          "Please verify your form input, codeNaf is a required field"
        )
      );
    }
    if (siret === undefined) {
      return reject(
        new MissingPrameter(
          "Please verify your form input, siret is a required field"
        )
      );
    }
    if (enseigne === undefined) {
      return reject(
        new MissingPrameter(
          "Please verify your form input, enseigne is a required field"
        )
      );
    }

    try {
      const client = new Client();
      client.enseigne = enseigne;
      client.site = site;
      client.siret = siret;
      client.codeNaf = codeNaf;
      client.numéroTva = numéroTva;
      client.téléphone = téléphone;
      client.adresse = adresse;
      client.codePostal = codePostal;
      client.ville = ville;
      client.pays = pays;
      client.emailClient = emailClient;

      // user.pin = pin;
      return client
        .save()
        .then(() => resolve(client))
        .catch((error) => {
          if (error.name === "MongoError" && error.code === 11000) {
            return reject(new ClientEmailExist("Mongo error"));
          }
          return reject(
            new UknownError(
              `Unexpected error server side using code ${error.code}`
            )
          );
        });
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return reject(new ClientEmailExist("Client email already exists"));
      }
      return reject(
        new UknownError(`Unexpected error server side using code ${err.code}`)
      );
    }
  });
exports.getClient = (id) =>
  new Promise((resolve, reject) => {
    if (id === undefined) {
      return reject(
        new MissingPrameter("please verify the url, clientId required!")
      );
    }
    if (!ObjectId.isValid(id)) {
      return reject(new MalformedObjectId("Please verify the clientId!"));
    }
    return Client.findById(id)

      .exec()
      .then((client) =>
        client
          ? resolve(client)
          : reject(
              new ElementNotFound(
                "There is no Client registered with the provided id."
              )
            )
      )
      .catch((e) => reject(new UknownError(e.message)));
  });

exports.update = (
  id,
  enseigne,
  site,
  siret,
  codeNaf,
  numéroTva,
  téléphone,
  adresse,
  codePostal,
  ville,
  pays,
  emailClient
) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await this.getClient(id);
      console.log(client);
      if (enseigne) {
        client.enseigne = enseigne;
      }
      if (site) {
        client.site = site;
      }
      if (siret) {
        client.siret = siret;
      }
      if (codeNaf) {
        client.codeNaf = codeNaf;
      }
      if (numéroTva) {
        client.numéroTva = numéroTva;
      }
      if (téléphone) {
        client.téléphone = téléphone;
      }
      if (adresse) {
        client.adresse = adresse;
      }
      if (codePostal) {
        client.codePostal = codePostal;
      }
      if (ville) {
        client.ville = ville;
      }
      if (pays) {
        client.pays = pays;
      }
      if (emailClient) {
        client.emailClient = emailClient;
      }

      return client
        .save()
        .then((clientObject) => resolve(clientObject))
        .catch((e) => reject(new UnknownError(e.message)));
    } catch (e) {
      return reject(e);
    }
  });
exports.deleteClient = (id) =>
  new Promise((resolve, reject) => {
    if (id === undefined) {
      return reject(
        new MissingPrameter("please select the client you want to remove!")
      );
    }
    if (!ObjectId.isValid(id)) {
      return reject(new MalformedObjectId("Please verify the clientId!"));
    }
    return Client.findByIdAndUpdate(id, {
      $set: { deleted: true, deletedAt: new Date(), pin: null },
    })
      .exec()
      .then((data) => {
        if (!data) {
          return reject(
            new ElementNotFound(
              "Sorry but the clientId you've sent does not exist in our database!"
            )
          );
        }
        return resolve(data);
      })
      .catch((err) => reject(new UknownError(err.message)));
  });
exports.blockClient = (id) =>
  new Promise((resolve, reject) => {
    if (id === undefined) {
      return reject(
        new MissingPrameter("please select the client you want to block!")
      );
    }
    if (!ObjectId.isValid(id)) {
      return reject(new MalformedObjectId("Please verify the clientId!"));
    }
    return Client.findByIdAndUpdate(id, {
      $set: { blocked: true, blockedAt: new Date(), pin: null },
    })
      .exec()
      .then((data) => {
        if (!data) {
          return reject(
            new ElementNotFound(
              "Sorry but the clientId you've sent does not exist in our database!"
            )
          );
        }
        return resolve(data);
      })
      .catch((err) => reject(new UknownError(err.message)));
  });

exports.restoreClientD = (id) =>
  new Promise((resolve, reject) => {
    if (id === undefined) {
      return reject(
        new MissingPrameter("please select the client you want to restore!")
      );
    }
    if (!ObjectId.isValid(id)) {
      return reject(new MalformedObjectId("Please verify the clientId!"));
    }
    return Client.findByIdAndUpdate(id, {
      $set: { deleted: false, deletedAt: null, pin: "" },
    })
      .exec()
      .then((data) => {
        if (!data) {
          return reject(
            new ElementNotFound(
              "Sorry but the clientId you've sent does not exist in our database!"
            )
          );
        }
        return resolve(data);
      })
      .catch((err) => reject(new UknownError(err.message)));
  });
exports.restoreClientB = (id) =>
  new Promise((resolve, reject) => {
    if (id === undefined) {
      return reject(
        new MissingPrameter("please select the client you want to restore!")
      );
    }
    if (!ObjectId.isValid(id)) {
      return reject(new MalformedObjectId("Please verify the clientId!"));
    }
    return Client.findByIdAndUpdate(id, {
      $set: { blocked: false, blockedAt: null, pin: "" },
    })
      .exec()
      .then((data) => {
        if (!data) {
          return reject(
            new ElementNotFound(
              "Sorry but the clientId you've sent does not exist in our database!"
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
    return Client.find(filter)

      .skip(pageNumber * countNumber)
      .limit(countNumber)
      .then((admins) => resolve(admins))
      .catch((error) => reject(new UknownError(error.message)));
  });
exports.getCount = (filter) =>
  new Promise((resolve, reject) => {
    return Client.countDocuments(filter)
      .then(resolve)
      .catch((error) => reject(new UknownError(error.message)));
  });

exports.getAll = () =>
  new Promise((resolve, reject) => {
    return Client.find({ deleted: "false", blocked: "false" })

      .exec()
      .then((client) => {
        if (client) {
          return resolve(client);
        }
        return reject(
          new ElementNotFound(
            "There is no client registered in our database that has the requested clientId"
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

      return Client.updateMany(query, update)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => console.error(`Failed to update items: ${err}`));
    } catch (e) {
      return reject(e);
    }
  });
