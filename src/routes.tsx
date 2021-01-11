import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Billing from './app/pages/billing/billing';
import CadastroApps from './app/pages/cadastro-apps/cadastro-apps';

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
        key: 'billing',
        Component: Billing,
        path: '/billing',
    },
    {
        key: 'cadastro-apps',
        Component: CadastroApps,
        path: '/billing/cadastro-apps',
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
