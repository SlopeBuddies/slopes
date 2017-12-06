import React, { Component } from "react";
import logo from './../assets/logo.png'

export class Header extends Component {




  render() {
    return (
      <div className='header'>
        <div className="headerimg">
          <img src={logo} />
        </div>
        <div>
            <a href='http://localhost:3030/auth/logout'> logout </a>
        </div>
      </div>
    );
  }
}

export default Header;
