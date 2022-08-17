const mongoose = require("mongoose");
const schema = mongoose.Schema

const subjects = new schema({
    title: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
    },
})

module.exports = mongoose.model("Subject", subjects);