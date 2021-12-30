import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {rootReducerType} from "../store/store";
import {FilterValuesType} from "../App";
import {TaskType} from "../Todolist";

type propsSpan = {
    title: string
    callBack: (todolistId: string,title:string) => void
}

export const EditableSpan = (props: propsSpan) => {
    let todo = useSelector<rootReducerType, Array<TaskType>>(state => state.todo)



    const [edit, setEdit] = useState(false)
    let [newtitle, setNewTitle] = useState(props.title)


    const editTrue = () => {
        setEdit(true)
    }

    const editFalse = () => {
        setEdit(false)
        props.callBack(props.title,newtitle)
    }

    const onchangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return (
        edit ?
            <input value={newtitle}
                   onBlur={editFalse}
                   onChange={onchangeInput}
                   autoFocus/>
            : <span onDoubleClick={editTrue}>{props.title}</span>
    );
}

