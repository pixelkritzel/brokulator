import React, { Component } from 'react';

import store  from '../stores/store';

class CalculationStep extends Component {
    render() {
        const { step } = this.props;
        return(
            <tr>
                <td>{ store.period.periodType === 'days' ? step.moment.format('DD.MM.YYYY') : step.moment.format('MMMM') }</td>
                { step.accountsWithTransactionsOfStep.map( o => <td key={ o.account.id + step.moment.format('DD.MM.YYYY') }>{ o.balanceOfStep }</td> )  }
            </tr>
        )
    }
}

export default CalculationStep;