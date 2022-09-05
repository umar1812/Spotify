const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }

})

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 6);
    }
    next()
})

const User = mongoose.model("User", userSchema);
module.exports = User;