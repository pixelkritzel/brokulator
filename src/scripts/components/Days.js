import React, { Component } from 'react';
import { observer } from 'mobx-react';

import store  from '../stores/store';

import Day from './Day';

@observer
class Days extends Component {
    render() {
        return(
            <ul>
            { store.days.noOfDays.map( day => <Day day={ day } key={ day }/>) }
            </ul>
        )
    }
}



export default Days;