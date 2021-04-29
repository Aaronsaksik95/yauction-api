const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    lastName: {
        type: String,
        required: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 60,
        unique: true
    },
    phone: {
        type: String
    },
    credit: {
        type: Number
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    offers: [{
        type: Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    created_at: {
        type: Date,
        require: true
    }
})

module.exports = mongoose.model('User', userSchema);