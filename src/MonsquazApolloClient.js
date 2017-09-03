import Config from '../config.js';
import store from './store';
import {
  ApolloClient,
  createNetworkInterface
} from 'apollo-client';

let networkInterface = createNetworkInterface({
  uri: Config.apiUri,
  transportBatching: true,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const authToken = store.getters.authToken;
    if(authToken) {
      req.options.headers['X-Auth-Token'] = authToken;
    }
    next();
  }
}]);

export default new ApolloClient({
  networkInterface,
  ssrForceFetchDelay: 100,
  connectToDevTools: true,
});
