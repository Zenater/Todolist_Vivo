import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {
    addTaskAC,
    changeStatusAC,
    removeTaskAC,
    deleteTaskAC,
    TasksReducer,
    callbackHandlerAC
} from "./reducers/TasksReducer";
import {addNewTodoAC, changeFilterAC, removeTodolistAC, TodoReducer} from "./reducers/TodoReducer";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, todolistsDispatch] = useReducer(TodoReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, taskDispatch] = useReducer(TasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        taskDispatch(removeTaskAC(id,todolistId))
    }

    function addTask(title: string, todolistId: string) {
        /*  let newTasks = {id: v1(), title: title, isDone: false};
          setTasks({...tasks, [todolistID]: [newTasks, ...tasks[todolistID]]})*/
        taskDispatch(addTaskAC(title,todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        /*        //достанем нужный массив по todolistId:
                let todolistTasks = tasks[todolistId];
                // найдём нужную таску:
                let task = todolistTasks.find(t => t.id === id);
                //изменим таску, если она нашлась
                if (task) {
                    task.isDone = isDone;
                    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                    setTasks({...tasks});
                }*/
        taskDispatch(changeStatusAC(id,isDone,todolistId))

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        // setTudolists(todolists.map(m => m.id === todolistId ? {...m, filter: value} : m))
        todolistsDispatch(changeFilterAC(value, todolistId))
    }

    function removeTodolist(todolistId: string) {
        /*        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
                setTodolists(todolists.filter(tl => tl.id != id));
                // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
                delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
                // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                setTasks({...tasks});*/
        todolistsDispatch(removeTodolistAC(todolistId));
        taskDispatch(deleteTaskAC(todolistId))
    }

    const callbackHandler = (title: string) => {
        /*        let newID = v1();
                setTodolists([{id: newID, title: title, filter: "all"}, ...todolists])
                setTasks({...tasks, [newID]: []})*/
        todolistsDispatch(addNewTodoAC(title))
        taskDispatch(callbackHandlerAC(title))
    }

    const updateTask = (id: string, todolistId: string, title: string) => {
        /*        setTasks({
                    ...tasks, [todolistId]: tasks[todolistId].map(m => m.id === id ? {...m, title: title} : m)
                })*/
    }
    const updateTodolists = (todolistId: string, title: string) => {
        /*
              setTodolists(todolists.map(m=>m.id===todolistId ? {...m, title:title} : m))
        */
    }


    return (
        <div className="App">
            <AddItemForm callback={callbackHandler}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            updateTask={updateTask}
                            updateTodolists={updateTodolists}
                        />)
                })
            }

        </div>
    );
}


