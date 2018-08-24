import { combineReducers, Dispatch, Reducer, Action, AnyAction} from 'redux';

import {citrusReducers} from '../Citrus/citrusReducers';

import { counterReducer } from './counter/reducer';

export const rootReducer = citrusReducers({
    counter: counterReducer,
    counter2: counterReducer
});