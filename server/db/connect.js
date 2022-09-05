const mongoose = require('mongoose')
const db = process.env.DATABASE

mongoose.connect(db)
    .then(console.log("Connected to the database"))
    .catch((error) => { console.log(`From the database - ${error.message}`) })