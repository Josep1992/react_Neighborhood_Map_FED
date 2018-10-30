import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Map from './components/google-maps/Map';
import './App.scss';

import { pointers } from '../src/utilities/pointers';

class App extends Component {
  state = {
    apiKey: 'AIzaSyACQXnOUxt3FifE9oexqADC8OMmB74ms_Q',
    markers: [],
  };
  componentDidMount = () => {
    this.initializeWindow()
      .then((google) => console.log(`${google}`))
      .catch((error) => console.log({ error }));
  };

  injectGoogleMapsScript = () => {
    const { apiKey } = this.state;
    const body = document.body;
    const googleEndPoint = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;

    let googleMapScript = document.createElement('script');
    googleMapScript.src = googleEndPoint;
    // The script must be async, it will be added to the dom once every elements is on the page.**
    googleMapScript.async = true;
    googleMapScript.defer = true;

    // Adding the script before the ending body tag
    body.insertAdjacentElement('beforeend', googleMapScript);
  };

  initializeWindow = () => {
    return new Promise((resolve, reject) => {
      if (!window.google) {
        this.injectGoogleMapsScript();
        window.initMap = this.initMap;
        resolve('Google Object in Window');
      } else {
        reject('Google Object not in Window');
      }
    });
  };

  initMap = () => {
    let map;
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 18.4065425, lng: -66.59379249999999 },
      zoom: 11,
    });

    //Iterate over the pointers array to create the markers
    pointers.forEach((pointer) => {
      let marker = new window.google.maps.Marker({
        position: { lat: pointer.lat, lng: pointer.lng },
        map: map,
        title: pointer.title,
        animation: window.google.maps.Animation.DROP,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: pointer.title,
      });

      marker.addListener('click', () => infoWindow.open(map, marker));

      this.state.markers.push(marker);
    });
  };

  render() {
    return (
      <Fragment>
        <Navbar tagline={'Neighborhood Map'} />
        <Map />
      </Fragment>
    );
  }
}

export default App;
