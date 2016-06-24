import React, { Component } from 'react';
import { observer } from 'mobx-react';

import daysStore from '../stores/days';

@observer
export default class PeriodSelect extends Component {

    updatePeriod = () => {
        const period = parseInt(this.refs.period.value, 10);
        daysStore.updatePeriod(period);
    }

    render() {
        return(
            <input type="number" min="0" ref="period" onChange={ this.updatePeriod } value={ daysStore.period } className="form-control"/>
        )
    }
}