const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.create = (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
        created_at: Date.now()
    });
    user.save()
        .then((data) => {
            let userToken = jwt.sign({
                id: data._id,
                isAdmin: data.isAdmin
            },
                process.env.SECRET_JWT,
                {
                    expiresIn: 86400
                }
            )
            res.send({
                token: userToken,
                auth: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating user"
            })
        })
}

exports.login = (req, res) => {
    console.log(req.body)
    User.findOne({
        email: req.body.email,
    })
        .then((data) => {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                let userToken = jwt.sign({
                    id: data._id,
                    isAdmin: data.isAdmin
                },
                    process.env.SECRET_JWT,
                    {
                        expiresIn: 86400
                    }
                )
                res.send({
                    token: userToken,
                    auth: true
                })
            } else {
                res.status(500).send({
                    error: 500,
                    message: "Password is incorrect"
                })
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: "Email is incorrect"
            })
        })

}

exports.readOne = (req, res) => {

    User.findById(req.params.id)
        .populate('offers')
        .then((data) => {
            res.send({
                user: data,
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

exports.read = (req, res) => {

    User.find()
        .populate('offers')
        .then((data) => {
            res.send({
                users: data,
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

function getOne(id) {
    return User.findById(id)
        .populate('offers')
}

exports.update = (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country,
            isAdmin: req.body.isAdmin
        }
    )
        .then(() => {
            getOne(req.params.id)
                .then((data) => {
                    res.send({

                        user: data,
                        update: true,
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
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send({
                delete: true
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
