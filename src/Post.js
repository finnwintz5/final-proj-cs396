import React from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import { getHeaders } from './utils';


class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: props.model
        }
        this.refreshPostDataFromServer = this.refreshPostDataFromServer.bind(this);
        this.modal_func = this.props.modal_func.bind(this);
    }

    refreshPostDataFromServer () {
        const url = '/api/posts/' + this.state.post.id;
        fetch(url, {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            this.setState({
                post: data
            })
        })
    }

    componentDidMount() {

    }

    temporaryFunction (num) {
        this.props.modal_func(num);
    }

    generateCaption (post) {
        if (post.caption.length > 90) {
            let shorter_caption = post.caption.substr(0,90);
            return (
                <p>
                    <span className="bolded">{post.user.username}</span>
                    {" " + shorter_caption}...
                <span className="blue">more</span>
            </p>
            );
        } else {
            return (
                <p>
                    <span className="bolded">{post.user.username}</span>
                    {post.caption}
                </p>
            );
        }
    }

    render () {
        const post = this.state.post;
        const comment_num = post.comments.length;
        const display_time = post.display_time.toUpperCase();
        const edited_caption = this.generateCaption(post);
        let viewButton=null;
        if (comment_num > 2) {
            viewButton = <button className="blue view_comments"
                onClick={this.temporaryFunction.bind(this, post.id)}>View all {comment_num} comments</button>;
        } else if (comment_num > 1) {
            viewButton = <button className="blue view_comments"                
                onClick={this.props.modal_func.bind(this, post.id)}>View all 1 comment</button>;
        }
        return (
            <section className="post">
            <section className="header">
                <h2>{post.user.username}</h2>
                <i className="fas fa-ellipsis-h"></i>
            </section>
            <img src={post.image_url} alt={post.user.username + " post " + post.id}/>
            <section className="comments_description">
                <section className="react">
                    <section>
                        <LikeButton likeId={post.current_user_like_id}
                            postId={post.id}
                            refreshPost={this.refreshPostDataFromServer}/>
                        <button aria-label='Open Modal'
                                onClick={this.temporaryFunction.bind(this, post.id)}
                            ><i className="far fa-comment fa-lg"></i></button>
                
                        
                        <button><i className="far fa-paper-plane fa-lg"></i></button>
                    </section>
                    <BookmarkButton bookmarkId={post.current_user_bookmark_id}
                            postId={post.id}
                            refreshPost={this.refreshPostDataFromServer}/>
                </section>
                <p className="likes">{post.likes.length} likes</p>
                <section className="caption">
                    {edited_caption}
                </section>
                <section className="comments">
                    {viewButton}
                    <p className="comment">
                        <span className="bolded">{post.comments[comment_num-1].user.username}</span>
                        {" " + post.comments[comment_num-1].text}
                    </p>
                    <p className="grey">{display_time}</p>
                </section>
                
            </section>
            <AddComment postId={post.id}
                        refreshPost={this.refreshPostDataFromServer}/>
        </section>
        )
    }
}

export default Post;