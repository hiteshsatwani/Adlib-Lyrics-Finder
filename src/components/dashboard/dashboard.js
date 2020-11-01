import React, { Component } from 'react';
import './dashboard.css';
import $ from "jquery";



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
            nowPlaying: { name: 'Nothing Playing', albumArt: 'https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png', artist: 'Nothing Playing', albumName: 'None', artistId: '' },
            relatedArtist: { name: '', img: '', url: '', name2: '', img2: '', url2: '', name3: '', img3: '', url3: '' },
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

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    getNowPlaying() {
        let currentlyplaying;


        setInterval(() => {
            spotifyApi.getMyCurrentPlaybackState()
                .then((response) => {
                    this.setState({
                        nowPlaying: {
                            name: response.item.name,
                            artist: response.item.artists[0].name,
                            albumArt: response.item.album.images[0].url,
                            albumName: response.item.album.name,
                            artistId: response.item.artists[0].id
                        }
                    })
                })

        }, 5000);

        setInterval(() => {
            if (this.state.nowPlaying.name != 'Nothing Playing') {
                spotifyApi.getArtistRelatedArtists(this.state.nowPlaying.artistId)
                    .then((response) => {
                        this.setState({
                            relatedArtist: {
                                name: response.artists[0].name,
                                img: response.artists[0].images[1].url,
                                url: response.artists[0].external_urls.spotify,
                                name2: response.artists[1].name,
                                img2: response.artists[1].images[1].url,
                                url2: response.artists[1].external_urls.spotify,
                                name3: response.artists[2].name,
                                img3: response.artists[2].images[1].url,
                                url3: response.artists[2].external_urls.spotify
                            }
                        })
                    })
            }
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
            <div className="dashboard" onLoad={() => this.getNowPlaying()} >
                <div className={this.state.animationClass} onLoad={() => this.findLyrics()} >
                    <div className="rightside">
                        <div className="textarea">
                            <div className="AlbumArt" id="albumart">
                                <img src={this.state.nowPlaying.albumArt} alt="" />
                            </div>
                            <h2>{this.state.nowPlaying.name}</h2>
                            <h3> {this.state.nowPlaying.artist} </h3>
                            <h3> {this.state.nowPlaying.albumName} </h3>
                            <br></br><br></br><br></br><br></br>
                        </div>


                        <div className="similar-artists" id="similar-artists">
                            <h2> Similar Artists </h2>
                            <img src={this.state.relatedArtist.img} alt=""></img>
                            <h3><a href={this.state.relatedArtist.url} >{this.state.relatedArtist.name}</a></h3>
                            <img src={this.state.relatedArtist.img2} alt=""></img>
                            <h3> <a href={this.state.relatedArtist.url2}>{this.state.relatedArtist.name2}</a></h3>
                            <img src={this.state.relatedArtist.img3} alt=""></img>
                            <h3> <a href={this.state.relatedArtist.url3}>{this.state.relatedArtist.name3}</a></h3>
                        </div>
                    </div>
                    {/* eslint-disable-next-line */}
                    <a id="dashboard"><div className="outputlyrics"><h2> Lyrics </h2></div></a>

                    <div id="output" className="outputlyricstext"></div>
                </div>
            </div>
        )
    }
}


export default Dashboard