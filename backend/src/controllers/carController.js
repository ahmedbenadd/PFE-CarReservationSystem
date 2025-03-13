const Car = require('../models/Car');

const getCars = async (req, res, next) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
};

const getCarById = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404);
            throw new Error('Car not found');
        }
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
};

const getBrandsWithModels = async (req, res, next) => {
    try {
        const brandsWithModels = await Car.aggregate([
            {
                $group: {
                    _id: '$brand', // Group by brand
                    models: {
                        $push: { // Use $push to create an array of models
                            name: '$model', // Include model name
                            id: '$_id'      // Include car ID
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    brand: '$_id', // Rename _id to brand
                    models: 1 // Include the models array
                }
            }
        ]);
        res.status(200).json(brandsWithModels);
    } catch (error) {
        next(error);
    }
};

const createCar = async (req, res, next) => {
    try {
        const { brand, model, hp, engineSize, gear, body, fuel, availability, price, imgUrl } = req.body;

        if (!brand || !model || !hp || !engineSize || !gear || !body || !fuel || !price || !imgUrl) {
            res.status(400);
            throw new Error('All fields are mandatory!');
        }

        const car = await Car.create({
            brand,
            model,
            hp,
            engineSize,
            gear,
            body,
            fuel,
            availability: availability || true,
            price,
            imgUrl
        });

        res.status(201).json(car);
    } catch (error) {
        next(error);
    }
};

const updateCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404);
            throw new Error('Car not found');
        }

        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedCar);
    } catch (error) {
        next(error);
    }
};

const deleteCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404);
            throw new Error('Car not found');
        }

        await Car.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Car deleted successfully', car });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCars,
    getCarById,
    getBrandsWithModels,
    createCar,
    updateCar,
    deleteCar,
};