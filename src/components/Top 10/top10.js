import React, { Component } from 'react';
import './top10.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { Button } from '../Button';
const spotifyApi = new SpotifyWebApi();

class Top10artists extends Component {

    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;

        const defaultimg = "https://img.sheetmusic.direct/img/legacystructure/Global/placeholder.png";

        if (token) {
            spotifyApi.setAccessToken(token);
        }

        this.state = {
            TopArtists: { one: 'Unknown', two: 'Unknown', three: 'Unknown', four: 'Unknown', five: 'Unknown', six: 'Unknown', seven: 'Unknown', eight: 'Unknown', nine: 'Unknown', ten: 'Unknown' },
            TopArtistsImg: { one: defaultimg, two: defaultimg, three: defaultimg, four: defaultimg, five: defaultimg, six: defaultimg, seven: defaultimg, eight: defaultimg, nine: defaultimg, ten: defaultimg }
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

    getTop10() {
        console.log("test")
        spotifyApi.getMyTopArtists().then((response) => {
            this.setState({
                TopArtists: {
                    one: response.items[0].name,
                    two: response.items[1].name,
                    three: response.items[2].name,
                    four: response.items[3].name,
                    five: response.items[4].name,
                    six: response.items[5].name,
                    seven: response.items[6].name,
                    eight: response.items[7].name,
                    nine: response.items[8].name,
                    ten: response.items[9].name
                },
                TopArtistsImg: {
                    one: response.items[0].images[0].url,
                    two: response.items[1].images[0].url,
                    three: response.items[2].images[0].url,
                    four: response.items[3].images[0].url,
                    five: response.items[4].images[0].url,
                    six: response.items[5].images[0].url,
                    seven: response.items[6].images[0].url,
                    eight: response.items[7].images[0].url,
                    nine: response.items[8].images[0].url,
                    ten: response.items[9].images[0].url
                }
            })
        })
    }


    render() {
        return (
            <div className="top10">
                <div className="title-container">
                    <h2>Your Top 10 Artists</h2>
                    <h3>Here are your top 10 artists of all time</h3>
                </div>
                <div className="artist-list">
                    <ul className="artist-grid">
                        <li>
                            <img src={this.state.TopArtistsImg.one} alt="" />
                            <h2>1. {this.state.TopArtists.one}</h2>
                        </li>
                        <li>
                            <img src={this.state.TopArtistsImg.two} alt="" />
                            <h2>2. {this.state.TopArtists.two}</h2>
                        </li>
                        <li>
                            <img src={this.state.TopArtistsImg.three} alt="" />
                            <h2>3. {this.state.TopArtists.three}</h2>
                        </li>
                        <li>
                            <img src={this.state.TopArtistsImg.four} alt="" />
                            <h2>4. {this.state.TopArtists.four}</h2>
                        </li>
                        <li>
                            <img src={this.state.TopArtistsImg.five} alt="" />
                            <h2>5. {this.state.TopArtists.five}</h2>
                        </li>
                        <li>
                            <img src={this.state.TopArtistsImg.six} alt="" />
                            <h2>6. {this.state.TopArtists.six}</h2>
                        </li>
                        <li>
                            <img src={this.state.TopArtistsImg.seven} alt="" />
                            <h2>7. {this.state.TopArtists.seven}</h2>
                        </li>
                        <li>
                            <img src={this.state.TopArtistsImg.eight} alt="" />
                            <h2>8. {this.state.TopArtists.eight}</h2>
                        </li>
                        <li>
                            <img src={this.state.TopArtistsImg.nine} alt="" />
                            <h2>9. {this.state.TopArtists.nine}</h2>
                        </li>
                        <li>
                            <img src={this.state.TopArtistsImg.ten} alt="" />
                            <h2>10. {this.state.TopArtists.ten}</h2>
                        </li>

                    </ul>
                </div>
                <Button onClick={() => this.getTop10()}>Get Your Top 10</Button>
            </div>
        )
    }
}

export default Top10artists