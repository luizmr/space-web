import React from 'react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { User } from '../../models/Login';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    IconButton,
    OutlinedInput,
    Button,
} from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons/';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { mockLogin } from './mock';

function Login() {
    const [values, setValues] = React.useState<User>({
        password: '',
        email: '',
        showPassword: false,
    });
    const [error, setError] = useState<boolean>(false);
    const [btnValidate, setBtnValidate] = useState<boolean>(false);
    const [isValidate, setIsValidate] = useState<boolean>(false);
    const [emailValidate, setEmailValidate] = useState<boolean>(true);
    const history = useHistory();

    const checkLogin = (): void => {
        setIsValidate(true);
        setBtnValidate(false);
        setError(false);
        setTimeout(() => {
            if (
                mockLogin.find(
                    ({ email, senha }) =>
                        values.email === email && values.password === senha
                )
            ) {
                history.push('/meus-aplicativos');
            } else {
                setError(true);
                setIsValidate(false);
                setBtnValidate(true);
                setTimeout(() => {
                    setError(false);
                }, 4000);
            }
        }, 3000);
    };

    useEffect(() => {
        const regexEmail = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
        if (regexEmail.test(values.email) || values.email === '') {
            setEmailValidate(true);
            if (values.password.length >= 6) {
                setBtnValidate(true);
            } else {
                setBtnValidate(false);
            }
        } else {
            setEmailValidate(false);
            setBtnValidate(false);
            setIsValidate(false);
        }
    }, [values.email, values.password]);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
            },
            margin: {
                margin: theme.spacing(1),
            },
            withoutLabel: {
                marginTop: theme.spacing(3),
            },
            textField: {
                width: '25ch',
            },
        })
    );

    const classes = useStyles();

    const handleChange = (prop: keyof User) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

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
                {error ? (
                    <Alert className="alert-error" severity="error">
                        <AlertTitle>Erro</AlertTitle>
                        E-mail ou senha inválidos!
                    </Alert>
                ) : (
                    ''
                )}
                <p>Entre com sua conta.</p>
                <FormControl
                    className={`${clsx(
                        classes.margin,
                        classes.textField
                    )}, "inputs-container__input-email"`}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-email">
                        E-mail
                    </InputLabel>
                    <OutlinedInput
                        error={!emailValidate}
                        id="outlined-adornment-email"
                        fullWidth={true}
                        value={values.email}
                        onChange={handleChange('email')}
                        labelWidth={40}
                    />
                    {!emailValidate && (
                        <FormHelperText
                            id="component-error-text"
                            style={{ color: 'red' }}
                        >
                            E-mail inválido
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl
                    className={`${clsx(
                        classes.margin,
                        classes.textField
                    )}, "inputs-container__input-password"`}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        Senha
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <Button
                    onClick={checkLogin}
                    disabled={!btnValidate}
                    color={'primary'}
                    className="btn-login"
                    variant="contained"
                    disableRipple
                >
                    {!isValidate ? 'Entrar' : 'Aguarde...'}
                </Button>
                <br />
                <p>
                    <Link to="/login">Esqueci minha senha</Link>
                </p>
                <br />
                <p>
                    Ainda não tem uma conta?
                    <br />
                    <Link to="/login">Criar uma conta</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
