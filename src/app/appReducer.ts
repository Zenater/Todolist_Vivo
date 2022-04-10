export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//status===loading - see
//status===| 'succeeded' | 'failed''idle' | no see

export type NullableType <T> =null | T

const initialState = {
    status: 'loading' as RequestStatusType,
    error: 'error' as NullableType<string>
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType)=> {
    return {
        type: 'APP/SET-STATUS', status
    } as const
}
export const setAppErrorAC = (error: NullableType<string>)=> {
    return {
        type: 'APP/SET-ERROR', error
    } as const
}

export type AppActionType = ReturnType<typeof setAppStatusAC> |  ReturnType<typeof setAppErrorAC>