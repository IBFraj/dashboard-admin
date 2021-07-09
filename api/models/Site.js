const mongoose = require("./db");

const siteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    zipCode: {
      type: String,
      required: true,
    },

    adresse: {
      type: String,
    },
    ville: {
      type: String,
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      deletedAt: "deleted_at",
    },
  }
);
module.exports = mongoose.model("Site", siteSchema);
