const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    title: String,
    description: String,
    rating: Number,
    status: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}

})

const ShowModel = mongoose.model("shows", showSchema);

module.exports = ShowModel