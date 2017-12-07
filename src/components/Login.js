import React, { Component } from 'react'

export class Login extends Component {

  
  render() {
    return (
      <div className='loginContainer'>
          <div className='loginBox'>
          <a href={process.env.REACT_APP_LOGIN}>
        <button> LOGIN </button>
        </a>
        </div>

        
      </div>
    )
  }
}

export default Login
