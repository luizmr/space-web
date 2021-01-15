import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown, NavbarBrand } from 'react-bootstrap';
import { FaChevronDown, FaUserAlt, FaUserCircle } from 'react-icons/fa';

interface ObjOptions {
    title: string;
    path: string;
}

const Navbar: React.FC = () => {
    const nome = 'Vitor Araújo'; // Nome exemplo
    const [userDrop, setUserDrop] = useState<boolean>(false);

    const options: ObjOptions[] = [
        { title: 'Meus Aplicativos', path: '/meus-aplicativos' },
        { title: 'Vitrine', path: '/vitrine' },
        { title: 'Billing', path: '/billing' },
        { title: 'Ajuda', path: '/ajuda' },
    ];

    return (
        <header>
            <nav className="navbar">
                <div>
                    <NavbarBrand href="/home">
                        <img
                            src="https://i.pinimg.com/originals/88/fa/91/88fa91d09a2a25809a73cada846821ee.png"
                            style={{ width: '5%' }}
                            alt="foguete"
                        />
                        Space
                    </NavbarBrand>
                </div>
                <div className="navbar-links">
                    <ul>
                        {options?.map(({ title, path }) => (
                            <li
                                key={path}
                                className={
                                    title === 'Meus Aplicativos'
                                        ? 'meu-app'
                                        : ''
                                }
                            >
                                <Link to={path}>{title}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="navbar-dropdown">
                        <FaUserAlt />
                        <NavDropdown
                            title={nome}
                            id={
                                userDrop
                                    ? `dropdown-button-drop-up`
                                    : `dropdown-button-drop-down`
                            }
                            drop={userDrop ? 'up' : 'down'}
                            onClick={() => {
                                if (userDrop) {
                                    setUserDrop(false);
                                } else {
                                    setUserDrop(true);
                                }
                            }}
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
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
