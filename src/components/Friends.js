import React, { Component } from "react";
import axios from "axios";
import { getUserInfo, getAllFriends, createNewChat } from "./../ducks/reducer";
import { connect } from "react-redux";
import { Socket } from "net";
import { Link } from 'react-router-dom';

export class Friends extends Component {
  constructor() {
    super();

    this.state = {
      allFriends: [],
      roomid: ''
    };
  }
  componentDidMount() {
    this.props.getAllFriends(this.props.user.user_id);
    const roomid = Math.floor(Math.random() * 2000)
    this.setState({
      roomid: `${roomid}${this.props.user.user_id}`
    })
  }

  handleClickCreateChat() {
    this.props.createNewChat({
      roomid: `${this.state.roomid}`
    })
  }

  // joinRoom(i) {
  //   this.props.socket.emit('join room', {
  //     room: this.props.user.user_id + this.props.allhomies.friend_id
  //   })
  // }

 

  render() {
    console.log('props',this.props)
    console.log(this.state);
    if(this.props.allhomies.length > 0) {
    var AllFriends = this.props.allhomies.map((e, i) => {
      return <div key={i}> 
      <div className='friendsAvatar'>
        <div>
          <img src={e.profile_picture} />
        </div>
        <div className='friendsName'> 
          {e.first_name} {e.last_name} 
        </div>
        <Link to={`/chat/${this.state.roomid}`}>
          <button onClick={() => this.handleClickCreateChat()} className='friendMessagebtn' >Send Message</button>
        </Link>
      </div>
      </div>;
    })} else {
      AllFriends = 'You Have No Friends'
    };
  
    return (
      <div> {AllFriends}  </div>
    )
  }
}

  
function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getUserInfo, getAllFriends, createNewChat })(Friends);
