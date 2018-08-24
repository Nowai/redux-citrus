import  * as React from 'react';
import {render} from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// components
import App from './components/App';

import {rootReducer } from './store/index';

import { increment, decrement, asyncIncrement, asyncDecrement } from './store/counter/actions';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));
const state:any = store.getState();
store.dispatch(state.counter.withCitrus(increment(2)));
store.dispatch(state.counter.withCitrus(asyncIncrement(3)));
store.dispatch(state.counter.withCitrus(increment()));

// styles
require('./styles/app.scss');

render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('app')
);
