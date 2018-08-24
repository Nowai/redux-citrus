# ![](https://github.com/Nowai/redux-citrus/blob/master/logo.svg) redux-citrus 

<p>
    <a href="https://github.com/Nowai/redux-citrus/blob/master/LICENSE">
       <img src="https://img.shields.io/badge/license-MIT-blue.svg"> 
    </a>
    <a href="https://github.com/Nowai/redux-citrus/tree/master/build">
        <img src="https://img.shields.io/badge/build-passing-green.svg"> 
    </a>
    <a href="">
        <img src="https://img.shields.io/badge/version-1.0.3-lightgrey.svg"> 
    </a>
</p>

### Redux middleware to enable reusable redux components

Redux default reducers don't allow for easy re-usable redux components. 
Redux-Citrus provides a new combineReducer function `citrusReducers` that takes a reducer-configuration object and returns a rootReducer. 

## Usage

Let's say multiple modules in our state require similar functionality. Normally, actions and reducers are location agnostic. To re-use redux components we require additional information in our reducers to select the appropriate slice. Redux-citrus makes it easy to have actions and reducers that work on multiple slices of the state. 

In the following we work with a simple action/reducer example
```Javascript
export const increment = (value = 1) => {
    return {
        type: counterActions.INCREMENT,
        value
    }
}

// async-action using redux-thunk
export const asyncIncrement = (value = 1, delay = 500) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment(value))
        }, delay);
    }
}

const initialState: counterState = {
    counter: 0
}

const counterReducer: Reducer<counterState> = (state = initialState, action) => {
    switch(action.type) {
        case counterActions.INCREMENT: {
            return { counter: (state.counter)+action.value}
        }
        case counterActions.DECREMENT: {
            return {counter: (state.counter)-action.value}
        }
        default: {
            return state;
        }
    }
}
```

Furthermore, our state contains multiple modules that want to use the counter functionality

```Javascript
const reducers = {
    clickCounter: counterReducer,
    objectCounter: counterReducer
}
```

To create our rootReducer that can work on slices we use the `citrusReducers` function

```Javascript
import { citrusReducers } from 'redux-citrus';
const rootReducer = citrusReducers(reducers);
```

Citrus-Redux now provides our state a wrapper function to specify which slice we want to target with our actions

```Javascript
import { increment, asyncIncrement } from ...
const { clickCounter, objectCounter } = store.getState();

// works with normal actions
store.dispatch(clickCounter.withCitrus(increment(5)));
store.dispatch(clickCounter.withCitrus(increment()));
// and async-actions (using redux-thunk)
store.dispatch(objectCounter.withCitrus(asyncIncrement(100, 1000)));
```

This works, because citrusReducers always inject the `withCitrus` function that takes either an `action` or an `async-action` (redux-thunk) and wraps it in its own logic to handle the location. This is done by injecting an location property into actions. 

For a running example check out `src/index.tsx`

## Build

Clone this repository and run `npm install`. For the development build run `npm run dev`, it will create a development server listening on port 8080. For the minified production build run `npm run build`. 

## License

MIT - Copyright 2018 Florian Marienwald