import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Navbar from '../components/Navbar';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const history = useHistory();

    const validate = () => {
        if (email === 'teste@teste.com' && password === '123456') {
            history.push('/home');
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        setError(false);
    }, [email, password]);

    return (
        <div className="login-container">
            <div className="image-container">
                <img
                    src="https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2018/11/Como-Criar-um-Site.png"
                    style={{ width: '80%', margin: '-30px 0 0 0' }}
                    alt="imagem"
                />
            </div>
            <div className="inputs-container">
                <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={({ target }) => {
                        setEmail(target.value);
                    }}
                    placeholder="Email"
                />
                <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={({ target }) => {
                        setPassword(target.value);
                    }}
                    placeholder="Senha"
                />
                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={validate}
                >
                    Login
                </button>
                {error && <span>E-mail ou senha inválidos</span>}
            </div>
        </div>
    );
}

export default Login;
