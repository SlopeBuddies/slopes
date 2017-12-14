import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserInfo, getRequest, resetChat } from "../ducks/reducer";
import { Link } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Search from "./Search";
import Friends from "./Friends";
import Notifications from "./Notifications";
import Channels from "./Channels"



class Home extends Component {
  constructor() {
    super();

    this.state = {
      friendsToggle: false,
      searchToggle: false,
      notificationsToggle: false,
      mapToggle: false
    };
    this.friendsToggle = this.friendsToggle.bind(this);
  }

  componentDidlMount() {
    this.props.getUserInfo();
    this.props.resetChat();
  }

  friendsToggle() {
    this.setState({
      searchToggle: !this.state.searchToggle,
      notificationsToggle: !this.state.notificationsToggle,
      mapToggle: !this.state.mapToggle
    });
    // this.socket.id = this.props.user.user_id
    // console.log(this.socket)
  }
  searchToggle() {
    this.setState({
      friendsToggle: !this.state.friendsToggle,
      notificationsToggle: !this.state.notificationsToggle,
      mapToggle: !this.state.mapToggle
    });
  }
  notificationsToggle() {
    this.setState({
      friendsToggle: !this.state.friendsToggle,
      searchToggle: !this.state.searchToggle,
      mapToggle: !this.state.mapToggle
    });
    this.props.getRequest(this.props.user.user_id)
  }

  homeToggle() {
      this.setState({
          friendsToggle: false,
          searchToggle: false,
          notificationsToggle: false,
          mapToggle: false
      })
  }

  mapToggle() {
    this.setState({
      friendsToggle: !this.state.friendsToggle,
      notificationsToggle: !this.state.notificationsToggle,
      searchToggle: !this.state.mapToggle
    });
  }

  render() {
    return (
      <div className='home'>
        <Header />
        <div>
          <div className="home_profile_container">
            <img
              className="home_profile_image"
              src={this.props.user.profile_picture}
              alt='home'
            />
            <span className="home_profile_name">
              {this.props.user.nickname}
            </span>
            <span className="home_profile_mountain">
              {" "}
              {this.props.user.home_mountain}
            </span>
            <Link to={`/profile/${this.props.user.user_id}`}>
              <button type="" className="see_profile_button">
                PROFILE
              </button>
            </Link>
          </div>
          <div className="homecontainer">

              <button
                className="homecontainerButton"
                style={this.state.friendsToggle ? { display: "none" } : this.state.searchToggle && this.state.notificationsToggle && this.state.mapToggle ? {marginBottom: '3px'} : null}
                onClick={() => {
                  this.friendsToggle();
                }}
              >
                FRIENDS
              </button>

              <button
                className="homecontainerButton"
                style={this.state.searchToggle ? { display: "none" } : this.state.friendsToggle && this.state.notificationsToggle && this.state.mapToggle ? {marginBottom: '3px'} : null}
                onClick={() => {
                  this.searchToggle();
                }}
              >
                {" "}
                SEARCH{" "}
              </button>

  
              <button
                className="homecontainerButton"
                style={
                  this.state.notificationsToggle ? { display: "none" } : this.state.friendsToggle && this.state.searchToggle && this.state.notificationsToggle ? {marginBottom: '3px'} : null
                }
                // style={this.state.friendsToggle && this.state.searchToggle ? {marginBottom: '3px'} : null}
                
                onClick={() => {
                  this.notificationsToggle();
                }}
              >NOTIFICATIONS
              </button>
              
              <Link className='homebtnlink' to='/map'>    
              <button
              className="homecontainerButton"
              style={this.state.mapToggle ? { display: "none" } : this.state.friendsToggle && this.state.searchToggle ? {marginBottom: '3px'} : null}
                onClick={()=> {this.mapToggle();}}>
                MAP
              </button>
              </Link>
            
    
            {this.state.searchToggle && this.state.notificationsToggle ? 
            
              <Friends socket={this.socket} id={this.props.user.user_id} /> : null}
            {this.state.notificationsToggle && this.state.friendsToggle ? 
              <Search /> : null}
            {this.state.friendsToggle && this.state.searchToggle ? 
              <Notifications /> : null}
          </div>
              <Channels />
        </div>
        <Nav toggle={()=>this.homeToggle()}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    requests: state.requests
  };
}

export default connect(mapStateToProps, { getUserInfo, getRequest, resetChat })(Home);
