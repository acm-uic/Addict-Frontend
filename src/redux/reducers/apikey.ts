import { AnyAction } from "redux";

export interface apiReducerState {
    loggedIn: boolean
    key: string
    server: string
    user: string
}

export default function apikeyReducer(state: apiReducerState = {loggedIn: false, key: "", server: "", user: ""}, action: AnyAction) {
    switch (action.type){
        case 'UPDATE_SERVER':
            return {...state, server: action.payload}
        case 'UPDATE_KEY':
            return {...state, loggedIn: true, key: action.payload};
        case 'UPDATE_USER':
            return {...state, user: action.payload}
        default:
            return state
    }
}