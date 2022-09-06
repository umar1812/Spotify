import React, { useState } from 'react'
import { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AddArtist from './AddArtist'

const AddSong = () => {
    const navigate = useNavigate()
    const [newSong, setSong] = useState({
        song: "",
        artist: "",
        release: "",
        artwork: ""
    })

    const [artistsDetails, setArtists] = useState([])
    const [isClicked, setClick] = useState(false)

    const clickin = () => {
        setClick(!isClicked)
    }
    const fetchArtists = async () => {
        const res = await fetch("http://localhost:5000/artists")
        const data2 = await res.json();
        setArtists(data2);
    }
    useEffect(() => {
        fetchArtists()
    }, [])


    const convertFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => { reject(error) }
        });
    }
    const handleFile = async (e) => {
        const imgPath = await convertFile(e.target.files[0]);
        setSong({ ...newSong, artwork: imgPath })
    }

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
    const saveDate = (e) => {
        let date = e.target.value
        let newDate = date.split("-")
        let temp = newDate[0];
        newDate[0] = newDate[2]
        newDate[2] = temp
        newDate[1] = months[newDate[1] - 1]
        newDate = newDate.join(" ")
        setSong({ ...newSong, release: newDate })
    }

    const saveInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSong({ ...newSong, [name]: value })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { song, artist, release, artwork } = newSong;
            await fetch('http://localhost:5000/songs/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    song, artist, release, artwork
                })
            })
            console.log("Song added successfully")
            navigate("/home")
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div>
            <h2>Add a new song</h2>
            <span>
                <label>Song name: </label>
                <input type="text" name='song' onChange={(e) => { saveInput(e) }} />
            </span>
            <br />
            <span>
                <label>Date released: </label>
                <input type="date" name='release' onChange={(e) => { saveDate(e) }} />
            </span>
            <br />
            <span>
                <label>Artwork: </label>
                <input type="file" onChange={(e) => { handleFile(e) }} />
            </span>
            <br />
            <span>
                <label>Artists: </label>
                <select placeholder='Search' name='artist' onChange={(e) => { saveInput(e) }}>
                    {artistsDetails.map((value) => {
                        return (
                            <option value={value.artist}>{value.artist}</option>
                        )
                    })}
                </select>
                <button onClick={clickin}><span>+</span>Add Artist</button>
            </span>
            <br />
            <span>
                <button onClick={handleSubmit} >Save</button>
                <button>Cancel</button>
            </span>


            {/* ......................Add artist section........................ */}
            {
                isClicked && <div>
                    <header>
                        <button onClick={clickin}>X</button>
                    </header>
                    <AddArtist />
                </div>
            }
        </div >
    )
}

export default AddSong