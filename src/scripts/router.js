import Calculation from './components/Calculation';
import Transactions from './components/Transactions';
import Accounts from './components/Accounts';
import RouteNotFound from './components/RouteNotFound';

const ROUTES = {
  'calculation': Calculation,
  'transactions': Transactions,
  'accounts': Accounts
}

function getView(route) {
  return ROUTES[route] || RouteNotFound
}

export default getView;