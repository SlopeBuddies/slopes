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
    );
  }

  render() {
    // console.log("user", this.props.user);
    // console.log(this.state.users);
    var mapUsers = this.state.users.map((e, i) => {
      return (
        <div key={e.user_id} className="usersList">
          <div>
            <img className="searchIMG" src={e.profile_picture} />
          </div>
          <div> {e.first_name}</div>
          <div>
            {" "}
            <button onClick={()=> this.friendRequest(e.user_id)}> + </button>
          </div>
        </div>
      );
    });
    return (
      <div className="searchContainer">
        <img alt="" src={searchIcon} />
        <input ref="search" />
        <button className="searchBTN" onClick={() => this.findUsers()}>
          {" "}
          search friggin users
        </button>
        {mapUsers}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { findUsers, getUserInfo })(Search);
