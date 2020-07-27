const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    review:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Reviews", reviewSchema);