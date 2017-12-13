import React, { Component } from 'react'
import { joinChat, sendChatMessage } from "./../ducks/reducer";
import {connect} from 'react-redux';


class Chatroom extends Component {
    constructor(){
        super();

        this.state = {
            input: '',
            message: '',
            messages: [],
            roomid: 0,
            userid: 0
        };

    };
    componentDidMount() {
        console.log(this.props.chatID);
        this.props.joinChat(this.props.chatID)
        this.setState({
            roomid: this.props.chatID
        })
    };

    handleInput = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    handleDown = (e) => {
        if (e.keyCode === 13) this.dispatchMessage()
    }

    dispatchMessage = () => {
        this.props.sendChatMessage({message: this.state.input, roomid: this.state.roomid})
        this.setState({
            input: ''
        })
    }






  render() {

    const message = this.props.currentChat.map((e,i) =>{
        return (
                    <div key={i} className={e.user_id === this.props.user.user_id ? 'userMessagesContainer' : 'otherMessagesContainer'}>
                        <h1 className={e.user_id === this.props.user.user_id ? 'userMessages': 'otherMessages'}>{e.chat_message}</h1>
                    </div>
                )
        })



    return (
        <div className='chatContainer'>
                    {/* <h2 className='chatTitle'></h2> */}
                        {message}
                    <div className='inputBtn'>
                    <input className='chatInput' type="text"
                           value={this.state.input}
                           onChange={this.handleInput}
                           onKeyDown={this.handleDown}/>
                    <button className='chatBtn' onClick={this.dispatchMessage} >Send</button>
                    </div>
                </div>
    )
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { joinChat, sendChatMessage })(Chatroom);
