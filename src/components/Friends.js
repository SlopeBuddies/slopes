import React, { Component } from "react";
import axios from "axios";
import { getUserInfo, getAllFriends } from "./../ducks/reducer";
import { connect } from "react-redux";

export class Friends extends Component {
  constructor() {
    super();

    this.state = {
      allFriends: []
    };
  }
  componentDidMount() {
    this.props.getAllFriends(this.props.user.user_id);
    
  }

 

  render() {
    console.log('props',this.props)
    console.log(this.state);
    if(this.props.allhomies.length > 0) {
    var AllFriends = this.props.allhomies.map((e, i) => {
      return <div key={i}> 
      <div className='friendsAvatar'>
      <div><img src={e.profile_picture} /></div><div> {e.first_name} {e.last_name} </div>
      </div>
      </div>;
    })} else {
      AllFriends = 'You Have No Friends'
    };
  
    return (
      <div> {AllFriends}  </div>
    )
  }
}

  
function mapStateToProps(state) {
  
  return state
}

export default connect(mapStateToProps, { getUserInfo, getAllFriends })(Friends);
