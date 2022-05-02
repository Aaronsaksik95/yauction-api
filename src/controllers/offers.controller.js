const Offer = require('../models/offers.model');
const User = require('../models/user.model');

const Product = require('../models/product.model');
const jwt = require('jsonwebtoken')

exports.create = (req, res) => {
    const offer = new Offer({
        offeredPrice: req.body.offeredPrice,
        user: req.body.user,
        product: req.body.product,
        created_at: Date.now()
    });
    // if (Product.findOne({_id: req.body.product}).startingPrice < req.body.offeredPrice){}
    Offer.updateMany({ product: req.body.product }, { status: "refused" })
        .then(() => {
            offer.save()
                .then((data) => {
                    User.findByIdAndUpdate(
                        req.body.user,
                        {
                            $push: { offers: data._id }
                        })
                        .then(() => {
                            Product.findByIdAndUpdate(
                                req.body.product,
                                {
                                    $push: { offers: data._id },
                                    startingPrice: req.body.offeredPrice
                                })
                                .then((data) => {
                                    res.send({
                                        data: data,
                                        response: true
                                    })
                                })
                        })
                        .catch((err) => {
                            res.status(500).send({
                                error: 500,
                                message: err.message
                            })
                        })
                })
                .catch((err) => {
                    console.log(err.message);
                    res.status(500).send({
                        error: 500,
                        message: err.message || "some error occured while creating offer"
                    })
                })
        })
}

exports.updateValidated = (req, res) => {
    Offer.find({ status: "waiting" })
        .populate("product")
        .then((data) => {
            data.forEach(offer => {
                if (offer.product.auctionEndDate <= Date.now()) {
                    Offer.findByIdAndUpdate(offer._id, { status: "validated" })
                        .then(() => {
                            Product.findByIdAndUpdate(offer.product._id, { isSold: true })
                                .then(() => {
                                    console.log(`update offer ${offer._id}`)
                                })
                        })
                }
            });
        })
}

exports.read = (req, res) => {
    Offer.find()
        .populate('product')
        .populate('user')
        .then((data) => {
            res.send({
                offers: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating offer"
            })
        })

}

exports.readMyOffers = (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.SECRET_JWT);
    Offer.find({ user: decode.id, status: req.params.status })
        .sort('-created_at')
        .populate('product')
        .then((data) => {
            res.send({
                myOffers: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating offer"
            })
        })

}

exports.readProductOffers = (req, res) => {
    Offer.find({ product: req.params.product })
        .sort('-created_at')
        .populate('user')
        .populate('product')
        .then((data) => {
            res.send({
                offers: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating offer"
            })
        })
}

exports.readUserOffers = (req, res) => {
    Offer.find({ user: req.params.user })
        .sort('-created_at')
        .populate('user')
        .populate('product')
        .then((data) => {
            res.send({
                offers: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating offer"
            })
        })
}

exports.readOne = (req, res) => {
    Offer.findById(req.params.id)
        .populate('product')
        .then((data) => {
            res.send({
                offer: data,
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

exports.update = (req, res) => {
    Offer.findByIdAndUpdate(req.params.id,
        {
            status: req.body.status
        }
    )
        .then((data) => {
            res.send({
                offer: data,
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

exports.delete = (req, res) => {
    Offer.findByIdAndDelete(req.params.id)
        .then((data) => {
            User.findByIdAndUpdate(
                req.body.user,
                {
                    $pull: { offers: data._id }
                })
                .then(() => {
                    res.send({
                        delete: true
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        error: 500,
                        message: err.message
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
