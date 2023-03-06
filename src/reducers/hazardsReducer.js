import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const hazardsUrl = '/api/v1/hazards/'


const hazardsSlice = createSlice ({
  name: 'hazards',
  initialState: false,
  reducers: {
    setHazards(state, action) {
      return action.payload
    }
  }
})

const hazardsReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'SET_HAZARDS':
        return action.payload
      default:
        return state
    }
  }

export const initializeHazards = () => {
  return async dispatch => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL
    console.log(baseUrl + hazardsUrl)
    const response = await axios.get(baseUrl + hazardsUrl)
    console.log(response.data)
    let data = response.data
    dispatch(setHazards(data))
  }
}

export const hazardsChange = hazards => {
  return {
    type: 'SET_HAZARDS',
    payload: hazards,
  }
}

export const { setHazards } = hazardsSlice.actions

export default hazardsSlice.reducer