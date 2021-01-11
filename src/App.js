import React, { Component } from 'react';
import LandingSection from "./components/landing-section/landing-section"
import Section1 from "./components/section1/section-1"
import Section2 from "./components/section2/section-2"
import Navbar from "./components/Navbar/Navbar"
import './App.css';
import Player from './components/Player/player'


import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


class App extends Component {

  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
    }
  }


  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && <Navbar />}
        {!this.state.loggedIn && <LandingSection />}
        
        {this.state.loggedIn && <Player />}
        {!this.state.loggedIn && <Section1 />}
        {!this.state.loggedIn && <Section2 />}
      </div>

    );
  }


}

export default App;
