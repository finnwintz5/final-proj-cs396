import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Posts from './Posts';
import Suggestions from './Suggestions';
import NavBar from './NavBar';
import Stories from './Stories';
import Modal from './Modal';
import Login from './Login';
import {getHeaders} from './utils';

class App extends React.Component {  

    constructor(props) {
        super(props);
        this.getProfileFromServer();
        this.state = {
            user: {},
            modal_post: null
        }
        this.update = this.update.bind(this);
    }

    update (new_post) {
        this.setState({modal_post: new_post});
    }

    getProfileFromServer () {
        fetch('https://photos-and-friends.herokuapp.com/api/profile',{
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            this.setState({
                user: data
            })
        })
    }

    home () {
        return (
        <div>
            <NavBar title="Photos + Friends" username={this.state.user.username}/>
            <main>
                <section id="feed">
                    <Stories />
                    <Posts modal_func={this.update}/>
                </section>
                <Suggestions user={this.state.user}/>
            </main>
            <Modal modal_post_id={this.state.modal_post} modal_func={this.update}/>
        </div>
        )
    }

    login () {
        return (
            <div>
                <Login />
            </div>
        )
    }

    render () {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={this.home()}/>
                    <Route path="/login" element={this.login()}/>
                </Routes>
            </Router>
        );
    }
}

export default App;