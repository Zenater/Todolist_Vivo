import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

type New = {

    addTasksHandler: ()=>void
}
export const NewButton = (props: New) => {

 const onClickHandler = () =>{
     props.addTasksHandler()
 }


    return (
        <div>
            <button onClick={onClickHandler}>+</button>

        </div>
    )

}