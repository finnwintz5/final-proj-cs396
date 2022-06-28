import React from 'react';
import Story from './Story';
import {getHeaders} from './utils';

class Stories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: []
        }
        this.getStoriesFromServer()
    }
    getStoriesFromServer() {
        fetch('https://photos-and-friends.herokuapp.com/api/stories',{
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            this.setState({
                stories: data
            })
        })
    }
    componentDidMount() {

    }

    render () {
        return (
                <section id="stories">
                    {
                        this.state.stories.map(story => {
                            return (
                                <Story 
                                    key={'stories_'+story.id}
                                    model={story}/>
                            )
                        })
                    }
                </section>
            )
    }
}

export default Stories;