import React, { Component } from 'react'
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';

export class Login extends Component {

  
  render() {
    return (
      <div className='login_background'>
      <div className='loginContainer'>
      <div className='logo_container'>
      <span className='login_title'>SlopeBuddies</span>
      <img className='login_logo' src={logo2}/>
      </div>
          {/* <div className='loginBox'> */}
          <a className='login_button' href={process.env.REACT_APP_LOGIN}>
        <button className='login_button_text'> LOGIN </button>
        </a>
        {/* </div> */}

        
      </div>
      </div>
    )
  }
}

export default Login
