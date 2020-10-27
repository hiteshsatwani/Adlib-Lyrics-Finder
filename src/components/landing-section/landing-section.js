import React, { Component } from 'react';
import { Button } from '../Button';
import './landing-section.css'

class LandingSection extends Component {

    render(){
        return(
            <div className="front-section">
                <div className="title">
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <h3>Get The Lyrics,</h3>
                <h3>For The Song Your,</h3>
                <h3>Listening To Instanly.</h3>
                </div>
                <br></br><br></br>
                <Button >Go To Dashboard</Button>
            </div>
        )
    }
    
}

export default LandingSection