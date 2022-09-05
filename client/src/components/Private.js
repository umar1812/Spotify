import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const Private = () => {
    const auth = localStorage.getItem("user")
    return (
        auth ? <Outlet /> : <Navigate to={"/"} />
    )
}

function getToken() {
    if (window.localStorage) {
        return window.localStorage.getItem("user")
    }
    return ""
}

export default Private
export { getToken } 