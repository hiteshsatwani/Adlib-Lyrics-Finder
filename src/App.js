import React, { Component } from 'react';

import './App.css';
import './components/coming-soon'


import SpotifyWebApi from 'spotify-web-api-js';
import ComingSoon from './components/coming-soon';
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
        <ComingSoon />

      </div>

    );
  }


}

export default App;
