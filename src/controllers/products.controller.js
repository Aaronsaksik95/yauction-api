const Product = require('../models/product.model');
const Offer = require('../models/offers.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
    const product = new Product({
        image: req.body.image,
        type: req.body.type,
        state: req.body.state,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        energy: req.body.energy,
        mileage: req.body.mileage,
        seat: req.body.seat,
        region: req.body.region,
        startingPrice: req.body.startingPrice,
        description: req.body.description,
        auctionEndDate: req.body.auctionEndDate,
        user: req.body.user,
        created_at: Date.now()
    });
    product.save()
        .then((data) => {
            User.findByIdAndUpdate(
                req.body.user,
                {
                    $push: { products: data._id }
                }).then(() => {
                    res.send({
                        product: data,
                        created: true
                    })
                })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err
            })
        })

}

exports.read = (req, res) => {
    Product.find()
        .sort('-created_at')
        .populate("brand")
        .populate("model")
        .then((data) => {
            res.send({
                products: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating product"
            })
        })
}

exports.readOne = (req, res) => {
    Product.findById(req.params.id)
        .populate("brand")
        .populate("model")
        .then((data) => {
            res.send({
                product: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
}

exports.readWithFilter = (req, res) => {
    var filter = {
        type: req.query.vehicle
    }
    if (req.query.state != '') { filter.state = req.query.state }
    if (req.query.brand != '') { filter.brand = req.query.brand }
    if (req.query.model != '') { filter.model = req.query.model }
    if (req.query.yearMin != 0 || req.query.yearMax != 0) { filter.year = { $gte: req.query.yearMin, $lte: req.query.yearMax } }
    if (req.query.color != '') { filter.color = req.query.color }
    if (req.query.energy != '') { filter.energy = req.query.energy }
    if (req.query.mileageMin != 0 || req.query.mileageMax != 0) { filter.mileage = { $gte: req.query.mileageMin, $lte: req.query.mileageMax } }
    if (req.query.region != '') { filter.region = req.query.region }
    if (req.query.startingPriceMin != 0 || req.query.startingPriceMax != 0) { filter.startingPrice = { $gte: req.query.startingPriceMin, $lte: req.query.startingPriceMax } }

    Product.find(
        filter
    )
        .sort('-created_at')
        .populate("brand")
        .populate("model")
        .then((data) => {
            res.send({
                products: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating product"
            })
        })
}

exports.readWithVehicle = (req, res) => {
    Product.find({ type: req.params.vehicle, isSold: false })
        .sort('-created_at')
        .populate("brand")
        .populate("model")
        .then((data) => {
            res.send({
                products: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating product"
            })
        })
}

exports.readWithVehicleAdmin = (req, res) => {
    Product.find({ type: req.params.vehicle })
        .sort('-created_at')
        .populate("brand")
        .populate("model")
        .then((data) => {
            res.send({
                products: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating product"
            })
        })
}

exports.readWithUser = (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.SECRET_JWT);
    Product.find({ user: decode.id })
        .sort('-created_at')
        .populate("brand")
        .populate("model")
        .then((data) => {
            res.send({
                products: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating product"
            })
        })
}

function getOne(id) {
    return Product.findById(id)
}

exports.update = (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        {
            image: req.body.image,
            type: req.body.type,
            state: req.body.state,
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            energy: req.body.energy,
            mileage: req.body.mileage,
            seat: req.body.seat,
            region: req.body.region,
            startingPrice: req.body.startingPrice,
            description: req.body.description,
        }
    )
        .then(() => {
            getOne(req.params.id)
                .then((data) => {
                    res.send({
                        product: data,
                        update: true
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        error: 500,
                        message: err.message || "NULL"
                    })
                })
        })
        .catch((err) => {
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
}

exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => {
            Offer.deleteMany({ product: req.params.id })
                .then(() => {
                    res.send({
                        delete: true
                    })
                })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
}