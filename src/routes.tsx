import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './app/pages/Home/Home';
import Login from './app/pages/Login/Login';

interface RouteInterface {
    key: string;
    path: string;
    Component: any;
}

const CustomRoute = ({ key, Component, path }: RouteInterface) => {
    return <Route exact={true} key={key} path={path} component={Component} />;
};

const routes = [
    {
        key: 'login',
        Component: Login,
        path: '/login',
    },
    {
        key: 'home',
        Component: Home,
        path: '/home',
    },
];

export const Routes = () => {
    return (
        <Router>
            <Switch>
                {routes.map((route, i) => {
                    return CustomRoute({ ...route });
                })}
            </Switch>
        </Router>
    );
};
