import React, { Component } from 'react';

class Day extends Component {
    render() {
        const { day } = this.props;
        return(
            <tr>
                <td>{ day.moment.format('DD.MM.YYYY') }</td>
                { day.accountsWithTransactionsOfDay.map( o => <td key={ o.account.id + day.moment.format('DD.MM.YYYY') }>{ o.balanceOfDay }</td> )  }
            </tr>
        )
    }
}

export default Day;