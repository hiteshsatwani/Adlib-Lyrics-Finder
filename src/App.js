import React, { Component } from 'react';
import Navbar from "./components/Navbar/Navbar"
import $ from "jquery"
import './App.css';
import {Button} from "./components/Button"

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends Component {  
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;



    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Nothing Playing', albumArt: 'https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png', artist: 'Nothing Playing' },
      animationClass: 'test',
      currentlyplaying: 'empty'
    }
    this.changeState = this.changeState.bind(this);
  }

  changeState(){
    if(this.state.animationClass === 'test'){
      this.setState({
        animationClass: 'test paused'
      });
    }else{
      this.setState({
        animationClass: 'test'
      });
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

  getNowPlaying(){

    
      setInterval(() => {

        spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name,
              artist: response.item.artists[0].name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
        
      }, 1000);      
    }

  findLyrics(artistlyrics, songlyrics){
        $.get("https://api.lyrics.ovh/v1/"+artistlyrics+"/"+songlyrics,
        function (data){
          if(document.getElementById("output").innerHTML !== data.lyrics.replace(new RegExp("\n", "g"),"<br>")){
            if(data.lyrics !== ""){
            document.getElementById("output").innerHTML = data.lyrics.replace(new RegExp("\n", "g"),"<br>")
          } 
        }
          } 
        )
}

  render() {
    return (
      <div className="App" >
        <div className={this.state.animationClass} onLoad={() => this.getNowPlaying()}>
        <Navbar />
        <div className="rightside">
        <div id="textarea">
        <div className="AlbumArt">
          <img src= {this.state.nowPlaying.albumArt} height="300px" width="300px" alt=""/>
        </div>
          <h2> { this.state.nowPlaying.name }</h2>
          <h3> { this.state.nowPlaying.artist }</h3>
        </div>
        <div className="GetLyrics" >
        { this.state.loggedIn &&
       
        <Button onClick={() => this.findLyrics(this.state.nowPlaying.artist, this.state.nowPlaying.name)} > Get Lyrics </Button>
        
        }
        </div>
        </div>
        <div className="outputlyrics"><h2> Lyrics </h2></div>
        
        <div id="output" className="outputlyricstext">no data</div>
        </div>
        
      </div>
      
    );
  }

  
}

export default App;
