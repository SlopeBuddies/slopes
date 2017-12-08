import React, { Component } from 'react';
import searchIcon from './../assets/searchicon.png'
import {findUsers} from './../ducks/reducer';
import axios from 'axios';
import { connect } from 'react-redux'

export class Search extends Component {
  constructor() {
    super() 
    this.state = {
      users: []
    }
  }

  findUsers() {
    axios.get(`/find/users/?search=${this.refs.search.value}`).then( (res) => {
      this.setState({
        users: res.data
      })
    })
  }

  render() {
    console.log(this.state.users)
    var mapUsers = this.state.users.map( (e, i) => {
      return <div className='usersList'><img className = 'searchIMG'src={e.profile_picture} /> {e.first_name} </div>
    })
    return (
      <div className='searchContainer'>
        <img alt='' src={searchIcon}/><input ref='search' />
        <button className = 'searchBTN' onClick={()=>this.findUsers()}> search friggin users</button>
        {mapUsers}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {findUsers})(Search)
