import React, { Component } from 'react';

class Map extends Component {
  state = {
    apiKey: 'AIzaSyCNYw-grWNRMrfIxpHpGzCFpd7mLX4k4Oo',
    googleEndpoint: `https://maps.googleapis.com/maps/api/js?key=${
      this.state.apiKey
    }&callback=initMap`,
  };
  componentDidMount = () => {
    this.initializeWindow()
      .then((google) => console.log(`${google}`))
      .catch((error) => console.log({ error }));
  };

  injectGoogleMapsScript = () => {
    const { googleEndpoint } = this.state;
    const body = document.body;

    let googleMapScript = document.createElement('script');
    googleMapScript.src = googleEndpoint;
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
      center: { lat: -66.5878767, lng: 18.4058278 },
      zoom: 9,
    });

    return map;
  };
  render() {
    return (
      <main>
        <div role="application" id="map" />
      </main>
    );
  }
}

export default Map;
