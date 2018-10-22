import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Map from './components/google-maps/Map';
import './App.scss';

class App extends Component {
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
