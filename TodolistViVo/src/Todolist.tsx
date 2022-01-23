import React, {ChangeEvent, useReducer} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    // title: string
    // tasks: Array<TaskType>
    // removeTask: (taskId: string, todolistId: string) => void
    // changeFilter: (value: FilterValuesType, todolistId: string) => void
    // addTask: (title: string, todolistId: string) => void
    // changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    // removeTodolist: (id: string) => void
    // changeTodolistTitle: (id: string, newTitle: string) => void
    // filter: FilterValuesType
    // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists.
    filter(todo => todo.id === props.id)[0])  
    //because need to return OBJECT
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }

    const removeTodolist = () => {
        let action = removeTodolistAC(props.id)
        dispatch(action)
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(props.id,title))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.id,"all"))
    const onActiveClickHandler = () =>    dispatch(changeTodolistFilterAC(props.id,"active"))
    const onCompletedClickHandler = () =>    dispatch(changeTodolistFilterAC(props.id,"completed"))


    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }



    return <div>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id,props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id,newIsDoneValue,props.id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id,newValue,props.id))
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


