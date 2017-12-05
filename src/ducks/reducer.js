import axios from 'axios';

const initialState = {
    user: {},
    profile: {},
    userLogged: false
}

const GET_USER_INFO = 'GET_USER_INFO'
const GET_PROFILE = 'GET_PROFILE'
const CHECK_USER = 'CHECK_USER'



export function getUserInfo() {
  return {
      type: GET_USER_INFO,
      payload: axios.get('/auth/me')
  }
}

export function getProfile(id){
  console.log(id)

  const profile = axios.get(`/user/${id}`).then(res=>{
    return res.data
  })

  return {
    type: GET_PROFILE,
    payload: profile
  }
}

export function checkUser(){

  const checked = axios.get('/checkuser').then(res=>{
    return res.data
  })

  return {
    type:CHECK_USER,
    payload: checked
  }
}



export default (state = initialState, action) => {
  switch (action.type) {

  case GET_USER_INFO + '_FULFILLED':
    return Object.assign({},state, {user: action.payload.data})

  case GET_PROFILE + '_FULFILLED':
    return Object.assign({},state, {profile: action.payload[0]})

  case CHECK_USER + '_FULLFILLED':
    return Object.assign({},state, {userLogged: action.payload})

  default:
    return state
  }
}
