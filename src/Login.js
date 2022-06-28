import React from 'react';

class Login extends React.Component {
    componentDidMount() {

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
                        <input name="username" type="text" id="username" placeholder="username"/> 
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>  
                        <input name="password" type="password" id="password" placeholder="password"/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        
            )
    }

}
export default Login;
