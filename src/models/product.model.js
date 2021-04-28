const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    model: {
        type: Schema.Types.ObjectId,
        ref: 'Model'
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    energy: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    seat: {
        type: Number,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    startingPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    auctionEndDate: {
        type: Date,
        required: true
    },
    isSold: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    offers: [{
        type: Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    created_at: {
        type: Date,
        require: true
    }
})

module.exports = mongoose.model('Product', productSchema);