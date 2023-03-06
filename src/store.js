import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersReducer'
import hazardsReducer from './reducers/hazardsReducer'

const store = configureStore({
    reducer: {
      hazards: hazardsReducer,
      users: usersReducer
    }
  })

  export default store