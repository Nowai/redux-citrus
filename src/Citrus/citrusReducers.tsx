/*
Creates a rootReducer based on an configuration object
*/
export const citrusReducers: any = (reducers) => {
   return (state, action) => {
       if(state === undefined) {
           return initializeState(reducers, state, action);
       }
       else if('__citrus_location' in action && action.__citrus_location in reducers) {
           return handleReducing(reducers, state, action);
       }
       else 
           return state;
   }
}

/*
we call all reducers with undefined state and in return get the initial state from all reducers
*/
const initializeState = (reducers, state, action) => {
    return Object.keys(reducers)
        .map((key) => { 
            return {[key]: mergeWithCitrus(reducers[key](state, action), key)}})
        .reduce((acc, cur) => Object.assign({}, acc, cur));
}

/*
Calculates the new state by calling the specific reducer based on the location parameter
*/
const handleReducing = (reducers, state, action) => {
    let {__citrus_location, ...reducedAction} = action;
    return Object.assign({}, state, {
        [action.__citrus_location]: mergeWithCitrus(Object.assign({},
            reducers[action.__citrus_location](state[action.__citrus_location], reducedAction)),action.__citrus_location)
    })
}

/*
We inject the withCitrus function into the object that allows to create slice specific actions
*/
const mergeWithCitrus = (obj, location) => {
    return Object.assign({}, obj, {
        withCitrus: (action) => { return withCitrus(action, location)}
    });
}

/*
Either inject the location parameter into the action, 
or creates a secondary action thunk for async-actions
*/
export const withCitrus: any = (action, location) => {
    if(typeof action === 'function') {
        return (dispatch, getState) => {
            const citrusDispatch = (action) => dispatch(withCitrus(action, location));
            action(citrusDispatch, getState);
        }
    }
    else if(typeof action === 'object') {
        return Object.assign({}, action, {
            __citrus_location: location
        });
    }
    return action;
}
