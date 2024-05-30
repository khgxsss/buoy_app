/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // 스토어의 경로를 올바르게 지정해주세요

const ReduxApp = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  AppRegistry.registerComponent(appName, () => ReduxApp);
