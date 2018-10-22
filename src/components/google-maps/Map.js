import React, { Component } from 'react';

class Map extends Component {
  componentDidMount = () => {
    this.injectGoogleMapsScript();
    // this.initMap();
  };

  injectGoogleMapsScript = () => {
    // key fro the google maps api
    const key = 'AIzaSyCG7x3FPh3k9bXDAPNyU_RxZtNpslixoLM';
    // script src for injecting once the dom has loaded
    const source = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;

    let script = document.querySelector('script');
    script.src = source;
    script.async = true;
  };

  initMap = () => {
    let map;
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  };
  render() {
    return <div id="map" />;
  }
}

export default Map;
