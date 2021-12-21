import React, {useState} from 'react';

type propsSpan = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = (props: propsSpan) => {
    const [edit, setEdit] = useState(false)
    let [newtitle, setNewTitle] = useState(props.title)


    const editTrue = () => {
        setEdit(true)
    }
    const editFalse = () => {
        setEdit(false)
        props.callBack(newtitle)
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

