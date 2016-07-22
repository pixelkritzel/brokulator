import React, { Component } from 'react';

class Day extends Component {
    render() {
        const { day } = this.props;
            console.log(day.transactions)

        return(
            <tr>
                <td>{ day.moment.format('DD.MM.YYYY') }</td>
                { day.accountsWithTransactionsOfDay.map( o => <td>{ o.balanceOfDay }</td> )  }
            </tr>
        )
    }
}

export default Day;