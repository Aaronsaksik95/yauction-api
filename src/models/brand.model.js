const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    title: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Brand', brandSchema);