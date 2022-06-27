import React from 'react';
import ModalComment from './ModalComment';
import {getHeaders} from './utils';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            dataFetched: false
        }
        if(this.props.modal_post_id) {
            this.getPost();
        }
        this.xRef = React.createRef();
        this.modal_func = this.props.modal_func.bind(this);
    }
    getPost () {
        const url = '/api/posts/' + this.props.modal_post_id;
        fetch(url, {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            this.setState({
                post: data,
                dataFetched: true
            })
            this.xRef.current.focus();
        })
        
    }
    
    closeModal () {
        console.log("WAAAAAA");
        this.setState({
            post: null,
            dataFetched: false
        });
        this.modal_func(null);
    }

    componentDidMount() {
        
    }

    generateCaption (post) {
        const display_time = post.display_time.toUpperCase();
        return (
            <section className="modal-comment">
                            <img src={post.user.thumb_url} alt={post.user.username + " profile"}/>
                            <section>
                                <p>
                                    <span className="bolded">{post.user.username}</span>
                                    {" " + post.caption}
                                </p>
                                <p className="grey">{display_time}</p>
                            </section>
                            <button><i className="far fa-heart fa-lg"></i></button>
                        </section>
        );
    }

    loadedModal () {
        const post = this.state.post;
        const caption = this.generateCaption(post);
        return (
                <div className="modal-body">
                    <section>
                        {/* insert variable post picture here */}
                        <img src={post.image_url} alt={post.user.username + " post " + this.props.modal_post_id}/>
                    </section>
                    <section id="modal-panel">
                        <section id="modal-profile">
                            <img src={post.user.thumb_url} alt={post.user.username + " profile"}/>
                            <h2>{post.user.username}</h2>
                        </section>
                        <section id="modal-comments">
                                    {caption}
                            {
                                post.comments.map(comment => {
                                console.log(comment);
                                return (
                                    <ModalComment
                                        key={'comment_'+comment.id}
                                        model={comment}
                                    />
                                    )
                                })
                            }
                        </section>
                    </section>
                </div>
        )
    }

    render () {
        const ariaChecked = !this.props.modal_post_id;
        let filling = null;
        let modalClassName = null;
        if(this.state.dataFetched) {
            filling = this.loadedModal();
            modalClassName = "modal-bg";
        } else {
            modalClassName = "modal-bg hidden"; //hidden
            if (this.props.modal_post_id) {
                this.getPost();
            }
        }
        return (
                <div aria-hidden= {ariaChecked}
                    className={modalClassName}
                    role="dialog">
                    <section className="modal">
                        <button className="close"
                            onClick={this.closeModal.bind(this)}
                            ref={this.xRef}><i className="fas fa-x fa-xl"></i></button>
                        {filling}
                    </section>
                    
                </div>
            )
    }
}

export default Modal;