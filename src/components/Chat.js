import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from './Nav';
import Header from './Header';
import io from 'socket.io-client'

const socket = io();

class Chat extends Component {
    constructor(){
        super();

        this.state = {
            input: '',
            message: '',
            messages: [],
            room: 0,
            joined: false
        };

        this.updateMessage = this.updateMessage.bind(this);
        this.sendMessages = this.sendMessages.bind(this);
        this.handleDown = this.handleDown.bind(this)
    };
    

    componentDidMount() {
        socket.on('chat', data => {
            this.updateMessage(data)
        });
    };

    updateMessage(message) {
        let newMessages = this.state.messages.slice()
        newMessages.push(message)
        this.setState({
            messages: newMessages
        })
    };

    sendMessages() {
        socket.emit('message sent', {
            message: this.state.input
        })
    };

    handleDown(e) {
        if (e.keyCode === 13) this.sendMessages()
    }

    render(){
        console.log(this.state.messages)
        return(
            <div>
                <Header/>
                
                <div className='chatContainer'>
                    {this.state.messages.map((e,i) =>{
                       return <div key={i}>
                                    <h1>{e}</h1>
                              </div>
                    })}
                    <div className='inputBtn'>
                    <input className='chatInput' type="text"
                           value={this.state.input}
                           onChange={e => this.setState({input: e.target.value})}
                           onKeyDown={(e) => this.handleDown(e)}/>
                    <button className='chatBtn' onClick={this.sendMessages} >Send</button>
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

export default connect(mapStateToProps)(Chat);