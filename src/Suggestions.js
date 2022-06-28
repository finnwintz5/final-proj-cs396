import React from 'react';
import Suggestion from './Suggestion';
import {getHeaders} from './utils';

class Suggestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: []
        }
        this.getSuggestionsFromServer()
    }
    getSuggestionsFromServer() {
        fetch('https://photos-and-friends.herokuapp.com/api/suggestions',{
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            this.setState({
                suggestions: data
            })
        })
    }

    componentDidMount() {

    }

    render () {
        return (
            <section id="suggestions">
                <section id="my_profile">
                    {/* insert variable img here */}
                    <img src={this.props.user.thumb_url} alt="hello"/>
                    {/* insert variable username here */}
                    <h2>{this.props.user.username}</h2>
                </section>
                <p id="suggestion">Suggestions for you</p>
                <section id="other_profiles">
                    {
                        this.state.suggestions.map(suggestion => {
                            return (
                                <Suggestion 
                                    key={'suggestion_'+suggestion.id}
                                    model={suggestion}
                                />
                            )
                        })
                    }
                </section>
            </section>
        )
    }
}

export default Suggestions;