import { createSlice, current } from '@reduxjs/toolkit'
import hazardsService from '../services/hazardsService'
import usersService from '../services/usersService'
import loginService from '../services/loginService'

const usersSlice = createSlice ({
    name: 'users',
    initialState: {},
    reducers: {
      setUser(state, action) {
        state.loggedUser = action.payload
      }
    }
  })

  export const createUser = user => {
    return async dispatch => {
        const newUser = await usersService(user)
        window.localStorage.setItem('loggedUser', JSON.stringify(newUser))
        hazardsService.setToken(newUser.token)
        dispatch(setUser(newUser))
    }
  }

  export const loginUser = userCredentials => {
    return async dispatch => {
        const newUser = await loginService.login(userCredentials)
        window.localStorage.setItem('loggedUser', JSON.stringify(newUser))
        hazardsService.setToken(newUser.token)
        dispatch(setUser(newUser))
    }
  }

  export const { setUser } = usersSlice.actions

  
  export default usersSlice.reducer