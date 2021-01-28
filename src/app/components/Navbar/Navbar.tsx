import React, { useState } from 'react';
import { NavDropdown, NavbarBrand, Navbar as Navs, Nav } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';

interface ObjOptions {
    title: string;
    path: string;
}

const Navbar: React.FC = () => {
    const nome = 'Vitor Araújo'; // Nome exemplo
    const [userDrop, setUserDrop] = useState<boolean>(false);

    const user = localStorage.user;

    const options: ObjOptions[] =
        user !== 'admin'
            ? [
                  {
                      title: 'Meus Aplicativos',
                      path: '/meus-aplicativos',
                  },
                  {
                      title: 'Vitrine',
                      path: '/vitrine',
                  },
                  {
                      title: 'Ajuda',
                      path: '/ajuda',
                  },
              ]
            : [
                  {
                      title: 'Cadastrar',
                      path: '/billing',
                  },
                  {
                      title: 'Meus Produtos',
                      path: '/billing',
                  },
                  {
                      title: 'Regras de Cobranças',
                      path: '/billing',
                  },
                  {
                      title: 'Ajuda',
                      path: '/ajuda',
                  },
              ];

    return (
        <header>
            <Navs
                collapseOnSelect
                expand="md"
                variant="light"
                className="navbar"
            >
                <NavbarBrand href="/home">
                    <img
                        src="https://i.pinimg.com/originals/88/fa/91/88fa91d09a2a25809a73cada846821ee.png"
                        style={{ width: '50px' }}
                        alt="foguete"
                    />
                    Space
                </NavbarBrand>
                <Navs.Toggle
                    aria-controls="responsive-navbar-nav"
                    className="btn-toogle"
                />
                <Navs.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav className="navbar-links">
                        {options?.map(({ title, path }) => (
                            <Nav.Link
                                key={path}
                                href={path}
                                className={
                                    title === 'Meus Aplicativos'
                                        ? 'meu-app'
                                        : ''
                                }
                            >
                                {title}
                            </Nav.Link>
                        ))}
                        <div className="navbar-dropdown">
                            <FaUserAlt />
                            <NavDropdown
                                title={nome}
                                id={
                                    userDrop
                                        ? `dropdown-button-drop-down`
                                        : `dropdown-button-drop-up`
                                }
                                drop={'down'}
                                // drop={userDrop ? 'down' : 'up'}
                                // onClick={() => {
                                //     if (userDrop) {
                                //         setUserDrop(false);
                                //     } else {
                                //         setUserDrop(true);
                                //     }
                                // }}
                            >
                                <NavDropdown.Item href="/minha-conta">
                                    Minha conta
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/Admin">
                                    Admin. parceiro
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/login">
                                    Sair
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Nav>
                </Navs.Collapse>
            </Navs>
        </header>
    );
};

export default Navbar;
