import axios from "axios";

const initialState = {
  user: {},
  profile: {},
  userLogged: false,
  allhomies: {},
  position: {},
  messageData: [],
  currentChat: [],
  resort: '',
  requests: [],
  chatNavOpen: true,
  channels: []
};

const GET_USER_INFO = "GET_USER_INFO";
const GET_PROFILE = "GET_PROFILE";
const CHECK_USER = "CHECK_USER";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const GET_USER_LOCATION = "GET_USER_LOCATION";

const CHECK_RESORT = "CHECK_RESORT"
const GET_ROOM_MESSAGES = 'GET_ROOM_MESSAGES'
const FIND_USERS = "FIND_USERS"
const GET_ALL_FRIENDS = "GET_ALL_FRIENDS";
const GET_REQUEST = 'GET_REQUEST';

const ACCEPT_FRIEND = 'ACCEPT_FRIEND';

const TOGGLE_CHANNELS_NAV = 'TOGGLE_CHANNELS_NAV';
const GET_ALL_CHANNELS = 'GET_ALL_CHANNELS';

export function getUserInfo() {
  return {
    type: GET_USER_INFO,
    payload: axios.get("/auth/me")
  };
}

// export function acceptFriend(from, user_id, r_id) {
//   console.log('reducerfromid', from, user_id, r_id)
//   const acceptfriend = axios.post(`/accept/friend/`, {id : from, fid: user_id, r_id: r_id})
//   return {
//     type: ACCEPT_FRIEND,
//     payload: acceptfriend
//   }
// }

export function getUserLocation(position) {

  return {
    type: GET_USER_LOCATION,
    payload: axios.put(`/user/location`, {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  };
}

export function checkResort(position) {
  return {
    type: CHECK_RESORT,
    payload: axios.put('/get/user/location', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }
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

export function findUsers() {

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
  const allhomies = axios.get(`/friends/all/${id}`).then(response => {
    return response.data;
  });
  return {
    type: GET_ALL_FRIENDS,
    payload: allhomies
  };
}

export function getRequest(user_id) {
  const getRequestNotification = axios.get(`/notifications/${user_id}`).then(response=> {
    console.log(response)
    return response.data});

  
  return {
    type: GET_REQUEST,
    payload: getRequestNotification
  }
}

export function toggleChannelsNav(chatNavOpen) {
  return {
    type: TOGGLE_CHANNELS_NAV,
    payload: !chatNavOpen
  }
}

export function getAllChannels(firstName) {
  const allChannels = axios.get(`/channels/${firstName}`).then((res) =>  res.data)
  return {
    type: GET_ALL_CHANNELS,
    payload: allChannels
  }
}

//------------------------- Socket io -------------------------------//

export function createNewChat(chatData) {
  return {
    type: 'server/ new chat',
    payload: chatData
  }
}

export function joinChat(roomid) {
  return {
    type: 'server/ join chat',
    payload: roomid
  }
}


export function sendChatMessage(chatData) {
  return {
    type: 'server/ chat send message',
    payload: chatData
  }
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
      return Object.assign({}, state, { allhomies: action.payload });

    case GET_USER_LOCATION + "_FULFILLED":
      return Object.assign({}, state, { position: action.payload });
      
    case CHECK_RESORT + "_FULFILLED":
    return Object.assign({}, state, {resort: action.payload})  

    case 'SEND_CHAT_MESSAGE':
      return Object.assign({}, state, { currentChat: [...state.currentChat, action.payload]})

    case GET_ROOM_MESSAGES:
      return Object.assign({}, state, {currentChat: [...state.currentChat, ...action.payload]})

    case GET_REQUEST + "_FULFILLED":
      return Object.assign({}, state, {requests: action.payload});

    case ACCEPT_FRIEND + "_FULFILLED":
      return Object.assign({}, state, {allhomies: action.payload})
   
    case TOGGLE_CHANNELS_NAV:
      return Object.assign({}, state, {chatNavOpen: action.payload})
   
    case GET_ALL_CHANNELS + '_FULFILLED':
      return Object.assign({}, state, {channels: action.payload})

      default:
      return state;
  }
};
