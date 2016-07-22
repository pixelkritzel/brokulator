import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Line } from 'react-chartjs';

import store from '../stores/store';
import PeriodSelect from './PeriodSelect';
import Days from './Days';

function generateChartData() {
  const days = store.days.selected;
  const labels = days.map( day => day.moment.format('YYYY-MM-DD'))
  const datasets = [{
    label: 'Aggregated',
    fillColor: "rgba(220,220,220,0.2)",
    strokeColor: "rgba(220,220,220,1)",
    pointColor: "rgba(220,220,220,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: days.map(day => day.accountsWithTransactionsOfDay.length > 0
                          ? day.accountsWithTransactionsOfDay[day.accountsWithTransactionsOfDay.length - 1].balanceOfDay
                          : 0)
  },{
    label: 'Sparkasse',
    fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
    data: days.map(day => day.accountsWithTransactionsOfDay.length > 0
                          ? day.accountsWithTransactionsOfDay[0].balanceOfDay
                          : 0 )
  }]
  
  return { datasets, labels } 
}

@observer
class Calculation extends Component {
    render() {
     const options = {
       bezierCurve : false,
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
        return(
          <div>
            <PeriodSelect />
            { store.isLoaded ? <Line data={ generateChartData() } options={ options } width="600" height="250" /> : void 0}            
            <Days />
          </div>
        )
    }
}

export default Calculation;