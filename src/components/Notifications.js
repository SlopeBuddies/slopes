import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserInfo, getRequest } from "./../ducks/reducer";
import { Link } from "react-router-dom";
import axios from 'axios'
import x from './../assets/X_Red.png'
import accept from './../assets/Check1_Green.png'

export class Notifications extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  acceptFriend(from, user_id, r_id) {
    axios.post(`/accept/friend/`, {id : from, fid: user_id, r_id: r_id})
    .then( () => this.props.getRequest(this.props.user.user_id));
  }

  denyFriend(r_id) {
    axios.put('/deny/friend/', { id: r_id})
    .then( () => this.props.getRequest(this.props.user.user_id));
  }

  takeChat(r_id) {
    axios.put('/take/chat/request', { id: r_id})
  }


  render() {
    var chats = this.props.requests.map((e, i) => {
      if (e.request_type === "chat" && e.request_from !== this.props.user.user_id) {
        return (
          <div key={i} className='snotificationschat'>
            <div className='small_text'>
              {e.first_name} {e.last_name[0]+'.'}
            </div>
            <div>
              <Link to={`/chat/${e.join_room_id}`}>
                <button onClick={()=> this.takeChat(e.id)}> CHAT </button>
              </Link>
            </div>
          </div>
        );
      }
    });
    var requests = this.props.requests.map((e, i) => {
      if (e.request_type === "friend_request" && e.request_from !== this.props.user.user_id) {
        return (
          
            <div key={i} className='snotificationsrequest'>
            <div className='small_text'>
              {e.first_name} {e.last_name[0]+'.'}
            </div>
            <div className='accept_deny_buttons'>
            <img src={accept} style={ {width: '80px'} } className='accept-req-pic' 
              onClick={()=> this.acceptFriend(e.request_from, this.props.user.user_id, e.id)}/>
              <img className='deny-req-pic' src={x} onClick={()=> this.denyFriend(e.id)}/>
            </div>
        </div> 
        );
      }
    });

    return (
      <div className='notificationscontainer'>
      <h1> CHAT REQUESTS </h1>
      <div className='requestsdiv'> {chats}</div> 
        <h1> FRIEND REQUESTS </h1>
        <div className='requestsdiv'>{requests}</div> 
      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getRequest, getUserInfo })(Notifications);
