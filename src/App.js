import React, { Component } from 'react';
import Navbar from "./components/Navbar/Navbar"
import LandingSection from "./components/landing-section/landing-section"
import Dashboard from "./components/dashboard/dashboard"
import DashboardBlurred from "./components/dashboard-blurred/dashboard-blurred"
import Footer from "./components/Footer/footer"
import './App.css';
import Top10artists from "./components/Top 10/top10"
import AddToHomeScreen from './components/AddToHomeScreen'


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
        <AddToHomeScreen />
        <Navbar />
        <LandingSection />
        {this.state.loggedIn && <Dashboard />}
        {!this.state.loggedIn && <DashboardBlurred />}
        {this.state.loggedIn && <Top10artists />}
        <Footer/>
      </div>

    );
  }


}

export default App;
