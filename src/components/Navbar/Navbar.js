import React, { Component } from 'react';
import { Button } from '../Button';
import {MenuItems} from './MenuItems'
import './Navbar.css'


class Navbar extends Component {
    state = { clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo"><img src="https://i.ibb.co/y8CwYrj/ADLIB-LOGO.png" height="60px" width="60px" alt="logo"></img></h1>
                <div className="menu-icon" onClick={this.handleClick} >
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}><a className={item.cName} href={item.url}>{item.title}</a></li>
                        )
                    })}
                </ul>
                <div className="login-button-nav">
                <a href="https://spotify-auth-adlib.herokuapp.com/login"><Button>< i className="fab fa-spotify"></i> Login To Spotify </Button></a>
                </div>
                
            </nav>
        )
    }
}

export default Navbar