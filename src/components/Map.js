import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {getUserInfo} from './../ducks/reducer';
import Header from './Header';
import Nav from './Nav';
import GoogleMapReact from 'google-map-react'
import Channels from "./Channels"
import Modal from './Modal';


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
        userMarkers: [],
        defaultCenter: {}

    }
}
    // component() {
    //     this.setState({
    //         defaultCenter:{lat: this.props.user.latitude, 
    //         lng:this.props.user.longitude}
    //     })
    // }
    componentDidMount() {
        this.props.getUserInfo();

        this.getLocations();
        this.setInterval();
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

setInterval() {
        let boundFunction = this.getLocations.bind(this)
        this.interval = setInterval(boundFunction, 2000);
    }

    componentWillUnmount() {
       clearInterval(this.interval)
    }

    getLocations() {
        axios.get(`/friends/location/${this.props.user.current_mtn}`)
        .then( (response) => {
            this.setState({
                userMarkers: response.data
                })
            })
    }

  render() {
    return (
       
        <div>
        <div className='mapstuff'>
        
           <GoogleMapReact
          bootstrapURLKeys={{
              key: "AIzaSyDmaSW_P8wv7cqs0dKmbGBsGGzSiEZRrN4"
          }}
        defaultCenter={{lat: this.props.mapCenter.data[0].latitude, lng: this.props.mapCenter.data[0].longitude}}
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
      : null }
      </div>
      <Channels />
      <Modal/>
      <Nav/>
      </div>
    )
  }
}

function mapStateToProps(state) {
    console.log('state', state)
    return state
}

export default connect(mapStateToProps, { getUserInfo } )(Map)
