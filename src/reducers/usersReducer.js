import { createSlice, current } from '@reduxjs/toolkit'
import hazardsService from '../services/hazardsService'
import usersService from '../services/usersService'
import loginService from '../services/loginService'

const usersSlice = createSlice ({
    name: 'users',
    initialState: {},
    reducers: {
      setUser(state, action) {
        console.log(current(state))
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
        dispatch(setUser({user: newUser, loggedIn: false}))
    }
  }

  export const logoutUser = () => {
    return async dispatch => {
        dispatch(setUser({user: null, loggedIn: false}))
    }
  }

  export const { setUser } = usersSlice.actions

  
  export default usersSlice.reducer