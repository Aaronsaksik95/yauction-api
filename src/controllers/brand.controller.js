const Brand = require('../models/brand.model');

exports.create = (req, res) => {
    const brand = new Brand({
        title: req.body.title,
    });

    brand.save()
        .then((data) => {
            res.send({
                brand: data,
                created: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating brand"
            })
        })

}
exports.read = (req, res) => {
    Brand.find()
        .then((data) => {
            res.send({
                brands: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating brand"
            })
        })

}

exports.readOne = (req, res) => {
    Brand.findOne({_id: req.params.id})
        .then((data) => {
            res.send({
                brand: data,
                response: true
            })
        })
        .catch((err) => {
            res.status(500).send({
                error: 500,
                response: false,
                message: err.message || "NULL"
            })
        })

}

exports.update = (req, res) => {
    Brand.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
        }
    ).then(() => {
        res.send({
            update: true
        })
    })
        .catch((err) => {
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
}