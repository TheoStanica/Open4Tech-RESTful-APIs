const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answer:{
        type: String,
    }
})

module.exports = mongoose.model("Answer", answerSchema);