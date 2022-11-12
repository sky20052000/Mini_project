const express = require("express");
const shopController  = require("../controller/shopController");
const { verifyToken} = require("../middleware/auth")
const router = express.Router();


router.post("/add",verifyToken,shopController.create);
router.get("/detail/:id",verifyToken,shopController.shopDetail);

router.post("/comment/:id",verifyToken,shopController.comments);

module.exports = router;