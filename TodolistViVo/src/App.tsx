import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {addTaskAC, changeStatusAC, removeTaskAC} from "./reducers/TasksReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
function App() {

    let dispatch = useDispatch();
    let tasks= useSelector <rootReducerType,Array<TaskType>>(state => state.tasks )
    // let filter= useSelector <rootReducerType,FilterValuesType>(state => state.filter )

    function removeTask(id: string, todolistId: string) {
/*        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*/
        dispatch(removeTaskAC(id,todolistId))
    }

    function addTask(title: string, todolistId: string) {
/*        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);*/
        dispatch(addTaskAC(title,todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
/*        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);*/
        dispatch(changeStatusAC(id,isDone,todolistId))
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
            />
        </div>
    );
}

export default App;
