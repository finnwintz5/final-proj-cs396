import React from 'react';
import { Link } from "react-router-dom";
import {hasCsrfToken, setAccessTokenCookie, getAccessTokenCookie} from './utils';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.placeholderFunction = this.placeholderFunction.bind(this);
    }
    
    componentDidMount() {

    }

    placeholderFunction () {
        console.log("Access Token set");
        this.setState({username: ""});
        this.setState({password: ""});
    }

    async handleLogin (username,password) {
        // console.log("handleLogin called");
        // console.log(getAccessTokenCookie());
        // console.log(hasCsrfToken());
        console.log("handleLogin username: " + username);
        console.log("handleLogin this.state.username: " + this.state.username);
        console.log("handleLogin password: " + password)
        console.log("handleLogin this.state.password: " + this.state.password);
        if (!(hasCsrfToken() || getAccessTokenCookie())) {
            await setAccessTokenCookie(username,password, this.placeholderFunction);
            console.log("cookie does not already exists");
        }
        else {
            console.log("cookie does already exists");
        }
        // setAccessTokenCookie('webdev', 'password', this.placeholderFunction);
    }

    handleUserChange(event) {
        this.setState({username: event.target.value});
    }

    handlePassChange(event) {
        this.setState({password: event.target.value});
    }

    render () {
        return (
            <div>
                <nav id="Navigation">
                    <h1>Photos + Friends</h1>
                </nav>
                <form method="POST" action="/login">
                    <div>
                        <label htmlFor="username">Username</label>
                        <input name="username"
                                type="text"
                                id="username"
                                value={this.state.username}
                                placeholder="username"
                                onKeyDown={this.handleUserChange}
                                onChange={this.handleUserChange}/> 
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>  
                        <input name="password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                placeholder="password"
                                onKeyDown={this.handlePassChange}
                                onChange={this.handlePassChange}/>
                    </div>
                    <Link to="/" onClick={() => { this.handleLogin(this.state.username,this.state.password)}}>Login</Link>
                </form>
            </div>
        
            )
    }

}
export default Login;
