import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from './Nav';
import Header from './Header';
import { joinChat, sendChatMessage } from "./../ducks/reducer";
import Channels from "./Channels"
import Chatroom from "./Chatroom"



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
    

    // componentDidMount() {
    //     console.log(this.props.match.params);
    //     this.props.joinChat(this.props.match.params.chatid)
    //     this.setState({
    //         roomid: this.props.match.params.chatid
    //     })
    // };

    // handleInput = (e) => {
    //     this.setState({
    //         input: e.target.value
    //     })
    // }

    // handleDown = (e) => {
    //     if (e.keyCode === 13) this.dispatchMessage()
    // }

    // dispatchMessage = () => {
    //     this.props.sendChatMessage({message: this.state.input, roomid: this.state.roomid})
    //     this.setState({
    //         input: ''
    //     })
    // }

    render(){

        



        console.log(this.props.currentChat)
        return(
            <div class='chatpagecontainer'>
                {/* <Header/> */}
                <Channels/>
                <div className='chat'>
                    <Chatroom chatID={this.props.match.params.chatid}/>
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