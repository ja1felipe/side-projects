import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login/index'
import Register from './pages/Register/index'
import New from './pages/New'
import Dashboard from './pages/Dashboard'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/dashboard/new" component={New}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
            </Switch>
        </BrowserRouter>
    )
}