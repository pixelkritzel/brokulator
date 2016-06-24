import Calculation from './components/Calculation';
import Transactions from './components/Transactions';
import RouteNotFound from './components/RouteNotFound';

const ROUTES = {
  'calculation': Calculation,
  'transactions': Transactions
}

function getView(route) {
  return ROUTES[route] || RouteNotFound
}

export default getView;