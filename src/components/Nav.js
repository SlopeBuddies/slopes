import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserLocation, getUserInfo, checkResort, getRequest } from "./../ducks/reducer";
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

  render() {
    return (
      <div>
        <div className="nav">
          <Link to="/">
            <button className="homebtn">HOME</button>
          </Link>
          <button className="settingsbtn">CHAT</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {  checkResort, getUserLocation, getUserInfo, getRequest })(Nav);
