export const reducer = (state, action) => {
  switch (action.type) {
    case 'JOINED':
      const {roomId, userName, isJoined} = action.payload;
      return {
        ...state,
        joined: isJoined,
        roomId,
        userName 
      }

    case 'SET_DATA':
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      }

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      }

    case 'NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
  
    default:
      return state;
  }
}