import { createSlice, current } from '@reduxjs/toolkit'
import hazardsService from '../services/hazardsService'
import usersService from '../services/usersService'
import loginService from '../services/loginService'

const usersSlice = createSlice ({
    name: 'users',
    initialState: false,
    reducers: {
      setUser(state, action) {
        return action.payload
      }
    }
  })

  export const createUser = user => {
    return async dispatch => {
        const newUser = await usersService(user)
        dispatch(setUser(newUser))
    }
  }

  export const loginUser = userCredentials => {
    return async dispatch => {
        const newUser = await loginService.login(userCredentials)
        window.localStorage.setItem('loggedUser', JSON.stringify(newUser))
        dispatch(setUser(newUser))
    }
  }

  export const logoutUser = () => {
    return async dispatch => {
        dispatch(setUser(null))
    }
  }

  export const registerUser = user => {
    return async dispatch => {
        dispatch(setUser(user))
    }
  }

  export const { setUser } = usersSlice.actions

  
  export default usersSlice.reducer