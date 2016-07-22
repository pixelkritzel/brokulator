import React, { Component } from 'react';
import { observer } from 'mobx-react';

import store  from '../stores/store';

import Day from './Day';

@observer
class Days extends Component {
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
            </tr>
          </thead>
          <tbody>
            { store.days.selected.map( day => <Day day={ day } key={ day.moment.format('YYYY-MM-DD') }/>) }
          </tbody>
        </table>
      )
    } else {
      return(<div />)
    }
  }
}



export default Days;