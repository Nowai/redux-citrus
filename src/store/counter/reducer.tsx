import { Reducer } from 'redux';
import { counterState, counterActions } from './types';

const initialState: counterState = {
    counter: 0
}

const reducer: Reducer<counterState> = (state = initialState, action) => {
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

export { reducer as counterReducer }