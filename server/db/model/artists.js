const mongoose = require('mongoose')

const create = new mongoose.Schema({
    artist: String,
    dob: {
        type: String
    },
    bio: String,
    totalr: {
        type: Number,
        default: 0
    },
    avgr: {
        type: Number,
        default: 0
    }
})

const Artist = mongoose.model("Artist", create);
module.exports = Artist;
