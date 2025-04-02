const express = require("express");
const router = express.Router();
const idValidator = require("../middlewares/idValidationMiddleware");
const {
    getCars,
    getCarById,
    getBrandsWithModels,
} = require("../controllers/carController");

router.route("/brands").get(getBrandsWithModels);
router.route("/").get(getCars);
router.route("/:id").get(idValidator, getCarById);

module.exports = router;