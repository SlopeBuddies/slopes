import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserLocation, getUserInfo, checkResort, getRequest, toggleChannelsNav, getAllChannels, resetChat } from "./../ducks/reducer";
import turf from 'turf';


export class Nav extends Component {
  componentDidMount() {
    this.props.getUserInfo().then( (response, user) => {
    const userGeo = navigator.geolocation.watchPosition(position => {
        this.props.getUserLocation(position);
        console.log('userGEO',position);
        this.props.checkResort(position)
    })
    this.props.getRequest(this.props.user.user_id)
  })
  }
  
  
  handleClick(chatNavOpen) {
    this.props.toggleChannelsNav(chatNavOpen)
    this.props.getAllChannels(this.props.user.first_name)
  }

    


  render() {
    return (
      <div>
        <div className="nav">
          <Link to="/home">
            <button onClick={this.props.toggle} className="homebtn">HOME</button>
          </Link>
          <button className="settingsbtn" onClick={() => this.handleClick(this.props.chatNavOpen)}>CHAT</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {  checkResort, getUserLocation, getUserInfo, getRequest, toggleChannelsNav, getAllChannels, resetChat })(Nav);
