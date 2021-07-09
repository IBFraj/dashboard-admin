const express = require("express");

const {
  create,
  getClient,
  getPage,
  getCount,
  getAll,
  update,
  deleteClient,
  blockClient,
  restoreClientD,
  restoreClientB,
  removeMultiple,
} = require("../../repositories/ClientQuery");

const router = express.Router();

router.post("/create", async (req, res) => {
  const {
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
    emailClient,
  } = req.body;

  try {
    const client = await create(
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
    );
    return res.status(200).json(client);
  } catch (error) {
    return res.status(error.code).json({
      error: true,
      message: error.message,
    });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const clientId = req.params.id;
    console.log(clientId);
    const {
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
      emailClient,
    } = req.body;

    const client = await update(
      clientId,
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
    );
    return res.status(200).json(client);
  } catch (e) {
    return res.status(e).json({
      error: true,
      message: e.message,
    });
  }
});
router.post("/delete/:id", async (req, res) => {
  try {
    const clientId = req.params.id;
    await deleteClient(clientId);
    return res.status(200).json({
      error: false,
      message: "client deleted",
    });
  } catch (e) {
    return res.status(e.code).json({
      error: true,
      message: e.message,
    });
  }
});
router.post("/block", async (req, res) => {
  try {
    await blockClient(req.body.clientId);
    return res.status(200).json({
      error: false,
      message: "",
    });
  } catch (e) {
    return res.status(e.code).json({
      error: true,
      message: e.message,
    });
  }
});

router.post("/restoreD", async (req, res) => {
  try {
    await restoreClientD(req.body.clientId);
    return res.status(200).json({
      error: false,
      message: "",
    });
  } catch (e) {
    return res.status(e.code).json({
      error: true,
      message: e.message,
    });
  }
});
router.post("/restoreB", async (req, res) => {
  try {
    await restoreClientB(req.body.clientId);
    return res.status(200).json({
      error: false,
      message: "",
    });
  } catch (e) {
    return res.status(e.code).json({
      error: true,
      message: e.message,
    });
  }
});

router.get("/info/:clientId", async (req, res) => {
  try {
    const client = await getClient(req.params.clientId);
    return res.status(200).json(client);
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
            { enseigne: { $regex: searchQuery, $options: "i" } },

            { siret: { $regex: searchQuery, $options: "i" } },
            { codeNaf: { $regex: searchQuery, $options: "i" } },
            { numéroTva: { $regex: searchQuery, $options: "i" } },
            { téléphone: { $regex: searchQuery, $options: "i" } },
            { adresse: { $regex: searchQuery, $options: "i" } },
            { codePostal: { $regex: searchQuery, $options: "i" } },
            { ville: { $regex: searchQuery, $options: "i" } },
            { pays: { $regex: searchQuery, $options: "i" } },
            { emailClient: { $regex: searchQuery, $options: "i" } },
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
    const client = await getAll();
    return res.status(200).json(client);
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
    const removedClients = await removeMultiple(ids);
    return res.status(200).json(removedClients);
  } catch (e) {
    return res.status(e.code >= 100 && e.code <= 600 ? e.code : 500).json({
      error: true,
      message: e.message,
    });
  }
});

module.exports = router;
