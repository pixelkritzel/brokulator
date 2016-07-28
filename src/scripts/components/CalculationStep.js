import React, { Component } from 'react';

class CalculationStep extends Component {
    render() {
        const { step } = this.props;
        return(
            <tr>
                <td>{ step.moment.format('DD.MM.YYYY') }</td>
                { step.accountsWithTransactionsOfStep.map( o => <td key={ o.account.id + step.moment.format('DD.MM.YYYY') }>{ o.balanceOfStep }</td> )  }
            </tr>
        )
    }
}

export default CalculationStep;