import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserLocation, getUserInfo, checkResort, getRequest, toggleChannelsNav, getAllChannels, resetChat, getAllPublicChannels, getAllFriends, getAllCreatedRooms } from "./../ducks/reducer";
import homeIcon from './../assets/home2.png'
import chatIcon from './../assets/chat3.png'


export class Nav extends Component {
  componentDidMount() {
    this.props.getUserInfo().then( (response, user) => {
      const option = {enableHighAccuracy: true}
    const userGeo = navigator.geolocation.watchPosition( (position, error_loc, option) => {
        this.props.getUserLocation(position);
        console.log('userGEO',position);
        this.props.checkResort(position)
    }, error => {
      console.log('NO GPS GOTDAMN CALLBACKERROR')
    })
    this.props.getRequest(this.props.user.user_id)
  })
  }


  
  
  handleClick(chatNavOpen) {
    this.props.toggleChannelsNav(chatNavOpen)
    // this.props.getAllChannels(this.props.user.first_name)
    this.props.getAllPublicChannels()
    this.props.getAllFriends(this.props.user.user_id)
    this.props.getAllCreatedRooms(this.props.user.user_id, this.props.user.first_name);    
  }

    


  render() {
    console.log('currentmtn', this.props.user.current_mtn)
    return (
      <div>
        <div className="nav">
          <Link to="/home">
            <button onClick={()=>{
              if(window.location.pathname === '/home'){
                this.props.toggle();
              }
              if(!this.props.chatNavOpen){
                this.handleClick(this.props.chatNavOpen)
              }
            }} className="homebtn"><img className='homebtnImg' src={homeIcon} alt=""/></button>
          </Link>
          <button className="settingsbtn" onClick={() => this.handleClick(this.props.chatNavOpen)}><img className='chatbtnImg' src={chatIcon} alt="" /></button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {  checkResort, getUserLocation, getUserInfo, getRequest, toggleChannelsNav, getAllChannels, resetChat, getAllPublicChannels, getAllFriends, getAllCreatedRooms })(Nav);
