import React, { useState } from 'react'
import { Button } from '@mui/material'
import { loginUser } from '../reducers/usersReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        await dispatch(loginUser({"username": username, "password": password}))
    }

    return (
        <>
            <div className="login-form">
            <div className="login-fields">
                <div>
                Username
                    <input
                    id="login-username-field"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                Password
                    <input
                    id="login-password-field"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
            </div>
            <Button variant="outline-warning" onClick={handleLogin}>Login</Button>
            </div>
        </>
    )
}

export default LoginForm