import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from './Nav';
import Header from './Header';
import { joinChat, sendChatMessage } from "./../ducks/reducer";
import Channels from "./Channels"




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
    };
    

    componentDidMount() {
        console.log(this.props.match.params);
        this.props.joinChat(this.props.match.params.chatid)
        this.setState({
            roomid: this.props.match.params.chatid
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

    render(){
        console.log(this.props.currentChat)
        return(
            <div>
                <Header/>
                <Channels/>
                
                <div className='chatContainer' 
                    style={this.props.user.user_id===this.props.currentChat.user_id ? {justifyContent: 'flexStart'} : {justifyContent: 'flexEnd'}}>
                    <h2 className='chatTitle'>thisl siasldfjlkasjdfhaosid</h2>
                    {this.props.currentChat.map((e,i) =>{
                       return <div className='chatFill' key={i}>
                                  <div className={e.user_id === this.props.user.user_id ? 'userMessagesContainer': 'otherMessagesContainer'}>
                                    <h1 className={e.user_id === this.props.user.user_id ? 'userMessages': 'otherMessages'}>{e.chat_message}</h1>
                                  </div>
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