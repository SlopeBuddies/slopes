import React, { Component } from "react";

export class Header extends Component {




  render() {
    return (
      <div className='header'>
        <div className="headerimg">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpSwDEuNA7OTpnTR7rrIeji6bZHWK3UoNoIOKZYuevrOkzJGW8ZQ" />
        </div>
        <div>
            <a href='http://localhost:3030/auth/logout'> logout </a>
        </div>
      </div>
    );
  }
}

export default Header;
