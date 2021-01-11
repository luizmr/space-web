import React from 'react';
import {
    Navbar,
    Nav,
    Button,
    FormControl,
    Form,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { FiCornerDownLeft, FiSearch, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CadastroApps() {
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
            <div className="cadastro-apps">
                <div className="cadastro-apps__header">
                    <h2>Cadastro de Aplicativos</h2>
                    <Link to="/billing">
                        <Button
                            variant="dark"
                            className="cadastro-apps__header-button"
                        >
                            <FiCornerDownLeft />
                        </Button>
                    </Link>
                </div>
                <div className="cadastro-apps__filter">
                    <div className="cadastro-apps__filter-1">
                        <Form inline className="cadastro-apps__filter-search">
                            <FiSearch />
                            <input
                                type="text"
                                placeholder="Procurar ..."
                                className="search-box"
                            />
                        </Form>
                    </div>

                    <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-bottom`}>
                                Nova Aplicação
                            </Tooltip>
                        }
                    >
                        <div className="cadastro-apps__filter-2">
                            <FiPlus />
                        </div>
                    </OverlayTrigger>
                </div>
            </div>
            <div className="footer">Footer</div>
        </>
    );
}
