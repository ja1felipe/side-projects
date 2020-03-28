import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login/index'
import Register from './pages/Register/index'
import CreateSpot from './pages/Spot/Create'
import UpdateSpot from './pages/Spot/Update'
import Dashboard from './pages/Dashboard'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/dashboard/create" component={CreateSpot}></Route>
                <Route path="/dashboard/update" component={UpdateSpot}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
            </Switch>
        </BrowserRouter>
    )
}