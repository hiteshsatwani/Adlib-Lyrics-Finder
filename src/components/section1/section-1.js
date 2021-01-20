import React, { Component } from 'react';
import './section-1.css';
import {Button} from '../Button'

class Section1 extends Component {


    render() {
        return (
            <div className="section1">
                <div className="text">
                    <h3>Get your lyrics directly</h3>
                    <h3>from Spotify</h3>
                    <br/><br/><br/><br/>
                    <h4>Get lyrics for any song while listening to it on Spotify.</h4>
                    <h4>AdLib uses public resources to get the lyrics to the </h4>
                    <h4>song you are currently listening to on Spotify.</h4>
                    <a href="http://15.185.198.113:3000/login"> <Button className='btn--primary'> < i className="fab fa-spotify"></i>Get Lyrics Now</Button></a>
                </div>
                
                <div className="image" >
                    <img alt="spotifyimage" src="https://i.ibb.co/M7CV6vV/mark-cruz-w3-zayd-SNRY-unsplash-1-1.jpg" height="615px" width="422px"></img>
                </div>
    
            </div>


        )
    }

}

export default Section1