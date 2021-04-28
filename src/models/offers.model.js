const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offersSchema = new Schema({
    status: {
        type: String,
        require: true,
        default: "waiting"
    },
    offeredPrice: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    created_at: {
        type: Date,
        require: true
    },
})

module.exports = mongoose.model('Offer', offersSchema);