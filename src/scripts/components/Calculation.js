import React, { Component } from 'react';

import PeriodSelect from './PeriodSelect';
import Days from './Days';

class Calculation extends Component {
    render() {
        return(
          <div>
            <PeriodSelect />
            <Days />
          </div>
        )
    }
}

export default Calculation;