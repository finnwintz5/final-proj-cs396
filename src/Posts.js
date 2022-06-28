import React from 'react';
import {getHeaders} from './utils';
import Post from './Post';

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.getPostsFromServer()
        this.modal_func = this.props.modal_func.bind(this);
    }
    getPostsFromServer() {
        fetch('https://photos-and-friends.herokuapp.com/api/posts',{
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            this.setState({
                posts: data.slice(0,10)
            })
        })
    }
    componentDidMount() {

    }

    render () {
        return (
                <div id="posts">
                    {
                        this.state.posts.map(post => {
                            return (
                                <Post
                                    key={'posts_'+post.id}
                                    model={post}
                                    modal_func={this.modal_func}
                                />
                            )
                        })
                    }
                </div>
            )
    }
}

export default Posts;