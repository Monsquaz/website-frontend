import Config from '../config.js';
import {
  ApolloClient,
  createNetworkInterface
} from 'apollo-client';

export default new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: Config.apiUri,
    transportBatching: true,
  }),
  ssrForceFetchDelay: 100,
  connectToDevTools: true,
});
