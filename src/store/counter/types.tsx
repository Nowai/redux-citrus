export const enum counterActions {
    INCREMENT = '@@counter/INCREMENT',
    DECREMENT = '@@counter/DECREMENT',
}

export interface counterState {
    readonly counter: number
}