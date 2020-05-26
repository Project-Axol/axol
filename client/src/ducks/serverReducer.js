const initialState = {
  server: {}
}

const SELECT_SERVER = 'SELECT_SERVER'

export function selectServer(server) {
  return {
    type: SELECT_SERVER,
    payload: server
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_SERVER:
      return {...state, server: action.payload}
    default:
      return initialState
  }
}