import React from 'react';
import FlashMessage from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import { ReduxNetworkProvider } from 'react-native-offline';
import Orientation from 'react-native-orientation';
import { Provider } from 'react-redux';
import Router from './Router';
import RouterService from './services/RouterService';
import store from './store';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ isLoading: store.getState().base.isLoading });
    });
    //Orientation.lockToPortrait();
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Provider store={store}>
        <ReduxNetworkProvider>
          <Spinner visible={isLoading} />
          <Router
            ref={routerRef => {
              RouterService.setTopLevelRouter(routerRef);
            }}
          />
          <FlashMessage
            position='top'
            duration={5000}
          />
        </ReduxNetworkProvider>
      </Provider>
    );
  }
};
