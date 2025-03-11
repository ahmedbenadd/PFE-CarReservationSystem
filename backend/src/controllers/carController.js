const Car = require('../models/Car');

const getCars = async (req, res) => {
    const cars = await Car.find();
    res.status(200).json(cars);
    console.log(cars)
};

const getCarById = async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        throw new Error('CarPage not found');
    }
    res.status(200).json(car);
    console.log(car)
};

const getBrandsWithModels = async (req, res) => {
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
    } catch (err) {
        throw new Error('Failed to fetch brands with models');
    }
};

const createCar = async (req, res) => {
    const { brand, model, hp, engineSize, gear, body, fuel, availability, price, imgUrl } = req.body;

    if (!brand || !model || !hp || !engineSize || !gear || !body || !fuel || !price || !imgUrl) {
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
};

const updateCar = async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        throw new Error('CarPage not found');
    }

    const updatedCar = await Car.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedCar);
};

const deleteCar = async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        throw new Error('CarPage not found');
    }

    await Car.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'CarPage deleted successfully', car });
};

module.exports = {
    getCars,
    getCarById,
    getBrandsWithModels,
    createCar,
    updateCar,
    deleteCar,
};
