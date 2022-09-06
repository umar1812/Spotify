import React from 'react'

const Artists = (props) => {
    return (
        <tr className='row'>
            <td className='artists'>{props.artist}</td>
            <td className='artists'>{props.dob}</td>
        </tr>
    )
}

export default Artists