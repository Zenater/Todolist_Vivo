import {AppActionType, setAppErrorAC, setAppStatusAC} from "../app/appReducer";
import {Dispatch} from "redux";

export const handleServerNetworkError = (dispatch: Dispatch<AppActionType>,message: string)=> {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('succeeded'))
}
export const handleServerAppError =<T> (dispatch: Dispatch<AppActionType>,data: any)=> {
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : 'Some error'))
    dispatch(setAppStatusAC('succeeded'))
}