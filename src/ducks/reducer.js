import axios from 'axios';

const initialState = {
    user: {}
}

const GET_USER_INFO = 'GET_USER_INFO'



export function getUserInfo() {
  return {
      type: GET_USER_INFO,
      payload: axios.get('/auth/me')
  }
}



export default (state = initialState, action) => {
  switch (action.type) {

  case GET_USER_INFO + '_FULFILLED':
    return Object.assign({},state, {user: action.payload.data})

  default:
    return state
  }
}
