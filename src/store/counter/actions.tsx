import { counterActions } from './types';
import { Action } from 'redux';

export const increment = (value = 1) => {
    return {
        type: counterActions.INCREMENT,
        value
    }
}

export const decrement = (value = 1) => {
    return {
        type: counterActions.DECREMENT,
        value
    }
}

export const asyncIncrement = (value = 1, delay = 500) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment(value))
        }, delay);
    }
}

export const asyncDecrement = (value = 1, delay = 500) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(decrement(value))
        }, delay);
    }
}