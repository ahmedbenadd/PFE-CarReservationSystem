const mongoose = require('mongoose');

const idValidator = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error("Invalid car ID");
    }
    next();
};

module.exports = idValidator;
