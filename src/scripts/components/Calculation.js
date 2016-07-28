import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Line } from 'react-chartjs';

import store from '../stores/store';
import PeriodSelect from './PeriodSelect';
import CalculationSteps from './CalculationSteps';

function generateChartData() {
  const steps = store.period.selectedSteps;
  const labels = steps.map( step => step.moment.format('YYYY-MM-DD'))
  const datasets = [{
    label: 'Aggregated',
    fillColor: "rgba(220,220,220,0.2)",
    strokeColor: "rgba(220,220,220,1)",
    pointColor: "rgba(220,220,220,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: steps.map(step => step.accountsWithTransactionsOfStep.length > 0
                          ? step.accountsWithTransactionsOfStep[step.accountsWithTransactionsOfStep.length - 1].balanceOfStep
                          : 0)
  },{
    label: 'Sparkasse',
    fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
    data: steps.map(step => step.accountsWithTransactionsOfStep.length > 0
                          ? step.accountsWithTransactionsOfStep[0].balanceOfStep
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
            <CalculationSteps />
          </div>
        )
    }
}

export default Calculation;