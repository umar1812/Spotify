import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

const AddArtist = () => {
    // const navigate = useNavigate()
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];


    const [newArtist, setArtist] = useState({
        artist: "",
        dob: "",
        bio: ""
    })

    // const [date, setDate] = useState("")
    const saveDate = (e) => {
        let date = e.target.value
        console.log(date)
        let newDate = date.split("-")
        let temp = newDate[0];
        newDate[0] = newDate[2]
        newDate[2] = temp
        newDate[1] = months[newDate[1] - 1]
        newDate = newDate.join(" ")
        setArtist({ ...newArtist, dob: newDate })
    }


    const saveInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setArtist({ ...newArtist, [name]: value })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { artist, dob, bio } = newArtist;
            await fetch('http://localhost:5000/artists/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    artist, dob, bio
                })
            })
            window.alert("Artist added successfully")
            console.log("Artist added successfully")
            window.location.reload()
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div>
            <span>
                <label>Artist's name: </label>
                <input type="text" name='artist' onChange={(e) => { saveInput(e) }} />
            </span>
            <br />
            <span>
                <label>Date of birth: </label>
                <input type="date" name='dob' onChange={(e) => { saveDate(e) }} />
            </span>
            <br />
            <span>
                <label>Bio: </label>
                <input type="text" name='bio' onChange={(e) => { saveInput(e) }} />
            </span>
            <br />
            <span>
                <button onClick={handleSubmit}>Done</button>
            </span>

        </div>
    )
}

export default AddArtist