const mongoose = require('mongoose');

const idValidator = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.json({
            success: false,
            message: 'Car ID is invalid'
        })
    }
    next();
};

module.exports = idValidator;
