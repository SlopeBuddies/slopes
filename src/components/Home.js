import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import Search from './Search';
import Friends from './Friends';
import Messages from './Messages';
import io from 'socket.io-client'


class Home extends Component {
    constructor() {
        super()

        this.state = {
            friendsToggle: false,
            searchToggle: false,
            messagesToggle: false
        }
        this.friendsToggle = this.friendsToggle.bind(this)
    }

    componentWillMount(){
        this.props.getUserInfo();
        this.socket = io();
    }

    componentDidMount(){
        this.socket.id = this.props.user.user_id
    }


    friendsToggle() {
        this.setState({
        searchToggle: !this.state.searchToggle,
        messagesToggle: !this.state.messagesToggle,
    })
    this.socket.id = this.props.user.user_id
    console.log(this.socket)
    }
    searchToggle() {
        this.setState({
        friendsToggle: !this.state.friendsToggle,
        messagesToggle: !this.state.messagesToggle
    })
    }
    messagesToggle() {
        this.setState({
            friendsToggle: !this.state.friendsToggle,
            searchToggle: !this.state.searchToggle})
            
    }


    render() {
        
        return (
            <div>
                <Header />
                <div className='homecontainer'>
                
                    <button className='homecontainerButton' style= {this.state.friendsToggle ? {display: 'none'}  : null} 
                            onClick={()=>{this.friendsToggle()}}> FRIENDS </button>
                    <button className='homecontainerButton' style= {this.state.searchToggle ? {display: 'none'}  : null} 
                            onClick={()=>{this.searchToggle()}}> SEARCH </button>
                    <button className='homecontainerButton' style= {this.state.messagesToggle ? {display: 'none'}  : null} 
                            onClick={()=>{this.messagesToggle()}}> MESSAGES </button>

                    {this.state.searchToggle && this.state.messagesToggle  ? <Friends socket={this.socket} id={this.props.user.user_id}/> : null}
                    {this.state.messagesToggle && this.state.friendsToggle  ? <Search/> : null}
                    {this.state.friendsToggle && this.state.searchToggle  ? <Messages/> : null}
                    
                </div>
                <Nav />
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUserInfo})(Home);