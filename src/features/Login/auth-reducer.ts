import {Dispatch} from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLogin: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return {isLogin: false}
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return {isLogin: false}

    }

})
const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLogin
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
