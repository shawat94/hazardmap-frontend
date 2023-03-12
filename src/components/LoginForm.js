import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import usersReducer, { loginUser, logoutUser } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import hazardsService from '../services/hazardsService'
import loginService from '../services/loginService'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [loggedUser, setLoggedUser] = useState(null)

    const [loggedUser, setLoggedUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          setLoggedUser(user)
          hazardsService.setToken(user.token)
        }
      }, [])

    const handleLogin = async () => {
        const newUser = await loginService.login({"username": username, "password": password})
        setLoggedUser(newUser)
        window.localStorage.setItem('loggedUser', JSON.stringify(newUser))
        hazardsService.setToken(newUser.token)
        setPassword('')
        setUsername('')
    }

    const handleLogout = () => {
        setLoggedUser(null)
        window.localStorage.removeItem('loggedUser')
        hazardsService.setToken('')
        setPassword('')
        setUsername('')
    }

    return (
        <>
            {!loggedUser 
                ? <div className="login-form">
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
                :   <div>
                        <Typography>{`Logged in as ${loggedUser.username}`}</Typography>
                        <Button variant="outline-warning" onClick={handleLogout}>Logout</Button>
                    </div>
                }
            </>
        )    
    }

export default LoginForm