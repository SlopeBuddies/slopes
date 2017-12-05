import axios from 'axios';

const initialState = {
    user: {},
    allhomies: {}
}

const GET_USER_INFO = 'GET_USER_INFO'
const GET_ALL_FRIENDS = 'GET_ALL_FRIENDS'



export function getUserInfo() {
  return {
      type: GET_USER_INFO,
      payload: axios.get('/auth/me')
  }
}

export function getAllFriends(id) {
  console.log('id:', id)
  const allhomies = axios.get(`/friends/all/${id}`).then(response => {
    return response.data
    console.log('promiseresponse:',response.data)

  })
      return {
        type: GET_ALL_FRIENDS,
        payload: allhomies
      }
}

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_USER_INFO + '_FULFILLED':
    return Object.assign({},state, {user: action.payload.data})

    case GET_ALL_FRIENDS + '_FULFILLED':
    console.log(action.payload)
    return Object.assign({}, state, {allhomies: action.payload})

  default:
    return state
  }
}
