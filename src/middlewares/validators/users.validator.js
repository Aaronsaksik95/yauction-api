const Joi = require('joi');

function validateCreateUser(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
    });

    const validation = schema.validate(req.body)
    if (validation.error) {
        return res.status(404).send({
            error: validation.error
        })
    }
    next();

}

module.exports = validateCreateUser;