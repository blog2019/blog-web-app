import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
// import registerServiceWorker from './registerServiceWorker';

import configureStore from "./redux/configureStore";
import App from "./containers/App";

// ReactDOM.render(<App />, document.getElementById('root'));

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
