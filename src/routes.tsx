import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Billing from './app/pages/billing/billing';
import CadastroApps from './app/pages/cadastro-apps/cadastro-apps';
import FormNovoApp from './app/pages/form-novo-app/form-novo-app';
import Login from './app/pages/Login/Login';
import VitrineApp from './app/pages/vitrine-app/vitrine-app';
import Home from './app/pages/home/home';
import CadastroModulos from './app/pages/cadastro-modulos/cadastro-modulos';
import ConsultaRegras from './app/pages/consulta-regras/consulta-regras';
import CadastroRegras from './app/pages/cadastro-regras/cadastro-regras';

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
        key: 'home',
        Component: Home,
        path: '/home',
    },
    {
        key: 'billing',
        Component: Billing,
        path: '/billing',
    },
    {
        key: 'consulta-regras',
        Component: ConsultaRegras,
        path: '/billing/consulta-regras',
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
    {
        key: 'cadastro-modulos',
        Component: CadastroModulos,
        path: '/billing/cadastro-modulos',
    },
    {
        key: 'cadastro-regras',
        Component: CadastroRegras,
        path: '/billing/cadastro-regras',
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
