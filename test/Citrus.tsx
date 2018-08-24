import { citrusReducers, withCitrus } from '../src/Citrus/citrusReducers';

import { expect } from 'chai';
import 'mocha';

import { counterReducer } from '../src/store/counter/reducer';
import { increment, decrement, asyncIncrement, asyncDecrement } from '../src/store/counter/actions';

const reducers = {
    counter1 : counterReducer,
    counter2 : counterReducer, 
    __asdf : counterReducer
};

describe('redux-citrus tests', () => {
    it('should create root reducer', () => {
        // lets see if citrusReducers properly creates the rootReducer function
        const rootReducer = citrusReducers(reducers);
        expect(rootReducer).to.be.a('function');
    });
    it('should handle state initialization', () => {
        // lets see if we get expected initial values from the rootReducer
        const rootReducer = citrusReducers(reducers);
        const result1 = rootReducer(undefined, {type:''});
        expect(result1).to.have.ownProperty('counter1');
        expect(result1.counter1.withCitrus).to.be.a('function');
        const result2 = rootReducer(undefined, {type:''});
        expect(result2).to.have.ownProperty('counter2');
        expect(result2.counter2.withCitrus).to.be.a('function');
        const result3 = rootReducer(undefined, {type:''});
        expect(result3).to.have.ownProperty('__asdf');
        expect(result3.__asdf.withCitrus).to.be.a('function');
    });
    it('should handle actions', () => {
        // lets see if actions are handled properly and the right slice is updated
        const rootReducer = citrusReducers(reducers);
        const result1 = rootReducer(undefined, withCitrus(increment(),'counter1'));
        expect(result1.counter1.counter).to.be.equal(1);
        const result2 = rootReducer(undefined, withCitrus(increment(5),'counter2'));
        expect(result2.counter2.counter).to.be.equal(5);
        const result3 = rootReducer(undefined, withCitrus(decrement(3),'__asdf'));
        expect(result3.__asdf.counter).to.be.equal(-3);
    });
    it('should handle async actions (redux-thunk)', (done) => {
        // lets see if async functions are properly handled
        const rootReducer = citrusReducers(reducers);
        const state = rootReducer(undefined, {type:''});
        const asyncAction = state.counter1.withCitrus(asyncIncrement(5));
        expect(asyncAction).to.be.a('function');
        const result = asyncAction((action) => {
            expect(action).to.be.an('object');
            expect(action).to.have.ownProperty('type');
            expect(action).to.have.ownProperty('__citrus_location');
            done();
        })
    });
});