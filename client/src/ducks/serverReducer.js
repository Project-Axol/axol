const initialState = {
  server: {},
  servers: []
}

const SELECT_SERVER = 'SELECT_SERVER'
const USER_SERVERS = 'USER_SERVERS'

export function selectServer(server) {
  return {
    type: SELECT_SERVER,
    payload: server
  }
}

export function userServers(servers) {
  return {
    type: USER_SERVERS,
    payload: servers
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_SERVER:
      return {...state, server: action.payload}
    case USER_SERVERS:
      return {...state, servers: action.payload}
    default:
      return state
  }
}