import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Map from './components/google-maps/Map';
import './App.scss';

import { pointers } from '../src/utilities/pointers';

class App extends Component {
  state = {
    apiKey: 'AIzaSyACQXnOUxt3FifE9oexqADC8OMmB74ms_Q',
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
    let markers;
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -66.5878767, lng: 18.4058278 },
      zoom: 9,
    });

    // Iterate over the pointers array to create the markers
    markers = pointers.map((pointer) => {
      return new window.google.maps.Marker({
        position: { lat: Number(pointer.lat), lng: Number(pointer.lng) },
        map: map,
        title: pointer.title,
        animation: window.google.maps.Animation.DROP,
      });
    });

    return {
      map,
      markers,
    };
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
