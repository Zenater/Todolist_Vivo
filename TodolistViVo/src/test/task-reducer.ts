import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionType =
    | RemoveTaskACType
    | ChangeTaskTitleACType
    | AddTaskACType
    | ChangeTaskStatusACType

export type RemoveTaskACType = {
    type: 'REMOVE-TASK',
    id: string,
    todolistId: string
}
export type AddTaskACType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    isDone: boolean,
    todolistId: string
}
export type ChangeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE'
    id: string,
    title: string,
    todolistId: string
}
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST',
//     title: string
// }


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.id)}
        }
        case "ADD-TASK": {
            let newtask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [newtask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(m => m.id === action.id ? {
                    ...m, isDone: action.isDone
                } : m)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(m => m.id === action.id ?
                    {...m, title: action.title} : m)
            }
        }
        default:
            return state
        }
    }

    export const removeTaskAC = (id: string, todolistId: string): RemoveTaskACType => {
        return {
            type: 'REMOVE-TASK', id, todolistId
        } as const
    }

    export const addTaskAC = (title: string, todolistId: string): AddTaskACType => {
        return {
            type: 'ADD-TASK', title, todolistId
        } as const
    }

    export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusACType => {
        return {
            type: 'CHANGE-TASK-STATUS', id, isDone, todolistId
        } as const
    }
    export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleACType => {
        return {
            type: 'CHANGE-TASK-TITLE', id, title, todolistId
        } as const
    }
    // export const AddTodolistAC = (title: string): AddTodolistActionType => {
    //     return {type: 'ADD-TODOLIST', title: title}
    // }



