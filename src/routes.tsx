import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Home from './app/components/home'
import Exemplo from './app/components/exemplo'

interface RouteInterface {
    key: string;
    path: string;
    Component: any;
}

const CustomRoute = ({key, Component, path} : RouteInterface)  => {
    return (
        <Route 
            exact={true}
            key={key}
            path={path}
            component={Component}
        />
    )
}

const routes = [
    {
        key: 'home',
        Component: Home,
        path: '/home'
    },
    {
        key: 'exemplo',
        Component: Exemplo,
        path: '/'
    }
]

export const Routes = () => {
    return (
        <Router>
            <Switch>
                {routes.map((route, i) => {
                    return CustomRoute({...route})
                })}
            </Switch>
        </Router>
    )
}
