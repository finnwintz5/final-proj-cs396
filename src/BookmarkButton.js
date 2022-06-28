import React from 'react';
import {getHeaders} from './utils';

class BookmarkButton extends React.Component {

    constructor(props) {
        super(props);
        // binding "this":
        // not intuitive.  Helps disambiguate between
        // what "this" refers to
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.createBookmark = this.createBookmark.bind(this);
        this.removeBookmark = this.removeBookmark.bind(this);
    }

    componentDidMount() {

    }

    toggleBookmark () {
        if(this.props.bookmarkId) {
            this.removeBookmark();
        } else {
            this.createBookmark();
        }
    }

    createBookmark () {
        const url = 'https://photos-and-friends.herokuapp.com/api/bookmarks';
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

    removeBookmark () {
        const url = 'https://photos-and-friends.herokuapp.com/api/bookmarks/' + this.props.bookmarkId;
        console.log('remove bookmark',url);
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
        const bookmarkId = this.props.bookmarkId;
        const bookmarkIcon = (bookmarkId ? 'fas' : 'far' ) + ' fa-bookmark fa-lg';
        const ariaChecked = !!bookmarkId;
        const bookmarkClass = (bookmarkId ? 'Bookmarked' : '');
        return (
                    <button onClick={this.toggleBookmark}
                            role="switch"
                            aria-label='Bookmark'
                            // fix aria-checked
                            aria-checked={ariaChecked}
                            data-post-id={this.props.postId}
                            data-like-id={this.props.likeId}
                            className={bookmarkClass}>
                        <i className={bookmarkIcon}></i></button>
                )
    }
    
}

export default BookmarkButton;