import React, { Component } from 'react';
// Components
import Navbar from './components/layout/Navbar';
import SideBar from './components/layout/Sidebar';
import Map from './components/google-maps/Map';

// npm packages
import axios from 'axios';
import escapeRegExp from 'escape-string-regexp';

// Style
import './App.scss';

// Markers data
import { endpoint } from '../src/utilities/foursquaresApi';

class App extends Component {
  state = {
    apiKey: 'AIzaSyACQXnOUxt3FifE9oexqADC8OMmB74ms_Q',
    query: '',
    fourSquaresVenues: [],
  };

  componentDidMount = () => {
    this.getVenuesData(); //Fetching data to get the venues from foursquare api
    this.initializeWindow() //Initializing the window object with the google maps api
      .then((google) => console.log(`${google}`))
      .catch((error) => console.log({ error }));
  };

  getVenuesData = async () => {
    try {
      const request = axios.get(endpoint);
      const venues = await request;

      this.setState({
        fourSquaresVenues: [...venues.data.response.groups[0].items],
      });
    } catch (error) {
      console.error(error);
    }
  };

  injectGoogleMapsScript = () => {
    const body = document.body;
    const googleEndPoint = `https://maps.googleapis.com/maps/api/js?key=${
      this.state.apiKey
    }&callback=initMap`;

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
      center: { lat: 18.4655394, lng: -66.1057355 },
      zoom: 10.7,
    });

    //Iterate over the pointers array to create the markers
    this.state.fourSquaresVenues.forEach((pointer) => {
      let marker = new window.google.maps.Marker({
        position: {
          lat: pointer.venue.location.lat,
          lng: pointer.venue.location.lng,
        },
        map: map,
        title: pointer.venue.name,
        animation: window.google.maps.Animation.DROP,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: pointer.venue.name,
      });

      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
      });

      marker.addListener('mouseout', () => {
        infoWindow.close(map, marker);
        marker.setAnimation(null);
      });
    });
  };

  handleChange = (query) => {
    this.setState({ query });
  };

  render() {
    const { fourSquaresVenues, query } = this.state;
    return (
      <>
        <Navbar tagline={'Neighborhood Map'} />
        <div className="container">
          <SideBar
            pointers={fourSquaresVenues}
            onHandleQuery={this.handleChange}
            queryResult={query}
          />
          <Map />
        </div>
      </>
    );
  }
}

export default App;
