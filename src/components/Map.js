import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {getUserInfo} from './../ducks/reducer';
import Header from './Header';
import Nav from './Nav';
import {withScriptjs, withGoogleMap, google, GoogleMap, Marker} from 'react-google-maps';
import { compose, withProps } from "recompose";
import GoogleMapReact from 'google-map-react'

const UserLocation = ({ text }) => <div>{text}</div>;


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
        this.getLocations()

    }

    getLocations() {
        axios.get(`/friends/location/${this.props.user.current_mtn}`)
        .then( (response) => {
            this.setState({
                center: {lat: this.props.user.latitude, 
                        lng:this.props.user.longitude},
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
          <Header/>
          <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        style={{height: '100px'}}
      >
            {this.state.userMarkers.map((e, i) =>{
               return(
                <UserLocation
                key={i}
                lat={e.latitude}
                lng={e.longitude}
                text={e.first_name}
                />
            )})
            }
               
      </GoogleMapReact>
      <Nav/>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { getUserInfo } )(Map)
