import React from 'react';

class ModalComment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: props.model
        }
    }

    componentDidMount() {

    }

    render () {
        const display_time = this.state.comment.display_time.toUpperCase();
        
        return (
            <section className="modal-comment">
                <img src={this.state.comment.user.thumb_url} alt={this.state.comment.user.username + " profile"}/>
                <section>
                    <p>
                        <span className="bolded">{this.state.comment.user.username}</span>
                        {" " + this.state.comment.text}
                    </p>
                    <p className="grey">{display_time}</p>
                </section>
                <button><i className="far fa-heart fa-lg"></i></button>
            </section>
            )
    }
}

export default ModalComment;