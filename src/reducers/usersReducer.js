const usersReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'SET_USERS':
        return action.payload
      default:
        return state
    }
  }
  
  export const usersChange = users => {
    return {
      type: 'SET_USERS',
      payload: users,
    }
  }
  
  export default usersReducer