import { observable, computed, action } from 'mobx';
import moment from 'moment';

function generateDays(numberOfDays, currentDate = moment()) {
    const days = [];
    for (let i = 0; i < numberOfDays; i++) {
        days.push( moment(currentDate).add(i, 'days').format('YYYY-MM-DD') )
    }
    return days;
}

class DaysStore {

  @observable period = 5;

  @computed get noOfDays() {
    return generateDays(this.period);
  }

  @action updatePeriod( days ) {
    this.period = days;
  }
}

export default new DaysStore();
