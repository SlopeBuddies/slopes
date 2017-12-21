import axios from "axios";

const initialState = {
  user: {},
  profile: {},
  userLogged: false,
  allhomies: [],
  position: {},
  messageData: [],
  currentChat: [],
  publicChannels: [],
  resort: '',
  requests: [],
  chatNavOpen: true,
  channels: [],
  friendIds: [],
  currentRoomName: '',
  openModal: true,
  mapCenter: {}
};

const GET_USER_INFO = "GET_USER_INFO";
const GET_PROFILE = "GET_PROFILE";
const CHECK_USER = "CHECK_USER";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const GET_USER_LOCATION = "GET_USER_LOCATION";


const CHECK_RESORT = "CHECK_RESORT"
const CHECK_RESORT_INTIAL = "CHECK_RESORT_INITIAL"
const GET_ROOM_MESSAGES = 'GET_ROOM_MESSAGES'

const GET_ALL_FRIENDS = "GET_ALL_FRIENDS";
const GET_REQUEST = 'GET_REQUEST';
const GET_FRIEND_IDS = 'GET_FRIEND_IDS';

const RESET_CHAT = 'RESET_CHAT'

const ACCEPT_FRIEND = 'ACCEPT_FRIEND';

const TOGGLE_CHANNELS_NAV = 'TOGGLE_CHANNELS_NAV';
const GET_ALL_CHANNELS = 'GET_ALL_CHANNELS';
const GET_ALL_PUBLIC_CHANNELS = 'GET_ALL_PUBLIC_CHANNELS'
const GET_ALL_CREATED_ROOMS = 'GET_ALL_CREATED_ROOMS';
const SET_ROOM_NAME = 'SET_ROOM_NAME'

const SCROLL_TO_BOTTOM = 'SCROLL_TO_BOTTOM'
const TOGGLE_MODAL = 'TOGGLE_MODAL'

export function getUserInfo() {
  return {
    type: GET_USER_INFO,
    payload: axios.get("/auth/me")
  };
}

export function initialResort() {
  var initial_resort = axios.get('/initial/resort').then( (res) => {
    return res.data.current_mtn
  })
  return {
    type: CHECK_RESORT_INTIAL,
    payload: initial_resort
  }
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
    var ids = [];
    response.data.forEach(e=> {
        ids.push(e.user_id)})
    return {friends: response.data, arr: ids};
  });
  
  return {
    type: GET_ALL_FRIENDS,
    payload: allhomies
  };
}



export function getRequest(user_id) {
  const getRequestNotification = axios.get(`/notifications/${user_id}`).then(response=> {
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

export function getAllPublicChannels() {
  const publicChannels = axios.get('/public/channels').then((res)=>  res.data)
  return {
    type: GET_ALL_PUBLIC_CHANNELS,
    payload: publicChannels
  }
}

export function resetChat() {
  const newChat = []
  return {
    type: RESET_CHAT,
    payload: newChat
  }
}

export function setRoomName(name) {
  return {
    type: SET_ROOM_NAME,
    payload: name
  }
}

export function scrollToBottom() {
  const pageScroll = function() {
    window.scrollBy(0,600); // horizontal and vertical scroll increments
    let scrolldelay = setTimeout('pageScroll()',1000); // scrolls every 100 milliseconds
  }
  return {
    type: SCROLL_TO_BOTTOM,
    payload: pageScroll
  }
}

export function toggleModal() {
  return {
    type: TOGGLE_MODAL,
    payload: null
  }
}

export function getAllCreatedRooms(user_id, first_name) {
  return {
    type: GET_ALL_CREATED_ROOMS,
    payload: axios.get(`/rooms/created/${user_id}/${first_name}`).then(res => res.data)
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
      return Object.assign({}, state, { allhomies: action.payload.friends, friendIds: action.payload.arr });

    case GET_USER_LOCATION + "_FULFILLED":
      return Object.assign({}, state, { position: action.payload, mapCenter: action.payload });
      
    case CHECK_RESORT + "_FULFILLED":
    return Object.assign({}, state, {resort: action.payload.data})  

    case 'SEND_CHAT_MESSAGE':
      return Object.assign({}, state, { currentChat: [...state.currentChat, action.payload]})

    case GET_ROOM_MESSAGES:
      return Object.assign({}, state, {currentChat: action.payload})

    case SET_ROOM_NAME:
      return Object.assign({}, state, {currentRoomName: action.payload})

    case RESET_CHAT: 
      return Object.assign({}, state, {currentChat: action.payload})

    case GET_REQUEST + "_FULFILLED":
      return Object.assign({}, state, {requests: action.payload});

    case ACCEPT_FRIEND + "_FULFILLED":
      return Object.assign({}, state, {allhomies: action.payload})
   
    case TOGGLE_CHANNELS_NAV:
      return Object.assign({}, state, {chatNavOpen: action.payload})
   
    case GET_ALL_CHANNELS + '_FULFILLED':
      return Object.assign({}, state, {channels: [...action.payload, ...state.channels]})

    case GET_ALL_PUBLIC_CHANNELS + '_FULFILLED':
      return Object.assign({}, state, {publicChannels: action.payload})

    case SCROLL_TO_BOTTOM:

    case TOGGLE_MODAL:
      return Object.assign({}, state, {openModal: !state.openModal});

    case GET_ALL_CREATED_ROOMS + '_FULFILLED':
    const ap = action.payload
      return Object.assign({}, state, {channels: [...action.payload[0], ...action.payload[1]]})

      case CHECK_RESORT_INTIAL + '_FULFILLED':
      return Object.assign({}, state, {resort: action.payload})
      default:
      return state;
  }
};
