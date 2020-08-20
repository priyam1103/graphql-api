const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    name: {
        type:String
    },
    genere: {
        type:String
    },
    authorid: {
        type:String
    }
})

module.exports = mongoose.model("Book", BookSchema);
