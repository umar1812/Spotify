import React from 'react'

const Songs = (props) => {
    return (
        <tr className='row'>
            <td className='song'><img src={props.artwork} alt="album art" /></td>
            <td className='song'>{props.song}</td>
            <td className='song'>{props.release}</td>
            <td className='song'>{props.artist}</td>
        </tr>
    )
}

export default Songs