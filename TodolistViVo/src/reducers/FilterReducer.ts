import React from 'react';
import {TaskType} from "../Todolist";
import {FilterValuesType} from "../App";

export const FilterReducer = (state: FilterValuesType, action: charType) => {
    switch (action.type) {
        case "CHANGE-FILTER": {
            return action.payload.value
        }
        default:return state
    }

};

type  charType =changeFilterACType

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            value
        }
    } as const
}