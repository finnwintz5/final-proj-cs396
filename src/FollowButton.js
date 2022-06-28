import React from 'react';
import {getHeaders} from './utils';

class FollowButton extends React.Component {

    constructor(props) {
        super(props);
        // binding "this":
        // not intuitive.  Helps disambiguate between
        // what "this" refers to
        this.state = {
            following_id: null
        }
        this.toggleFollow = this.toggleFollow.bind(this);
        this.createFollow = this.createFollow.bind(this);
        this.removeFollow = this.removeFollow.bind(this);
    }

    componentDidMount() {

    }

    toggleFollow () {
        if(this.state.following_id) {
            this.removeFollow();
        } else {
            this.createFollow();
        }
    }

    createFollow () {
        const url = 'https://photos-and-friends.herokuapp.com/api/following/';
        const postData = {
            "user_id": this.props.user.id
        };
        console.log('create like',url);
        fetch(url, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(postData)
        }).then(response => response.json())
        .then(data => {
            // needs to trigger post redraw
            console.log(data);
            this.setState({following_id: data.id});
            // this.props.refreshPost();
        })
        
    }

    removeFollow () {
        const url = `https://photos-and-friends.herokuapp.com/api/following/${this.state.following_id}`;
        console.log('remove follow',url);
        fetch(url, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            // needs to trigger post redraw
            console.log(data);
            this.setState({following_id: null});
            // this.props.refreshPost();
        })

    }

    render () {
        const followingId = this.state.following_id;;
        const followingText = (followingId ? 'Unfollow' : 'Follow' );
        const ariaChecked = !!followingId;
        const followingClass = (followingId ? 'blue Unfollow' : 'blue Follow' );
        return (
                    <button
                        className={followingClass} onClick={this.toggleFollow}
                        aria-label='Follow'
                        // fix aria-checked
                        role="switch"
                        aria-checked={ariaChecked}
                        data-following-id={this.state.following_id}
                    >{followingText}</button>
                )
                    
            
    }
}

export default FollowButton;