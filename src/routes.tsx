import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Billing from './app/pages/billing/billing';
import CadastroApps from './app/pages/cadastro-apps/cadastro-apps';
import FormNovoApp from './app/pages/form-novo-app/form-novo-app';
import Login from './app/pages/Login/Login';
import VitrineApp from './app/pages/vitrine-app/vitrine-app';

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
    {
        key: 'novo-app',
        Component: FormNovoApp,
        path: '/billing/cadastro-apps/novo-app',
    },
    {
        key: 'login',
        Component: Login,
        path: '/login',
    },
    {
        key: 'editar-app',
        Component: FormNovoApp,
        path: '/billing/cadastro-apps/editar-app/:id',
    },
    {
        key: 'vitrine-app',
        Component: VitrineApp,
        path: '/vitrine-app/:id',
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
