import React from 'react';
import FollowButton from './FollowButton';

class Suggestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestion: props.model
        }
    }

    componentDidMount() {

    }

    render () {
        return (
            <section className="profile_follow">
                    {/* insert variable img here */}
                    <img src={this.state.suggestion.thumb_url} alt={this.state.suggestion.username + " profile"}/>
                    <section>
                        {/* insert variable username here */}
                        <p className="username">{this.state.suggestion.username}</p>
                        <p className="grey">Suggested for you</p>
                    </section>
                    {/* add follow capabilities here */}
                    <FollowButton user={this.state.suggestion}/>
            </section>
        )
    }
}

export default Suggestion;