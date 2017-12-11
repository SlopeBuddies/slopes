import React, { Component } from "react";
import logo from './../assets/logo.png';
import logo2 from './../assets/logo2.png';

export class Header extends Component {

  render() {
    return (
      <div className='header'>
        <div className="headerimg">
          <img src={logo2} />
        </div>
        <span className='slope_title'>SlopeBuddies</span>
        <div>
            <a href={process.env.REACT_APP_LOGOUT}> logout </a>
        </div>
      </div>
    );
  }
}

export default Header;
