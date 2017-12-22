import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModal, getAllFriends, getUserInfo, toggleChannelsNav, setRoomName } from "./../ducks/reducer";
import axios from 'axios';
import {Link} from 'react-router-dom'
import add from '../assets/Check1_Green.png';
import remove from '../assets/X_Red.png';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomid: '',
      roomName: '',
      uninvitedFriends: [],
      invitedFriends: [],
      createdRoomsInfo: [],
      requestInfo: []
    }
  }

  componentDidMount() {
    this.props.getUserInfo();
    console.log(this.refs);
    const roomid = Math.floor(Math.random() * (10000 - 2000) + 2000);
    this.setState({
      roomid: `${roomid}`
    });
  }

  createRoomName() {
    this.setState({
      roomName: this.refs.roomName.value
    })
    this.refs.roomName.value = '';
  }

  handleDown = (e) => {
    if (e.keyCode === 13) this.createRoomName()
  }

  sendRoomNotification(room) {
    axios.post('/created/room', room)
    this.props.toggleModal()
    this.props.toggleChannelsNav()
    this.props.setRoomName(room.room.roomName)
  }

  addToInvited(friend) {
    if (this.state.roomName === '') {
      alert ('You must first create a room name');
    } else {
     let arr = [...this.state.uninvitedFriends];
    arr.forEach((e, i) => {
      if (friend === e) {
        var top = [...this.state.uninvitedFriends]
        var bottom = [...this.state.invitedFriends]
        var addUserInfo = [...this.state.createdRoomsInfo];
        var topSplice = top.splice(i, 1);
        var roomUserInfo = {
          room_name: this.state.roomName,
          user_id: topSplice[0]
        };
        var addRoomInfo = [...this.state.requestInfo];
        var requestInfo = {
          join_room_id: this.state.roomid,
          request_from: this.props.user.user_id,
          request_to: topSplice[0],
          request_type: 'chat',
          pending: true
        }
        addUserInfo.push(roomUserInfo);
        bottom.push(topSplice[0]);
        addRoomInfo.push(requestInfo);
        this.setState({
          uninvitedFriends: top,
          invitedFriends: bottom,
          createdRoomsInfo: addUserInfo,
          requestInfo: addRoomInfo
        })
      }
    })
    } 
  }

  removeFromRoom(friend) {
    let arr = [...this.state.invitedFriends];
   arr.forEach((e, i) => {
     if (friend === e) {
       var top = [...this.state.uninvitedFriends]
       var bottom = [...this.state.invitedFriends]
       var addUserInfo = [...this.state.createdRoomsInfo]
       var addRoomInfo = [...this.state.requestInfo];
       var bottomSplice = bottom.splice(i, 1);
       var userSplice = addUserInfo.splice(i, 1)
       var roomSplice = addRoomInfo.splice(i, 1);
       top.push(bottomSplice[0]);
       this.setState({
         uninvitedFriends: top,
         invitedFriends: bottom,
         createdRoomsInfo: addUserInfo,
         requestInfo: addRoomInfo
       })
     }
   })
 }





  render() {
    console.log(this.props.channels)
    for (var i = 0; i < this.props.allhomies.length; i++) {
      if (!this.state.invitedFriends.includes(this.props.allhomies[i].user_id) && !this.state.uninvitedFriends.includes(this.props.allhomies[i].user_id)) {
        this.setState({
          uninvitedFriends: [...this.state.uninvitedFriends, this.props.allhomies[i].user_id]
        })
      }
    }

    const displayFriends = this.props.allhomies.map((e, i) => {
      if (this.state.uninvitedFriends.includes(e.user_id)) {
        console.log(e.user_id)
        return (
          <div key={i} className="friendsAvatar_chat">
            <div>
              <img alt="user" className="friendsPic_chat" src={e.profile_picture} />
            </div>
            <div className="friendsName_chat">
              {e.first_name} {e.last_name}
            </div>
            <div className="friendmailer_green_chat">
              <img src={add} type="" className="green_add_button_chat" onClick={() => {
                console.log(e.user_id)
                console.log(this.state.invitedFriends)
                this.addToInvited(e.user_id)
              } }/>
              
              
              
            </div>
          </div>
        );
  
      }
    });
    const invitedFriends = this.props.allhomies.map((e, i) => {
      if (this.state.invitedFriends.includes(e.user_id)) {
        // console.log(e.user_id)
        return (
          <div key={i} className="friendsAvatar_chat">
            <div>
              <img alt="user" className="friendsPic_chat" src={e.profile_picture} />
            </div>
            <div className="friendsName_chat">
              {e.first_name} {e.last_name}
            </div>
            <div className="friendmailer_green_chat">
              <img src={remove} type="" className="red_add_button_chat" onClick={ () => this.removeFromRoom(e.user_id) }/>
              
              
            </div>
          </div>
        );
  
      }
    });

    return (
      <div>
        <section className="section_modal">
          <div
            className={
              this.props.openModal ? "modal_display_none" : "create_room_modal"
            }
          >
            <span className="modal_title">Create Your Own Room</span>
            <div>
              <input
                type="text"
                placeholder="room name"
                className="modal_input"
                ref='roomName'
                onKeyDown={this.handleDown}
              />
              <button onClick={() => this.createRoomName()}
              type="" className="modal_name_submit_button">
                Submit
              </button>
            </div>
            <span className='invite_friends_to_room_span'>Invite Friends to Room</span>
            <div className="friends_modal_list">
            {displayFriends}
            
              {/* <span className=''>Room: </span>  */}
              <span className='friends_in_room_span'>Friends in Room '{this.state.roomName}': </span>
               
             
              {invitedFriends}
              
            </div>
            <div>
            <Link to={`/chat/${this.state.roomid}`}>
              <button type='' className='send_modal_button' onClick={() => this.sendRoomNotification({
                createdRoom: [...this.state.createdRoomsInfo, {
                room_name: this.state.roomName,
                user_id: this.props.user.user_id}],
                request: this.state.requestInfo,
                room: { roomName: this.state.roomName, roomid: this.state.roomid }
              })}>
              Send Invites</button>
              </Link>
            <button
              type=""
              className="close_modal_button"
              onClick={() => this.props.toggleModal()}
            >
              Close
            </button>
            </div> 
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { toggleModal, getAllFriends, getUserInfo, toggleChannelsNav, setRoomName })(Modal);
