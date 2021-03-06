import React, { Component } from 'react';
import {connect} from 'react-redux';
import { toggleChannelsNav, resetChat, joinChat, setRoomName, scrollToBottom, toggleModal } from "./../ducks/reducer";
import axios from "axios";
import { Link } from 'react-router-dom';




class Channels extends Component {



// componentDidMount() {
//     this.getAllChannels(this.props.user.first_name)
// }

// getAllChannels(firstName) {
//     axios.get(`/channels/${firstName}`).then((res) =>  this.setState({channels: res.data}))
// }

// getAllPublicChannels() {
//     axios.get('/channels/public').then((res)=> this.setState({publicChannels: res.data}))
// }

handleClick = (room_id, room_name)=> {
    this.props.joinChat(room_id)
    this.props.toggleChannelsNav(this.props.chatNavOpen)
    // this.props.resetChat()
    this.props.setRoomName(room_name)
    // this.props.scrollToBottom()
  }

render() {
    const allChannels = this.props.channels.map((e,i)=>{
        return (
        <Link className='chatNavLink' key={i} to={`/chat/${e.room_id}`}>
            <button onClick={()=> this.handleClick(e.room_id, e.room_name)} key={i}>{e.room_name} </button>
        </Link>
        )
    })

    const allPublicChannels = this.props.publicChannels.map((e,i)=> {
        return (
        <Link className='chatNavLink' key={i} to={`/chat/${e.room_id}`}>
            <button onClick={()=> this.handleClick(e.room_id, e.room_name)} key={i}>{e.room_name} </button>
        </Link>        
        )
    })
    return (
        <div className='chatNav' style={ this.props.chatNavOpen ? { width: '0px', border: 'none'} : {width : '70%'}}>
            <h1 className='chatNavTitle'>MY Channels</h1>
                {allChannels}
            <h1 className='chatNavTitle'>Public Channels</h1>
                {allPublicChannels}
                <button type='' className='open_modal_button' onClick={() => this.props.toggleModal()}>Create Room</button>       
              </div>
    
    )
}
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {toggleChannelsNav, resetChat, joinChat, setRoomName, scrollToBottom, toggleModal })(Channels);
