import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (Curid: string, value: boolean )=> void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError]=useState(false)

    const addTask = () => {
        if(title.trim()) {
        props.addTask(title.trim());
        setTitle("");
        } else {
            setTitle("")
            setError(true)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const OnC= (Curid: string,event: React.ChangeEvent<HTMLInputElement>)=> {
        props.changeStatus(Curid, event.currentTarget.checked)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   className={error? s.error: ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={error ? s.errorMessage : ""}>Warning</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}
                        onChange={(event)=>OnC(t.id, event)}
                        />
                        <span className={t.isDone? s.isDone : ''}>{t.title}</span>
                        <button  onClick={ onClickHandler }>x</button>

                    </li>

                })
            }
        </ul>
        <div>
            <button className={ props.filter==='all' ? s.activeFilter : ''} onClick={ onAllClickHandler }>All</button>
            <button className={ props.filter==='active' ? s.activeFilter : ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={ props.filter==='completed' ? s.activeFilter : ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
