import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login() {
    let disabled = true;
    const navigate = useNavigate()
    const [id, setId] = useState("");
    const [pass, setPass] = useState("")

    let user = {
        "id": id,
        "password": pass
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("http://localhost:5000/login", user, { withCredentials: true, credentials: 'include' })
            console.log(res)
            localStorage.setItem("user", res.data)
            navigate("/home")

        } catch (err) {
            window.alert("Invalid credentials")
        }

    }
    const navReg = () => {
        navigate("/register")
    }

    if (user.id !== "" && user.password !== "") {
        disabled = false;
    }



    return (
        <div id='outermost'>
            <div className='blur'>
                <div className='form'>
                    <h3>Login to the world of music</h3>
                    <br />
                    <br />
                    <form action="">
                        <input type="text" placeholder='Username / Email' autoComplete='off' name='id' onChange={(e) => { setId(e.target.value) }} />
                        <br />
                        <input type="password" placeholder='Password' name='password' onChange={(e) => { setPass(e.target.value) }} />
                        <br />
                        <button onClick={handleSubmit} disabled={disabled}>Login</button>
                        <br />
                        <br />
                        <p>New to the app?</p>
                        <p id='anchor2' onClick={navReg} >Sign up</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login