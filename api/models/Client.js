const mongoose = require("./db");
const { Schema } = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    enseigne: {
      type: String,
      required: true,
    },
    site: {
      type: String,
      required: true,
    },
    /*site: {
      type: String,
      required: true,
    },*/
    siret: {
      type: String,
      required: true,
      unique: true,
    },
    codeNaf: {
      type: String,
      required: true,
      unique: true,
    },

    numéroTva: {
      type: String,
      required: true,
      unique: true,
    },
    téléphone: {
      type: String,

      unique: true,
    },
    adresse: {
      type: String,
    },
    codePostal: {
      type: String,
    },
    ville: {
      type: String,
    },
    pays: {
      type: String,
    },
    emailClient: {
      type: String,
      required: true,
      unique: true,
    },
    deleted: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updateAt: "updated_at",
      deletedAt: "deleted_at",
      blockedAt: "blocked_at",
    },
  }
);
module.exports = mongoose.model("Client", clientSchema);
