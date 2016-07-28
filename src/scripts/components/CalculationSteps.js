import React, { Component } from 'react';
import { observer } from 'mobx-react';

import store  from '../stores/store';

import CalculationStep from './CalculationStep';

@observer
class CalculationSteps extends Component {
  render() {
    if (store.isLoaded) {
      return(
        <table className="table">
          <thead>
            <tr>
              <th>
                Date
              </th>
              { store.accounts.all.map( account => <th key={ 'th' + account.id }>{ account.name }</th>)}
              <th><strong>Sum</strong></th>
            </tr>
          </thead>
          <tbody>
            { store.period.selectedSteps.map( step => <CalculationStep step={ step } key={ step.moment.format('YYYY-MM-DD') }/>) }
          </tbody>
        </table>
      )
    } else {
      return(<div />)
    }
  }
}



export default CalculationSteps;