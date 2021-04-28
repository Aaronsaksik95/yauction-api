const Model = require('../models/model.model');

exports.create = (req, res) => {
    const model = new Model({
        title: req.body.title,
        brand: req.body.brand
    });

    model.save()
        .then((data) => {
            res.send({
                model: data,
                created: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating model"
            })
        })

}
exports.read = (req, res) => {
    Model.find()
        .then((data) => {
            res.send({
                models: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating model"
            })
        })
}

exports.readWithBrand = (req, res) => {
    Model.find({ brand: req.params.brand })
        .then((data) => {
            res.send({
                models: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating model"
            })
        })
}

exports.readOneTitle = (req, res) => {
    Model.findOne({ title: req.params.title })
        .then((data) => {
            res.send({
                model: data,
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

exports.readOne = (req, res) => {
    Model.findOne({_id: req.params.id})
        .then((data) => {
            res.send({
                model: data,
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
    Model.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            brand: req.body.brand
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