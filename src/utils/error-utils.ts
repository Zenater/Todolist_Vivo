import {ResponseType} from '../api/todolists-api'
import {Dispatch} from 'redux'
import {AppActionType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = (dispatch: Dispatch<AppActionType>,message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}
