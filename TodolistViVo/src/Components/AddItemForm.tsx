import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../store/store";
import {TaskType} from "../Todolist";

type PropsInput = {
    callback: (title:string)=>void

}

export const AddItemForm = (props:PropsInput) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    let dispatch = useDispatch();
    let tasksState= useSelector <rootReducerType,Array<TaskType>>(state => state.tasks )

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callback(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       // className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

