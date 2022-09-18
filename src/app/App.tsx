import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType, useAppSelector} from './store'
import {initializeAppTC} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {logoutTC} from "../features/Login/auth-reducer";

function App() {
    const dispatch = useDispatch()
    const status=useAppSelector(state=>state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn=useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
            dispatch( initializeAppTC());
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    const logoutHandler = () => {
        dispatch(logoutTC())
    };

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    {/*<Typography variant="h6">*/}
                    {/*    News*/}
                    {/*</Typography>*/}
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/' element={<TodolistsList/>}/>
                    <Route path='*' element={<Navigate to='/404'/>}/>
                    <Route path='/404' element={<h1 style={{textAlign:'center'}}>404 not found</h1>}/>
                </Routes>
            </Container>
        </div>
    )
}
export default App
