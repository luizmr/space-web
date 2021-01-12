import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [validate, setValidate] = useState<boolean>(true);
    const history = useHistory();

    const checkLogin = () => {
        if (email === 'teste@teste.com' && password === '123456') {
            history.push('/home');
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        setError(false);
        const emailValidate = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
        if (emailValidate.test(email) && password.length >= 6) {
            setValidate(false);
        } else {
            setValidate(true);
        }
    }, [email, password]);

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
                    value={email}
                    onChange={({ target }) => {
                        setEmail(target.value);
                    }}
                    placeholder="Email"
                />
                <div>
                    <input
                        className="form-control"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={({ target }) => {
                            setPassword(target.value);
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
