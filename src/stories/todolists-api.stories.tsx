import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7bb2e83b-e2d3-4826-936e-3aa87ef57425'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
todolistApi.getTodo()
    .then((res) => {
        setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = '1144545'
        todolistApi.createTodo(title)
            .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '50be1173-af26-4554-bdd9-384d2ea9ee6e'
        todolistApi.deleteTodo(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '827d5d24-df33-4c0d-82a3-d472b3d8acb7'
        const title = 'react'
        todolistApi.updateTodolistsTitle(todolistId,title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
