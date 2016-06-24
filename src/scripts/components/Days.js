import React, { Component } from 'react';
import { observer } from 'mobx-react';

import daysStore  from '../stores/days';

import Day from './Day';

@observer
class Days extends Component {
    render() {
        return(
            <ul>
            { daysStore.days.map( day => <Day day={ day } key={ day }/>) }
            </ul>
        )
    }
}



export default Days;