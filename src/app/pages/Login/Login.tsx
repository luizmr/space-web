import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { User } from '../../models/Login';

function Login() {
    const [user, setUser] = useState<User>({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [validate, setValidate] = useState<boolean>(true);
    const history = useHistory();

    const checkLogin = () => {
        if (user.email === 'teste@teste.com' && user.password === '123456') {
            history.push('/home');
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        setError(false);
        const emailValidate = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
        if (emailValidate.test(user.email) && user.password.length >= 6) {
            setValidate(false);
        } else {
            setValidate(true);
        }
    }, [user.email, user.password]);

    return (
        <div className="login-container">
            <div className="image-container">
                <img
                    src="https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2018/11/Como-Criar-um-Site.png"
                    draggable="false"
                    style={{
                        width: '80%',
                        height: '80%',
                    }}
                    alt="imagem"
                />
            </div>
            <div className="inputs-container">
                <input
                    className="form-control"
                    type="email"
                    value={user.email}
                    onChange={({ target }) => {
                        setUser({ ...user, email: target.value });
                    }}
                    placeholder="Email"
                />
                <div>
                    <input
                        className="form-control"
                        type={showPassword ? 'text' : 'password'}
                        value={user.password}
                        onChange={({ target }) => {
                            setUser({ ...user, password: target.value });
                        }}
                        placeholder="Senha"
                    />
                    {showPassword ? (
                        <button
                            type="button"
                            onClick={() => {
                                setShowPassword(false);
                            }}
                        >
                            <FaEye />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                setShowPassword(true);
                            }}
                        >
                            <FaEyeSlash />
                        </button>
                    )}
                </div>

                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={checkLogin}
                    disabled={validate}
                >
                    Login
                </button>
                {error && <span>E-mail ou senha inválidos</span>}
            </div>
        </div>
    );
}

export default Login;
