import React from 'react';
import {hasCsrfToken, setAccessTokenCookie} from './utils';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    
    
    constructor(props) {
        super(props);
        // binding "this":
        // not intuitive.  Helps disambiguate between
        // what "this" refers to
        this.state = {
            username: '',
            password: ''
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleUserChange(event) {
        this.setState({username: event.target.value});
    }

    handlePassChange(event) {
        this.setState({password: event.target.value});
    }

    login () {
        setAccessTokenCookie(this.state.username, this.state.username);
        return <Redirect to='/' />;
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
                                onChange={this.handleUserChange}
                                onKeyDown={this.handleUserChange}/> 
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>  
                        <input name="password"
                                type="password"
                                id="password"
                                placeholder="password"
                                onChange={this.handlePassChange}
                                onKeyDown={this.handlePassChange}/>
                    </div>
                    <button type="submit" onClick={this.login}>Login</button>
                </form>
            </div>
        
            )
    }

}
export default Login;