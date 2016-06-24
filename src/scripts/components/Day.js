import React, { Component } from 'react';

class Day extends Component {
    render() {
        return(
            <li>
            { this.props.day }
            </li>
        )
    }
}

export default Day;