import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from './Nav';
import Header from './Header';
import io from 'socket.io-client';
import { joinChat, sendChatMessage } from "./../ducks/reducer";
import axios from 'axios';



class Chat extends Component {
    constructor(){
        super();

        this.state = {
            input: '',
            message: '',
            messages: [],
            roomid: 0,
            userid: 0
        };

        // this.updateMessage = this.updateMessage.bind(this);
        // this.sendMessages = this.sendMessages.bind(this);
        // this.handleDown = this.handleDown.bind(this)
    };
    

    componentDidMount() {
        console.log(this.props.match.params);
        this.props.joinChat(this.props.match.params.chatid)
        this.setState({
            roomid: this.props.match.params.chatid
        })
    };
    
    // updateMessage(message) {
    //     let newMessages = this.state.messages.slice()
    //     newMessages.push(message)
    //     this.setState({
    //         messages: newMessages
    //     })
    // };

    // sendMessages() {
    //     this.socket.emit('message sent', {
    //         message: this.state.input
    //     })
    //     this.setState({
    //         input: ''
    //     })
    // };

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

    render(){
        console.log(this.props.currentChat)
        return(
            <div>
                <Header/>
                
                <div className='chatContainer'>
                    {this.props.currentChat.map((e,i) =>{
                       return <div key={i}>
                                    <h1>{e.chat_message}</h1>
                              </div>
                    })}
                    <div className='inputBtn'>
                    <input className='chatInput' type="text"
                           value={this.state.input}
                           onChange={this.handleInput}
                           onKeyDown={this.handleDown}/>
                    <button className='chatBtn' onClick={this.dispatchMessage} >Send</button>
                    </div>
                </div>


                <Nav/>
            </div> 
        )
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { joinChat, sendChatMessage })(Chat);