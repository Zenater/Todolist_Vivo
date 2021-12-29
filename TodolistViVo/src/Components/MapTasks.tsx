import React, {ChangeEvent} from 'react';
import {TaskType} from "../Todolist";

type MapType = {
    tasks: Array<TaskType>
    removeTask: (todolistID:string,taskId: string) => void
    todolistID: string
    changeTaskStatus: (todolistID:string,taskId: string, isDone: boolean) => void

}

 const MapTasks = ({tasks,removeTask,todolistID,changeTaskStatus,...props}: MapType) => {


    return (
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(todolistID,t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistID,t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
    );
};

export default MapTasks;