import React, { Component } from "react";
import searchIcon from "./../assets/searchicon.png";
import { findUsers, getUserInfo } from "./../ducks/reducer";
import axios from "axios";
import { connect } from "react-redux";

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  findUsers() {
    axios
      .get(
        `/find/users/${this.props.user.user_id}?search=${
          this.refs.search.value
        }`
      )
      .then(res => {
        console.log('usersobject',res)
        this.setState({
          users: res.data
        });
      });
  }

  friendRequest(id) {
    axios.post(
      `/send/friend/request/${this.props.user.user_id}/${
        id
      }`
    ).then( alert('Request Sent'))
  }

  render() {
    var mapUsers = this.state.users.map((e, i) => {
      return (
        <div key={e.user_id} className="usersList">
          <div>
            <img className="searchIMG" src={e.profile_picture} />
          </div>
          <div> {e.first_name}</div>
          <div>
            <button onClick={()=> this.friendRequest(e.user_id)}> + </button>
          </div>
        </div>
      );
    });
    return (
      <div className="searchContainer">
      <div>
        <img alt="" src={searchIcon} />
        </div>
        <div>
        <input ref="search" />
        </div>
        <div>
        <button className="searchBTN" onClick={() => this.findUsers()}>
          Search Users
        </button>
        </div>
        {mapUsers}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { findUsers, getUserInfo })(Search);
