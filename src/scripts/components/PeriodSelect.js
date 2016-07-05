import React, { Component } from 'react';
import { observer } from 'mobx-react';

import store from '../stores/store';

@observer
export default class PeriodSelect extends Component {

    updatePeriod = () => {
        const period = parseInt(this.refs.period.value, 10);
        store.days.updatePeriod(period);
    }

    render() {
        return(
            <input type="number" min="0" ref="period" onChange={ this.updatePeriod } value={ store.days.period } className="form-control"/>
        )
    }
}