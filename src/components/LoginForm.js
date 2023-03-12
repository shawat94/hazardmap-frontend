import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import usersReducer, { loginUser, logoutUser, registerUser } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import hazardsService from '../services/hazardsService'
import loginService from '../services/loginService'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [loggedUser, setLoggedUser] = useState(null)

    //const [loggedUser, setLoggedUser] = useState(null)

    const loggedUser = useSelector(state => state.users)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user)
          if (user) {
            dispatch(registerUser(user))
            hazardsService.setToken(user.token)
          }
        }
      }, [dispatch])

    const handleLogin = async () => {
        dispatch(loginUser({'username': username, 'password': password}))
        setPassword('')
        setUsername('')
    }

    const handleLogout = () => {
        dispatch(logoutUser())
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