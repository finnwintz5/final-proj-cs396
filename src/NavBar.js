import { Link } from "react-router-dom"; 
import React from 'react';

class NavBar extends React.Component {

    componentDidMount() {

    }

    render () {
        return (
            <section id="Navigation">
                <h1>{this.props.title}</h1>
                <section>
                    <p>{ this.props.username }</p>
                    <Link to="/login" className="blue">Sign out</Link>
                </section>
            </section>
        )
    }
}

export default NavBar;