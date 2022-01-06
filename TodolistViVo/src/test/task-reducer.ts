import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionType = removeTaskACType | addTaskACType | changeTaskStatusACType

export type removeTaskACType = {
    type: 'REMOVE-TASK',
    id: string,
    todolistId: string
}
export type addTaskACType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type changeTaskStatusACType = {
    type: 'CHANGE-TASK',
    id: string,
    isDone: boolean,
    todolistId: string
}


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.id)}
        }
        case "ADD-TASK": {
            let newtask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [newtask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].map(m => m.id === action.todolistId ? {
                    ...m, isDone: action.isDone} : m)}
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string, todolistId: string): removeTaskACType => {
    return {type: 'REMOVE-TASK', id, todolistId
    } as const
}

export const addTaskAC = (title: string, todolistId: string): addTaskACType => {
    return {type: 'ADD-TASK', title, todolistId
    } as const
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK', id, isDone, todolistId
    } as const
}



