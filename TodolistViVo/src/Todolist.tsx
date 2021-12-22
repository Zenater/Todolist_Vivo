import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {ButtonGroup, Button, IconButton, ListItem, Typography, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const getBtnColor = (filter: FilterValuesType) => props.filter === filter ? "secondary" : "primary";


    return <div>
        <Typography
            variant={'h6'}
            align={'center'}
            style={{fontWeight: 'bold'}}
        >
            <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return <ListItem key={t.id} className={t.isDone ? "is-done" : ""}>

                        <Checkbox color={'primary'} onChange={onChangeHandler} checked={t.isDone} size={'small'}/>

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton size={'small'} onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </ListItem>
                })
            }
        </ul>
        <div>
            <ButtonGroup disableElevation
                         variant="contained"
                         size={'small'}
                         fullWidth
            >
                <Button color={getBtnColor('all')}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={getBtnColor('active')}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={getBtnColor('completed')}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </ButtonGroup>
        </div>
    </div>
}


