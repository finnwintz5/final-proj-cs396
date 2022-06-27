import React from 'react';
import {getHeaders} from './utils';

class LikeButton extends React.Component {

    constructor(props) {
        super(props);
        // binding "this":
        // not intuitive.  Helps disambiguate between
        // what "this" refers to
        this.toggleLike = this.toggleLike.bind(this);
        this.createLike = this.createLike.bind(this);
        this.removeLike = this.removeLike.bind(this);
    }

    componentDidMount() {

    }

    toggleLike () {
        if(this.props.likeId) {
            this.removeLike();
        } else {
            this.createLike();
        }
    }

    createLike () {
        const url = '/api/posts/likes';
        const postData = {
            "post_id": this.props.postId
        };
        fetch(url, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(postData)
        }).then(response => response.json())
        .then(data => {
            // needs to trigger post redraw
            console.log(data);
            this.props.refreshPost();
        })
        
    }

    removeLike () {
        const url = '/api/posts/likes/' + this.props.likeId;
        fetch(url, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            // needs to trigger post redraw
            console.log(data);
            this.props.refreshPost();
        })

    }

    render () {
        const likeId = this.props.likeId;
        const heartIcon = (likeId ? 'fas' : 'far' ) + ' fa-heart fa-lg';
        const ariaChecked = !!likeId;
        const heartClass = (likeId ? 'Liked' : '');
        return (
                    <button onClick={this.toggleLike}
                            aria-label='Like'
                            role="switch"
                            // fix aria-checked
                            aria-checked={ariaChecked}
                            data-post-id={this.props.postId}
                            data-like-id={this.props.likeId}
                            className={heartClass}>
                        <i className={heartIcon}></i></button>
                )
                    
            
    }
}

export default LikeButton;