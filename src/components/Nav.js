import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Nav extends Component {
  render() {
    return (
      <div>
        <div className='nav'>
            <Link to='/'><button className='homebtn'>HOME</button></Link>
            <button className='settingsbtn'>SETTINGS</button>
        </div>
      </div>
    )
  }
}

export default Nav
