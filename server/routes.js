const express = require("express");
const router = express.Router()
const User = require("./db/model/userSchema")
const Artist = require('./db/model/artists')
const Song = require("./db/model/songs")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


router.post("/login", async (req, res) => {
    try {
        const login = await User.findOne({ $or: [{ name: req.body.id }, { email: req.body.id }] })
        if (login) {
            const match = bcrypt.compareSync(req.body.password, login.password)
            if (match) {
                const token = jwt.sign({ name: login.name }, process.env.SECRET_KEY);
                console.log(token)
                res.status(200).send(token)
                console.log("logged in")
            } else {
                res.status(401).send("Invalid user")

            }
        } else {
            res.status(400).send("Invalid credentials")
        }

    } catch (err) {
        console.log("Invalid login details")
        res.status(401).send("Invalid login details")
    }
})

router.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const newUser = await user.save();
        console.log(newUser, "User added successfully");
        res.status(201).send(newUser)

    } catch (err) {
        res.status(500).send()
        console.log(err.message + "Status code 500")
    }
})

router.get("/artists", async (req, res) => {
    try {
        const art = await Artist.find().sort({ avgr: -1 }).limit(10)
        res.send(art)
    } catch (error) {
        res.status(500).send();
        console.log(error.message)
    }
})

router.post("/artists/post", async (req, res) => {
    try {
        const artist = new Artist({
            artist: req.body.artist,
            dob: req.body.dob,
            bio: req.body.bio
        })
        const newArt = await artist.save();
        console.log("New artist added successfully")
        res.status(201).send(newArt)
    } catch (error) {
        res.status(500).send()
        console.log(error.message + "from server")
    }
})

router.patch("/update", async (req, res) => {
    try {
        ///To update songs///
        const findSong = await Song.find({
            song: req.body.song
        })
        let newR = parseInt(findSong.totalr) + 1;
        let newAvgr = Math.ceil((parseInt(req.body.review) + parseInt(findSong.avgr)) / newR)
        const updateSong = await Song.updateOne({ song: req.body.song }, {
            $set: {
                totalr: newR,
                avgr: newAvgr
            }
        });
        console.log(updateSong)

        ///To update artist///
        const findArtist = await Artist.find({
            artist: req.body.artist
        })
        let newR2 = parseInt(findArtist.totalr) + 1;
        let newAvgr2 = Math.ceil((parseInt(req.body.review) + parseInt(findArtist.avgr)) / newR2)
        const updateArtist = await Artist.updateOne({ artist: req.body.artist }, {
            $set: {
                totalr: newR2,
                avgr: newAvgr2
            }
        })
        console.log(updateArtist)

        res.status(202).send("Review updated")


    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message)
    }
})

router.post('/songs/post', async (req, res) => {
    try {
        const createSong = new Song({
            song: req.body.song,
            artist: req.body.artist,
            release: req.body.release,
        })
        const newSong = await createSong.save()
        res.status(201).send(newSong)
    } catch (error) {
        res.status(500).send(error.message)
        console.log(error.message)
    }
})

router.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find().sort({ avgr: -1 }).limit(10)
        res.send(songs)
    } catch (error) {
        res.status(500).send();
        console.log(error.message)
    }
})

module.exports = router;