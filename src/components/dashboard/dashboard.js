import React, { Component } from 'react';
import './dashboard.css';
import SpotifyWebApi from 'spotify-web-api-js';
import $ from "jquery"


const spotifyApi = new SpotifyWebApi();


class Dashboard extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;

        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: { name: 'Nothing Playing', albumArt: 'https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png', artist: 'Nothing Playing', albumName: 'None', artistId: '' },
            yourPlaylists: { name: 'Nothing Yet', img: 'https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png', uri: '', name2: 'Nothing Yet', img2: 'https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png', uri2: '', name3: 'Nothing Yet', img3: 'https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png', uri3: '',name4: 'Nothing Yet', img4: 'https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png', uri4: '', name5: 'Nothing Yet', img5: 'https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png', uri5: '', name6: 'Nothing Yet', img6: 'https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png', uri6: ''},
            clicked: false
        }
        this.changeState = this.changeState.bind(this);
    }

    changeState() {
        if (this.state.animationClass === 'test') {
            this.setState({
                animationClass: 'test paused'
            });
        } else {
            this.setState({
                animationClass: 'test'
            });
        }
    }

    playAlbum(num){
        var a = {context_uri: this.state.yourPlaylists.uri}
        var aj = JSON.stringify(a)
        var ajj = JSON.parse(aj)
        var b = {context_uri: this.state.yourPlaylists.uri2}
        var bj = JSON.stringify(b)
        var bjj = JSON.parse(bj)
        var c = {context_uri: this.state.yourPlaylists.uri3}
        var cj = JSON.stringify(c)
        var cjj = JSON.parse(cj)
        var d = {context_uri: this.state.yourPlaylists.uri4}
        var dj = JSON.stringify(d)
        var djj = JSON.parse(dj)
        var e = {context_uri: this.state.yourPlaylists.uri5}
        var ej = JSON.stringify(e)
        var ejj = JSON.parse(ej)
        var f = {context_uri: this.state.yourPlaylists.uri6}
        var fj = JSON.stringify(f)
        var fjj = JSON.parse(fj)
        

        if(num === 1){
            spotifyApi.play(ajj)
        }

        if(num === 2){
            spotifyApi.play(bjj)
        }

        if(num === 3){
            spotifyApi.play(cjj)
        }

        if(num === 4){
            spotifyApi.play(djj)
        }

        if(num === 5){
            spotifyApi.play(ejj)
        }

        if(num === 6){
            spotifyApi.play(fjj)
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

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }



    toggleplay = () => {
        if (this.state.clicked === false) {
            spotifyApi.play();
            this.setState({ clicked: !this.state.clicked });
        } else {
            spotifyApi.pause();
            this.setState({ clicked: !this.state.clicked });
        }
    }

    nexttrack(){
        spotifyApi.skipToNext();
    }

    getAlbums() {
        spotifyApi.getUserPlaylists().then((response) => {
            this.setState({
                yourPlaylists: {
                    name: response.items[0].name,
                    img: response.items[0].images[0].url,
                    uri: response.items[0].uri,
                    name2: response.items[1].name,
                    img2: response.items[1].images[0].url,
                    uri2: response.items[1].uri,
                    name3: response.items[2].name,
                    img3: response.items[2].images[0].url,
                    uri3: response.items[2].uri,
                    name4: response.items[3].name,
                    img4: response.items[3].images[0].url,
                    uri4: response.items[3].uri,
                    name5: response.items[4].name,
                    img5: response.items[4].images[0].url,
                    uri5: response.items[4].uri,
                    name6: response.items[5].name,
                    img6: response.items[5].images[0].url,
                    uri6: response.items[5].uri
                }
            })
        });
    }


    getNowPlaying() {
        setInterval(() => {
            spotifyApi.getMyCurrentPlaybackState()
                .then((response) => {
                    if(response.item.name !== this.state.nowPlaying.name){
                        this.setState({
                            nowPlaying: {
                                name: response.item.name,
                                artist: response.item.artists[0].name,
                                albumArt: response.item.album.images[0].url,
                                albumName: response.item.album.name,
                                artistId: response.item.artists[0].id,
                                clicked: response.is_playing
                            }
                        })

                        this.findLyrics()
                    }
                    
                })

        }, 5000);
    }

    findLyrics() {
       
        $.get("https://api.lyrics.ovh/v1/" + this.state.nowPlaying.artist + "/" + this.state.nowPlaying.name,
        function (data) {
            // eslint-disable-next-line
            if (document.getElementById("output").innerHTML !== data.lyrics.replace(new RegExp("\n", "g"), "<br>")) {
                if (data.lyrics !== "") {
                    // eslint-disable-next-line
                    document.getElementById("output").innerHTML = data.lyrics.replace(new RegExp("\n", "g"), "<br>")
                    console.log("success")
                }
            }
        }
    )
    }


    render() {
        return (

            <div className="dashboard" onLoad={() => this.getNowPlaying()}>

                <div className="leftside">
                    <div className="songinfo">
                        <div id="albumart">
                            <img src={this.state.nowPlaying.albumArt} alt="" />
                        </div>
                        <div className="controls">
                            <i className="fa fa-step-backward fa-2x"></i>
                            <i className={this.state.clicked ? 'fas fa-pause-circle fa-2x fa-inverse' : 'fas fa-play-circle fa-2x fa-inverse'} onClick={() => this.toggleplay()}></i>
                            <i className="fa fa-step-forward fa-2x" onClick={() => this.nexttrack()}></i>
                        </div>
                        <h2>{this.state.nowPlaying.name}</h2>
                        <h3> {this.state.nowPlaying.artist} </h3>
                        <h3> {this.state.nowPlaying.albumName} </h3>
                    </div>
                    <div className="recommended" onLoad={() => this.getAlbums()}>
                        <h2> Your Playlists </h2>
                        <h4> Click To Play </h4>
                        <div className="albumlist">
                            <ul className="albumgrid">
                                <li>
                                    <img src={this.state.yourPlaylists.img} onClick={() => this.playAlbum(1)} alt="playlist"></img>
                                    <h2>{this.state.yourPlaylists.name}</h2>
                                </li>
                                <li>
                                    <img src={this.state.yourPlaylists.img2} onClick={() => this.playAlbum(2)} alt="playlist"></img>
                                    <h2>{this.state.yourPlaylists.name2}</h2>
                                </li>
                                <li>
                                    <img src={this.state.yourPlaylists.img3} onClick={() => this.playAlbum(3)} alt="playlist"></img>
                                    <h2>{this.state.yourPlaylists.name3}</h2>
                                </li>
                                <li>
                                    <img src={this.state.yourPlaylists.img4} onClick={() => this.playAlbum(4)} alt="playlist"></img>
                                    <h2>{this.state.yourPlaylists.name4}</h2>
                                </li>
                                <li className ="nomobile">
                                    <img src={this.state.yourPlaylists.img5} onClick={() => this.playAlbum(5)} alt="playlist"></img>
                                    <h2>{this.state.yourPlaylists.name5}</h2>
                                </li>
                                <li className ="nomobile">
                                    <img src={this.state.yourPlaylists.img6} onClick={() => this.playAlbum(6)} alt="playlist"></img>
                                    <h2>{this.state.yourPlaylists.name6}</h2>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="rightside">
                    <div className="lyrics">
                        {/* eslint-disable-next-line */}
                        <a id="dashboard"><h2> Lyrics </h2></a>
                        <div id="output" className="outputlyricstext">Nothing Yet</div>
                    </div>
                </div>
            </div>



        )
    }
}


export default Dashboard