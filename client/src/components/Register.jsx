import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    let disabled = true;
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const saveInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { name, email, password } = user;
            const res = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })
            console.log(res.status)

            if (res.status === 201) {
                navigate("/")
            } else {
                window.alert("User already exists")
            }
        } catch (err) {
            console.log(err.message)
        }

    }


    const navLog = () => {
        navigate("/")
    }

    if (user.name !== "" && user.email !== "" && user.password !== "") {
        disabled = false
    }

    return (
        <div id='outermost'>
            <div className='blur'>
                <div className='form'>
                    <h3>Sign up</h3>
                    <br />
                    <form action="">
                        <input onChange={(e) => { saveInput(e) }} id='reginput' type="text" placeholder='Email' name='email' />
                        <br />
                        <input onChange={(e) => { saveInput(e) }} id='reginput2' type="text" placeholder='Username' name='name' />
                        <br />
                        <input onChange={(e) => { saveInput(e) }} id='reginput3' type="password" placeholder='Password' name='password' />
                        <br />
                        <button disabled={disabled} onClick={handleSubmit}>Sign up</button>
                        <br />
                        <br />
                        <p>Already a user?</p>
                        <p id='anchor' onClick={navLog}>Sign in</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register