const mongoose = require('mongoose')

const create = new mongoose.Schema({
    song: String,
    artist: String,
    release: String,
    artwork: String,
    totalr: {
        type: Number,
        default: 0
    },
    avgr: {
        type: Number,
        default: 0
    }
})

const Song = mongoose.model("Song", create)
module.exports = Song