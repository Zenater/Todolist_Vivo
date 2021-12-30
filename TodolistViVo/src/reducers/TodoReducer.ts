
import {v1} from "uuid";
import {FilterValuesType, TasksStateType, TodolistType} from "../App";

let todolistId1 = v1();
let todolistId2 = v1();

let initialState:Array<TodolistType>=([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
])


export const TodoReducer = (state=initialState, action: tsarType) => {
    switch (action.type) {
        case "CHANGE-FILTER-TITLE": {
            let newState = [...state];
            return newState.map(m => m.id === action.payload.todolistId2 ? {...m, title: action.payload.newTodolistTitle} : m)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(f=>f.id!=action.payload.todolistId);
        }
        case "ADD-TODO": {
            let newID = v1();
return [...state,{id: newID, title: action.payload.newTodolistTitle, filter: "all"} ]
        }
        case "CHANGE-TODO-FILTER": {
            let newState = [...state];
return newState.map(m=>m.id===action.payload.todolistId2? {...m, filter: action.payload.filter} : m)
        }
        case "UPDATE-TODO": {
            let newState = [...state];
            return newState.map(m=>m.id===action.payload.todolistId ? {...m, title:action.payload.title} : m)
        }
        default:
            return state
    }
};

type tsarType = changeTodoFilter |changeFilterACType|removeTodolistACType|addNewTodoACType|updateTodolists


type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId2: string,newTodolistTitle:string) => {
    return {
        type: 'CHANGE-FILTER-TITLE',
        payload: {
            todolistId2,
            newTodolistTitle
        }
    } as const
}
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    }as const
}

type addNewTodoACType = ReturnType<typeof addNewTodoAC>
export const addNewTodoAC = (todolistId2: string,newTodolistTitle:string) => {
    return {
        type: 'ADD-TODO',
        payload: {
            todolistId2,
            newTodolistTitle
        }
    }as const
};

type changeTodoFilter = ReturnType<typeof changeTodoFilterAC>
export const changeTodoFilterAC = (todolistId2: string,filter:FilterValuesType) => {
    return {
        type: 'CHANGE-TODO-FILTER',
        payload: {
            todolistId2,
            filter
        }
    }as const
}
type updateTodolists = ReturnType<typeof updateTodolistsAC>
export const updateTodolistsAC = (todolistId: string, title: string) => {
    return {
        type: 'UPDATE-TODO',
        payload: {
            todolistId,
            title
        }
    }as const
}

