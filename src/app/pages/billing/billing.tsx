import React from 'react';
import { Navbar, Nav, Button, FormControl, Form } from 'react-bootstrap';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Billing() {
    const cadastros = [
        { title: 'Aplicações', path: 'billing/cadastro-apps' },
        { title: 'Produtos', path: 'billing/cadastro-produtos' },
        { title: 'Moedas', path: 'billing/cadastro-moedas' },
        { title: 'Módulos/Eventos', path: 'billing/cadastro-modulos' },
        { title: 'Tipos de Taxas', path: 'billing/cadastro-tipos-de-taxas' },
        {
            title: 'Taxas Aplicadas por Aplicação',
            path: 'billing/cadastro-taxas-por-aplicação',
        },
        {
            title: 'Cobrança das Taxas',
            path: 'billing/cadastro-cobranca-taxas',
        },
    ];
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
            <div className="billing">
                <h2>Área de Billing</h2>
                <h4>Cadastros:</h4>
                <div className="billing__cruds">
                    {cadastros.map((el) => (
                        <div>
                            <p>{el.title}</p>
                            <Link to={`${el.path}`}>
                                <FaChevronRight />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer">Footer</div>
        </>
    );
}
