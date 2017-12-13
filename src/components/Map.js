import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {getUserInfo} from './../ducks/reducer';
import Header from './Header';
import Nav from './Nav';
import GoogleMapReact from 'google-map-react'
import Channels from "./Channels"

const UserLocation = ({ text }) => <img className='mapAvatar' src={text} />
const CurrentLocation = ({ text }) => <div className='userLocation'></div>

class Map extends Component {
constructor() {
    super();

    this.state = {
        isMarkerShown: false,
        markers: [],
        center:{lat: 40.366163199999995, lng: -111.7397428},
        zoom: 13,
        userMarkers: []

    }
}

    componentDidMount() {
        this.props.getUserInfo();
        this.getLocations();
        this.setInterval();
    }

setInterval() {
        let boundFunction = this.getLocations.bind(this)
        this.interval = setInterval(boundFunction, 2000);
        console.log('updated map')
    }

    componentWillReceiveProps(nextProps) {
        console.log('nxtprop', nextProps, 'tis', this.props)
    }

    componentWillUnmount() {
       clearInterval(this.interval)
    }

    getLocations() {
        console.log('user', this.props.user)
        axios.get(`/friends/location/${this.props.user.current_mtn}`)
        .then( (response) => {
            this.setState({
                userMarkers: response.data
                })
            })
    }

  render() {

    // const Comp = this.state.userMarkers.map( (e,i) => {
    //     return (
    //         <Comp
    //         lat={e.latitude}
    //         lng={e.longitude}
    //         text={toString(e.first_name)} 
    //        /> 
    //     )
    // })
console.log(this.state)
    return (
      <div>
          {/* <Header/> */}

        <div className='mapstuff' >
          <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyDmaSW_P8wv7cqs0dKmbGBsGGzSiEZRrN4"
          }}
        defaultCenter={{lat: this.props.user.latitude, 
            lng:this.props.user.longitude}}
        defaultZoom={this.state.zoom}
      >
            <CurrentLocation
            lat={this.props.user.latitude}
            lng={this.props.user.longitude}
  
            />

            {this.state.userMarkers.map((e, i) =>{
               return(
                <UserLocation
                key={i}
                lat={e.latitude}
                lng={e.longitude}
                text={e.profile_picture}
                />
            )})
            }
               
      </GoogleMapReact>
      </div>
      <Channels />
      <Nav/>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { getUserInfo } )(Map)
