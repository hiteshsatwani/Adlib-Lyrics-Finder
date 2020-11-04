import React, { Component } from 'react';
import { Button } from '../Button';
import './landing-section.css'

class LandingSection extends Component {


    constructor() {

        super();
        const params = this.getHashParams();
        const token = params.access_token;

        this.state = {
            loggedIn: token ? true : false
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
            <div className="front-section">
                <div className="title-button-container">
                <div className="title">
                    <h3>Get Your Top 10,</h3>
                    <h3>Artists Instanly,</h3>
                    <h3>Only at Adlib.</h3>
                </div>
                <div className="mobile-button">
                {this.state.loggedIn && <Button ><a href="#dashboard"> Go To Dashboard </a> </Button>}
                {!this.state.loggedIn && <a href="https://spotify-auth-adlib.herokuapp.com/login"><Button>< i className="fab fa-spotify"></i> Login To Spotify </Button></a>}
                </div>
                </div>
            </div>
        )
    }

}

export default LandingSection