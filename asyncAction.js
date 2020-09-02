const redux = require('redux')
const createStore = redux.createStore // redux library provides method createStore

const applyMyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}


const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
/**This is action function */
const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}
/**This is action function */
const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}
/**This is action function */
const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        error_payload: error
    }
}
/**Creting the reducer() function */
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,// This spread operator we are using to copy the existing object(other properties in the object will remain same)
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                laoding: false,
                users: action.payload,
                error: ''
            }

        case FETCH_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.error_payload
            }
    }
}

/**This is an Action creator : This returns an Action, 
  But the 'redux-thunk' middleware bring is the ability of an Action creator to return an function instead of object.  */
const featUsers = () => {
    /**In this functions we can  do async calls and dispatch actions 
    Using this dispatch function we are enabling loading icon*/
    return function (dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const users = response.data.map(val => val.id) // We are just going to display ID
                dispatch(fetchUserSuccess(users))
            }).
            catch(error => {
                dispatch(fetchUserFailure(error.message))
            })

    }
}


const store = createStore(myReducer, applyMyMiddleware(thunkMiddleware))
 
// Subscribe to the store and print the what store is holding the data
store.subscribe(() => {
    console.log(store.getState())
})

// Here we are dispatching the store to fetch data and store in Redux Store
store.dispatch(featUsers)
