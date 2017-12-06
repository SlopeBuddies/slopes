import axios from "axios";

const initialState = {
  user: {},
  profile: {},
  userLogged: false,
  allhomies: {},
  position: {}
};

const GET_USER_INFO = "GET_USER_INFO";
const GET_PROFILE = "GET_PROFILE";
const CHECK_USER = "CHECK_USER";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const GET_USER_LOCATION = "GET_USER_LOCATION";


const GET_ALL_FRIENDS = "GET_ALL_FRIENDS";

export function getUserInfo() {
  return {
    type: GET_USER_INFO,
    payload: axios.get("/auth/me")
  };
}

export function getUserLocation(position) {

  return {
    type: GET_USER_LOCATION,
    payload: axios.put(`/user/location`, {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  };
}

export function getProfile(id) {
  console.log(id);

  const profile = axios.get(`/user/${id}`).then(res => {
    return res.data;
  });

  return {
    type: GET_PROFILE,
    payload: profile
  };
}

export function checkUser() {
  const checked = axios.get("/checkuser").then(res => {
    return res.data;
  });

  return {
    type: CHECK_USER,
    payload: checked
  };
}

export function updateProfile(id, user) {
  const update = axios.put(`/users/${id}`, user).then(res => res.data[0]);
  return {
    type: UPDATE_PROFILE,
    payload: update
  };
}

export function getAllFriends(id) {
  console.log("id:", id);
  const allhomies = axios.get(`/friends/all/${id}`).then(response => {
    return response.data;
    console.log("promiseresponse:", response.data);
  });
  return {
    type: GET_ALL_FRIENDS,
    payload: allhomies
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, { user: action.payload.data });

    case GET_PROFILE + "_FULFILLED":
      return Object.assign({}, state, { profile: action.payload[0] });

    case CHECK_USER + "_FULLFILLED":
      return Object.assign({}, state, { userLogged: action.payload });

    case UPDATE_PROFILE + "_FULFILLED":
      return Object.assign({}, state, { profile: action.payload });

    case GET_ALL_FRIENDS + "_FULFILLED":
      console.log(action.payload);
      return Object.assign({}, state, { allhomies: action.payload });

    case GET_USER_LOCATION + "_FULFILLED":
      console.log("pstnpayload:", action.payload);
      return Object.assign({}, state, { position: action.payload });

    default:
      return state;
  }
};
