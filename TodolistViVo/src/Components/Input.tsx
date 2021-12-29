import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type Inputtype = {
    title: string
    setTitle: ( title: string)=>void
    addTask: (title: string) => void
    addTasksHandler:()=>void
}

export const Input = (props: Inputtype) => {


    const addSetHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter')
           props.addTasksHandler()
    }


    return (
        <div>
            <input value={props.title} onChange={addSetHandler} onKeyPress={onKeyPressHandler}/>
        </div>
    )
}