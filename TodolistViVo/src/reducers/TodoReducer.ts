import React from 'react';
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {FilterValuesType, TasksStateType, TodolistType} from "../App";

export const TodoReducer = (state: Array<TodolistType>, action: tsarType) => {
    switch (action.type) {
        case "CHANGE-FILTER": {
            let newState = [...state];
            return newState.map(m => m.id === action.payload.todolistId ? {...m, filter: action.payload.value} : m)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(f=>f.id!=action.payload.todolistId);
        }
        case "ADD-TODO": {
            let newID = v1();
return [{id: newID, title: action.payload.title, filter: "all"}, ...state]
        }
        default:
            return state
    }
};

type tsarType = changeFilterACType|removeTodolistACType|addNewTodoACType


type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            value,
            todolistId
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
export const addNewTodoAC = (title: string) => {
    return {
        type: 'ADD-TODO',
        payload: {
            title
        }
    }as const
}

