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
            <div className="period-select__form">
                <div className="form-group">
                    <label htmlFor="endDate">Enddate</label>
                    <input type="number" min="0" id="endDate" ref="period" onChange={ this.updatePeriod } value={ store.days.period } className="form-control"/>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="periodType" value="days" defaultChecked={ store.days.periodType == 'days'}/> Days
                    </label>
                    <label>
                        <input type="radio" name="periodType" value="months" defaultChecked={ store.days.periodType == 'months'}/> Months
                    </label>
                    
                </div>
            </div>           
        )
    }
}