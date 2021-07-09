const express = require("express");
const path = require("path");

const {
  create,
  getSite,
  getPage,
  getCount,
  getAll,
  update,
  deleteSite,
  removeMultiple,
} = require("../../repositories/SiteQuery");

const Site = require("../../models/Site");

const router = express.Router();

router.post("/new", async (req, res) => {
  const { name, zipCode, adresse, ville } = req.body;
  try {
    const site = await create(name, zipCode, adresse, ville);
    return res.status(200).json(site);
  } catch (error) {
    return res.status(error.code).json({
      error: true,
      message: error.message,
    });
  }
});

router.get("/info/:siteId", async (req, res) => {
  try {
    const site = await getSite(req.params.siteId);
    return res.status(200).json(site);
  } catch (e) {
    return res.status(e.code).json({
      error: true,
      message: e.message,
    });
  }
});
router.get("/list", async (req, res) => {
  try {
    const { page, count, searchQuery } = req.query;
    let filter = {
      $and: [
        { deleted: false },
        {
          $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { zipCode: { $regex: searchQuery, $options: "i" } },
            { adresse: { $regex: searchQuery, $options: "i" } },
            { ville: { $regex: searchQuery, $options: "i" } },
          ],
        },
      ],
    };
    const clients = await getPage(filter, page, count);
    const total = await getCount(filter);
    const totalPage = Math.ceil(total / (count ? parseInt(count) : 10));
    return res.status(200).json({ data: clients, total, totalPage });
  } catch (e) {
    return res.status(e.code >= 100 && e.code <= 600 ? e.code : 500).json({
      error: true,
      message: e.message,
    });
  }
});
router.get("/all", async (req, res) => {
  try {
    const site = await getAll();
    return res.status(200).json(site);
  } catch (e) {
    return res.status(e.code).json({
      error: true,
      message: e.message,
    });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const siteId = req.params.id;
    console.log(siteId);
    const { name, zipCode, adresse, ville } = req.body;
    const site = await update(siteId, name, zipCode, adresse, ville);
    return res.status(200).json(site);
  } catch (e) {
    return res.status(e).json({
      error: true,
      message: e.message,
    });
  }
});
router.post("/delete/:id", async (req, res) => {
  try {
    const siteId = req.params.id;
    await deleteSite(siteId);
    return res.status(200).json({
      error: false,
      message: "site deleted",
    });
  } catch (e) {
    return res.status(e.code).json({
      error: true,
      message: e.message,
    });
  }
});
router.post("/deleteMultiple", async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  try {
    const removedSites = await removeMultiple(ids);
    return res.status(200).json(removedSites);
  } catch (e) {
    return res.status(e.code >= 100 && e.code <= 600 ? e.code : 500).json({
      error: true,
      message: e.message,
    });
  }
});

module.exports = router;
