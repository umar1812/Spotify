import React from 'react'

const Songs = (props) => {
    return (
        <tr>
            <td><img src={props.artwork} alt="album art" /></td>
            <td>{props.song}</td>
            <td>{props.release}</td>
            <td>{props.artist}</td>
        </tr>
    )
}

export default Songs