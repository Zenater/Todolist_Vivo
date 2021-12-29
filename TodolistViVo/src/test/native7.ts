import {TasksStateType} from "../App";

export function mul(state: number,num:number) {
    return state*num
}export function sum(state: number,num:number) {
    return state+num
}export function sub(state: number,num:number) {
    return state-num
}export function del(state: number,num:number) {
    return state/num
}

export const saloreReducer = (state: number, action: ActionType): number => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newState = {...state};
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id != action.payload.id)
            }
        }
