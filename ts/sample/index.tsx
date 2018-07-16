import * as React from "react";
import * as ReactDOM from "react-dom";
import Count from './count/container';
import { Provider } from "react-redux";
import { createStore } from "redux";
import IStore from './IStore';
import {reducers} from './reduxGen';

const store = createStore<IStore, any, {}, {}>(reducers);

const App = () => (
    <Provider store={store}>
    <Count />
    </Provider>
)
  
  ReactDOM.render(
    <App/>,
    document.getElementById("root")
  );