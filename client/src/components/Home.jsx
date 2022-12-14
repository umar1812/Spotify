import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Artists from './Artists'
import Songs from './Songs'

const Home = () => {
    const navigate = useNavigate()
    const [songDetails, setSongs] = useState([]);
    const [artistsDetails, setArtists] = useState([])

    const fetchSongs = async () => {
        const res = await fetch("http://localhost:5000/songs")
        const data1 = await res.json();
        setSongs(data1);
    }
    const fetchArtists = async () => {
        const res = await fetch("http://localhost:5000/artists")
        const data2 = await res.json();
        setArtists(data2);
    }

    useEffect(() => {
        fetchSongs();
        fetchArtists()
    }, [])

    const navAddSong = () => {
        navigate("/addsong")
    }


    return (
        <div className='homeMain'>
            <header className='spacebtw' id='head'>
                <span><h3>Home</h3></span>
                <input type="search" placeholder='Search' className='search' />
            </header>
            <div className='spacebtw'>
                <span><h3>Top 10 Songs</h3></span>
                <button className='AddButton' onClick={navAddSong}><span id='AddIcon'>+</span>  Add song</button>
            </div>
            <div className='forPadding'>
                <table className='songTable'>
                    <thead className='row'>
                        <td className='heads'>Artwork</td>
                        <td className='heads'>Song</td>
                        <td className='heads'>Date of release</td>
                        <td className='heads'>Artists</td>
                        <td className='heads'>Rate</td>
                    </thead>
                    <tbody>
                        {songDetails.map((value) => {
                            return (
                                <Songs
                                    artwork={value.artwork}
                                    song={value.song}
                                    release={value.release}
                                    artist={value.artist}
                                />
                            )
                        })}

                    </tbody>
                </table>
            </div>
            <br />
            <h3 className='leftpad'>Top 10 Artists</h3>
            <table className='songTable'>
                <thead className='row'>
                    <td className='heads2'>Artists</td>
                    <td className='heads2'>Date of Birth</td>
                    <td className='heads3'>Song</td>
                </thead>
                <tbody>
                    {artistsDetails.map((value) => {
                        return (
                            <Artists
                                artist={value.artist}
                                dob={value.dob}
                            />
                        )
                    })}
                </tbody>

            </table>

        </div >
    )
}

export default Home