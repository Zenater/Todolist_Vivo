import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {EditableSpan} from "./EditableSpan";

export type TaskLocalType = {
    task: TaskType
    todolistid: string
    removeTask: (taskid: string, todolistid: string) => void
    changeTaskStatus: (taskid: string, newIsDoneValue: boolean, todolistid: string) => void
    changeTaskTitle: (taskid: string, newValue: string, todolistid: string) => void
}

const Task = React.memo(({todolistid, task, removeTask, changeTaskTitle, changeTaskStatus}: TaskLocalType) => {
    console.log('task')

    const onClickHandler = useCallback(() => removeTask(task.id, todolistid), [task.id, removeTask, todolistid])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistid);
    }, [task.id, changeTaskStatus, todolistid])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistid);
    }, [task.id, changeTaskTitle, todolistid])


    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}/>
        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})


export default Task;