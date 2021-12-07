import React, {useState} from 'react';

type ButType = {
    name:string
    callBack: ()=>void
}

export const Button =(props: ButType) => {

    const onClickHandler=()=> {
        props.callBack()
    }


    return (
        <div>
              <button onClick={onClickHandler}>{props.name}</button>
        </div>
    )
}
