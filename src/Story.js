import React from 'react';

class Story extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            story: props.model
        }
    }

    componentDidMount() {

    }

    render () {
        return (
            <section>
                <img src={this.state.story.user.thumb_url} alt={this.state.story.user.username + " story"}/>
                <p>{this.state.story.user.username}</p>
            </section>
        )
    }
}

export default Story;