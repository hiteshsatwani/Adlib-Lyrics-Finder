import React, { Component } from 'react';
import './dashboard.css';
import $ from "jquery"



import SpotifyWebApi from 'spotify-web-api-js';
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
            nowPlaying: { name: 'Nothing Playing', albumArt: 'https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png', artist: 'Nothing Playing' },
            animationClass: 'test',
            currentlyplaying: 'empty'
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

    getNowPlaying() {


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

        }, 5000);
    }

    findLyrics() {
        setInterval(() => {

            $.get("https://api.lyrics.ovh/v1/" + this.state.nowPlaying.artist + "/" + this.state.nowPlaying.name,
                function (data) {
                    // eslint-disable-next-line
                    if (document.getElementById("output").innerHTML !== data.lyrics.replace(new RegExp("\n", "g"), "<br>")) {
                        if (data.lyrics !== "") {
                            // eslint-disable-next-line
                            document.getElementById("output").innerHTML = data.lyrics.replace(new RegExp("\n", "g"), "<br>")
                        }
                    }
                }
            )

        }, 3000)
    }


    render() {
        return (
            <div className="dashboard"  onLoad={() => this.getNowPlaying()} >
                <div className={this.state.animationClass} onLoad={() => this.findLyrics()} > 
                    <div className="rightside">
                        <div id="textarea">
                            <div className="AlbumArt" id="albumart">
                                <img src={this.state.nowPlaying.albumArt} alt="" />
                            </div>
                            <h2> {this.state.nowPlaying.name}</h2>
                            <h3> {this.state.nowPlaying.artist}</h3>
                        </div>

                    </div>

                    <div className="outputlyrics"><h2> Lyrics </h2></div>

                    <div id="output" className="outputlyricstext">no data</div>
                </div>
            </div>
        )
    }
}


export default Dashboard