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

  handleClickCreateChat(first_name, user_id) {
    this.props.createNewChat({
      roomid: `${this.state.roomid}`
    })
    this.createChatRequest(first_name, user_id);
  }

  createChatRequest(first_name, user_id) {
    axios.post('/chat/request', 
    {roomid: this.state.roomid, 
    room_name: `${this.props.user.first_name} ${first_name}`,
    request_type: 'chat',
    request_to: user_id,
    request_from: this.props.user.user_id
    })
  }

  // joinRoom(i) {
  //   this.props.socket.emit('join room', {
  //     room: this.props.user.user_id + this.props.allhomies.friend_id
  //   })
  // }

 

  render() {
    console.log('props',this.props)
    console.log('friendddds',this.state);
    if(this.props.allhomies.length > 0) {
    var currentMTNfriends = this.props.allhomies.map((e, i) => {
      if(e.current_mtn === this.props.user.current_mtn) {
      return <div key={i}> 
      <div className='friendsAvatar'>
        <div>

          <img src={e.profile_picture} />
        </div>
        <div className='friendsName'> 
          {e.first_name} {e.last_name} 
        </div>
        <div>
          {e.current_mtn}
        </div>
        <div>
        <Link to={`/chat/${this.state.roomid}`}>
          <button onClick={() => this.handleClickCreateChat(e.first_name, e.user_id)} className='friendMessagebtn' >Send Message</button>
        </Link>
        </div>
      </div>
      </div>;
  }  })} else {
      currentMTNfriends = 'You Have No Friends active in yo mtn'
    };

    if(this.props.allhomies.length > 0) {
      var MTNfriends = this.props.allhomies.map((e, i) => {
        if(e.current_mtn && e.current_mtn != this.props.user.current_mtn  ) {
        return <div key={i}> 
        <div className='friendsAvatar'>
          <div>
  
            <img src={e.profile_picture} />
          </div>
          <div className='friendsName'> 
            {e.first_name} {e.last_name} 
          </div>
          <div>
            {e.current_mtn}
          </div>
          <div>
          <Link to={`/chat/${this.state.roomid}`}>
            <button onClick={() => this.handleClickCreateChat(e.first_name, e.user_id)} className='friendMessagebtn' >Send Message</button>
          </Link>
          </div>
        </div>
        </div>;
    }  })} else {
        MTNfriends = 'You Have No Friends active in yo mtn'
      };
      if(this.props.allhomies.length > 0) {
        var lazyFriends = this.props.allhomies.map((e, i) => {
          if(!e.current_mtn) {
          return <div key={i}> 
          <div className='friendsAvatar'>
            <div>
    
              <img src={e.profile_picture} />
            </div>
            <div className='friendsName'> 
              {e.first_name} {e.last_name} 
            </div>
            <div>
              {e.current_mtn}
            </div>
            <div>
            <Link to={`/chat/${this.state.roomid}`}>
              <button onClick={() => this.handleClickCreateChat(e.first_name, e.user_id)} className='friendMessagebtn' >Send Message</button>
            </Link>
            </div>
          </div>
          </div>;
      }  })} else {
          lazyFriends = 'Yo lazy friends'
        };
    return (
      <div>
      <div> {currentMTNfriends} </div> <div>{MTNfriends}</div><div>{lazyFriends}</div>

      </div>
    )
  }
}

  
function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getUserInfo, getAllFriends, createNewChat })(Friends);


<div>
  
  


</div>