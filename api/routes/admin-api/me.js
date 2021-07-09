const express = require("express");
const CheckAdminAuth = require("../../middlewares/admin/check-auth");
const router = express.Router();
router.get("/", CheckAdminAuth, (req, res) => res.status(200).json(req.user));
module.exports = router;
