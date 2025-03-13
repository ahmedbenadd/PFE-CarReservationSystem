const express = require("express");
const router = express.Router();
const idValidator = require("../middlewares/idValidationMiddleware");
const {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar, getBrandsWithModels,
} = require("../controllers/carController");

router.route("/brands").get(getBrandsWithModels);
router.route("/").get(getCars).post(createCar);
router.route("/:id").get(idValidator, getCarById).put(idValidator, updateCar).delete(idValidator, deleteCar);

module.exports = router;

