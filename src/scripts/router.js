import Calculation from './components/Calculation';
import RouteNotFound from './components/RouteNotFound';

const ROUTES = {
  'calculation': Calculation
}

function getView(route) {
  return ROUTES[route] || RouteNotFound
}

export default getView;