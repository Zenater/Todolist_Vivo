import {TasksStateType} from "../App";
import {v1} from "uuid";

export const TasksReducer = (state: TasksStateType, action: tsarType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newState = {...state};
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id != action.payload.id)
            }
        }
        case "ADD-TASK": {
            let newTasks = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [newTasks, ...state[action.payload.todolistId]]}
        }
        case "CHANGE-STATUS": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.id ? {...m, isDone: action.payload.isDone} : m)
            }
        }
        case "REMOVE-TODOLIS-TASK": {
            return delete state[action.payload.todolistId]
        }
        case "CALL-BACK": {
            let newID = v1();
            return {...state,[newID]:[]}
            }
        default:
            return state
    }
};

type tsarType = removeTaskACType| callbackHandlerACType | addTaskACType | changeStatusACType | removeTodolistACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id,
            todolistId: todolistId
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            todolistId: todolistId
        }
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            id: id,
            isDone: isDone,
            todolistId: todolistId
        }
    } as const
}

type removeTodolistACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIS-TASK',
        payload: {
            todolistId
        }
    } as const
}

type callbackHandlerACType = ReturnType<typeof callbackHandlerAC>
export const callbackHandlerAC = (title: string) => {
    return {
        type: 'CALL-BACK',
        payload: {
            title
        }
    } as const
}





