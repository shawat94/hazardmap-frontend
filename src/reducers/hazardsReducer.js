import { createSlice } from '@reduxjs/toolkit'
import hazardsService from '../services/hazardsService'


const hazardsSlice = createSlice ({
  name: 'hazards',
  initialState: false,
  reducers: {
    setHazards(state, action) {
      return action.payload
    },
    appendHazard(state, action) {
      state.features.push(action.payload)
    },
    deleteHazard(state, action) {
      return {type: 'FeatureCollection', features: state.features.filter(item => item.properties.id != action.payload)}
    }
  }
})

export const initializeHazards = () => {
  return async dispatch => {
    const data = await hazardsService.getAll()
    console.log(data)
    dispatch(setHazards(data))
  }
}

export const createHazard = hazard => {
  return async dispatch => {
    const newHazard = await hazardsService.create(hazard)
    console.log(newHazard)
    dispatch(appendHazard(newHazard))
  }
}

export const removeHazard = hazard_id => {
  return async dispatch => {
    const response = await hazardsService.remove(hazard_id)
    console.log(response)
    dispatch(deleteHazard(hazard_id))  
  }
}



export const { setHazards, appendHazard, deleteHazard } = hazardsSlice.actions

export default hazardsSlice.reducer