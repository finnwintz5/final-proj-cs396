import React from 'react';
import { getHeaders } from './utils';

class AddComment extends React.Component {

    constructor(props) {
        super(props);
        // binding "this":
        // not intuitive.  Helps disambiguate between
        // what "this" refers to
        this.state = {
            value: ''
        }
        this.commentRef = React.createRef();
        this.createComment = this.createComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    createComment (text) {
        const url = '/api/comments';
        const comment_text = text;
        const postData = {
            "post_id": this.props.postId,
            "text": comment_text
        };
        console.log('create comment',url);
        fetch(url, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(postData)
        }).then(response => response.json())
        .then(data => {
            // needs to trigger post redraw
            console.log(data);
            this.props.refreshPost();
            this.commentRef.current.focus();
        })
        this.setState({value: ""});
    }

    
    render () {
        return (
            <section className="add_comment">
                <section>
                    <i className="far fa-smile fa-lg"></i>
                    <textarea 
                            type="text" rows="1"
                            aria-label="Add a comment"
                            data-post-id={this.props.postId}
                            ref={this.commentRef}
                            value={this.state.value}
                            onChange={this.handleChange}
                            onKeyDown={this.handleChange}
                            placeholder="Add a comment..."></textarea>
                </section>
                <button className="blue"
                        onClick={() => { this.createComment(this.state.value) }}
                        data-post-id={this.props.postId}>Post</button>
            </section>
                )
    }
}

export default AddComment;