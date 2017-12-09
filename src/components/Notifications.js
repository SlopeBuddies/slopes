import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserInfo } from "./../ducks/reducer";
import {Link} from 'react-router-dom';

export class Notifications extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    
    var chats = this.props.requests.map((e, i) => {
      if(e.request_type === 'chat') {
      return (
        <div key={i}>
          {e.request_type}
          <div>
            {e.first_name} {e.last_name}
          </div>
          <div>
          <Link to={`/chat/${e.join_room_id}`}>
            <button> CHAT </button>
            </Link>
          </div>
        </div>
      );
     } });
    var requests = this.props.requests.map((e, i) => {
      if(e.request_type === 'friend_request') {
      return (
        <div key={i}>
          {e.request_type}
          <div>
            {e.first_name} {e.last_name}
          </div>
          <div>
            <button> yass </button> <button> naaan </button>
          </div>
        </div>
      );
     } })
  

    return (

    <div>{requests} {chats}</div>

    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getUserInfo })(Notifications);
