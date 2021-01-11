import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <header>
            <nav className="navbar">
                <div>
                    <img
                        src="https://i.pinimg.com/originals/88/fa/91/88fa91d09a2a25809a73cada846821ee.png"
                        style={{ width: '5%' }}
                        alt="foguete"
                    />
                    <span>Space</span>
                </div>
                <div className="navbar-links">
                    {/* <ul>
                        <li>
                            <Link to="/meus-aplicativos">Meus aplicativos</Link>
                        </li>
                        <li>
                            <Link to="/vitrine">Vitrine</Link>
                        </li>
                        <li>
                            <Link to="/Ajuda">Ajuda</Link>
                        </li>
                        <li>
                            <Link to="/minha-conta">Minha conta</Link>
                        </li>
                    </ul> */}
                    <Link to="/meus-aplicativos">Meus aplicativos</Link>
                    <Link to="/vitrine">Vitrine</Link>
                    <Link to="/Ajuda">Ajuda</Link>
                    <Link to="/minha-conta">Minha conta</Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
