// import { redux } from 'redux'

const redux = require('redux') // Just use require syntax to import `redux` library for now.
const createStore = redux.createStore // redux library provides method createStore


const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// /** Define an action object that has type  */
const actionObj_Cakes = {
    type: BUY_CAKE,
    info: 'First Redux function with Multiple reducer'
}

const actionObj_IceCreams = {
    type: BUY_ICECREAM,
    info: 'Second Redux function with Multiple reducer'
}


/**This is action function */
function buyCake() {
    return actionObj_Cakes;
}
function buyIceCreams() {
    return actionObj_IceCreams;
}

/** We creating default/initial state object which we can pass this as a state paramenter to reducer() function */
const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
}

/**Creting the reducer() function */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,// This spread operator we are using to copy the existing object(other properties in the object will remain same)
                numOfCakes: state.numOfCakes - 1
            }
        case BUY_ICECREAM:
            return {
                ...state,// This spread operator we are using to copy the existing object(other properties in the object will remain same)
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state;
    }
}
//It is responsible to Holds application state
const store = createStore(reducer) // createStore method accepts the 'reducer()' function as a paramert
//It allows access to state via `getState()`
console.log('Initial State ', store.getState())
//It will register listeners via `subscribe(listener)`
const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()))
//It allows state to be updated via `dispatch(action)`
store.dispatch(buyCake())
store.dispatch(buyCake())// To cause state transistion we are just calling same dispatch function 
store.dispatch(buyCake())
store.dispatch(buyIceCreams())
store.dispatch(buyIceCreams())

//We can even `unregisterting/unsubscribing of listeners` via the function returned by `subscribe(listener)`
unsubscribe();

