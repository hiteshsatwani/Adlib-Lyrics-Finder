import React, { Component } from 'react';
import { Button } from '../Button'
import './dashboard-blurred.css';

class DashboardBlurred extends Component {


    render() {
        return (
            <div className="dashboard" >

                <div className="test-blur">
                    <div className="no-blur">
                        <h3>You haven't signed in yet! Click the sign in button below!</h3>
                        <div className="blur-button">
                        <a href="https://spotify-auth-adlib.herokuapp.com/login"><Button>< i className="fab fa-spotify"></i> Login To Spotify </Button></a>
                        </div>
                    </div>

                </div>




            </div>


        )
    }

}

export default DashboardBlurred