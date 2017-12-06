import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserLocation, getUserInfo } from "./../ducks/reducer";

export class Nav extends Component {
  componentDidMount() {
    this.props.getUserInfo().then( (response, user) => {
    const userGeo = navigator.geolocation.watchPosition(position => {
        this.props.getUserLocation(position);
        return position;
    })
  })
}

  render() {
    return (
      <div>
        <div className="nav">
          <Link to="/">
            <button className="homebtn">HOME</button>
          </Link>
          <button className="settingsbtn">SETTINGS</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {  getUserLocation, getUserInfo })(Nav);
