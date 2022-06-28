import React from 'react';
import { Link } from "react-router-dom"; 
import {hasCsrfToken, setAccessTokenCookie} from './utils';

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

    handleLogin () {
        setAccessTokenCookie(this.state.username, this.state.username, this.placeholderFunction);
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
                                placeholder="username"
                                onClick={this.handleUserChange}
                                onKeyDown={this.handleUserChange}/> 
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>  
                        <input name="password"
                                type="password"
                                id="password"
                                placeholder="password"
                                onClick={this.handlePassChange}
                                onKeyDown={this.handlePassChange}/>
                    </div>
                    <Link to="/" onClick={this.handleLogin}>Login</Link>
                </form>
            </div>
        
            )
    }

}
export default Login;
