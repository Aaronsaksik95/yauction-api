const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
})

module.exports = mongoose.model('Model', modelSchema);