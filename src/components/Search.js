import React, { Component } from 'react';
import searchIcon from './../assets/searchicon.png'

export class Search extends Component {
  render() {
    return (
      <div className='searchContainer'>
        <img alt='' src={searchIcon}/><input />
      </div>
    )
  }
}

export default Search
