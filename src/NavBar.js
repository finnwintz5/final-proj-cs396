import { Link } from "react-router-dom"; 
import React from 'react';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        // binding "this":
        // not intuitive.  Helps disambiguate between
        // what "this" refers to
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {

    }

    logout () {
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });
    }

    render () {
        return (
            <section id="Navigation">
                <h1>{this.props.title}</h1>
                <section>
                    <p>{ this.props.username }</p>
                    <p className="blue">Sign out</p>
                </section>
            </section>
        )
    }
}

export default NavBar;