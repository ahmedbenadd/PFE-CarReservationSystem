const express = require("express");
const router = express.Router();
const {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar, getBrandsWithModels,
} = require("../controllers/carController");

router.route("/brands").get(getBrandsWithModels);
router.route("/").get(getCars).post(createCar);
router.route("/:id").get(getCarById).put(updateCar).delete(deleteCar);

module.exports = router;
