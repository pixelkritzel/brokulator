import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DatePicker from 'react-datepicker';

import store from '../stores/store';

@observer
export default class PeriodSelect extends Component {

    updatePeriod = (endDate) => {
        store.period.updateEndDate(endDate);
    }

    changePeriodType = (event) => {
        store.period.changePeriodType(event.target.value);
    }

    render() {
        return(
            <div className="period-select__form">
                <div className="form-group">
                    <label htmlFor="endDate">Till</label>
                    <DatePicker selected={ store.period.endDate }
                                onChange={ this.updatePeriod }
                                className="form-control" />
                </div>
                <div className="form-group">in</div>
                <div className="radio">
                    <label>
                        <input type="radio"
                               name="periodType"
                               value="days"
                               defaultChecked={ store.period.periodType == 'days'}
                               onChange={ this.changePeriodType } />
                        Days
                    </label>
                    <label>
                        <input type="radio"
                               name="periodType"
                               value="months"
                               defaultChecked={ store.period.periodType == 'months'}
                               onChange={ this.changePeriodType } />
                        Months
                    </label>
                    
                </div>
            </div>           
        )
    }
}