import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {AddBox} from '@material-ui/icons';
import {TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
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
            addItem();
        }
    }

    return <div>
        <TextField value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   variant={'outlined'}
                   size={'small'}
                   label={'Title'}
                   error={!!error}
                   helperText={error && 'title mistake'}
        />
        <IconButton onClick={addItem} style={{maxWidth: '40px',maxHeight: '40px',minWidth:'40px'}}>
            <AddBox/>
        </IconButton>

    </div>
}
