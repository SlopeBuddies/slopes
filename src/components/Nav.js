import React, { Component } from 'react'

export class Nav extends Component {
  render() {
    return (
      <div>
        <div className='nav'>
            <button className='homebtn'>HOME</button>
            <button className='settingsbtn'>SETTINGS</button>
        </div>
      </div>
    )
  }
}

export default Nav
