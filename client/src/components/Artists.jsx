import React from 'react'

const Artists = (props) => {
    return (
        <tr>
            <td>{props.artist}</td>
            <td>{props.dob}</td>
        </tr>
    )
}

export default Artists