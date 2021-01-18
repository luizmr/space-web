import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { User } from '../../models/Login';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom';

function Login() {
    const [values, setValues] = React.useState<User>({
        password: '',
        email: '',
        showPassword: false,
    });
    const [error, setError] = useState<boolean>(false);
    const [validate, setValidate] = useState<boolean>(true);
    const [isValidate, setIsValidate] = useState<boolean>(false);
    const history = useHistory();

    const checkLogin = (): void => {
        setIsValidate(true);
        setError(false);
        setTimeout(() => {
            if (
                values.email === 'teste@teste.com' &&
                values.password === '123456'
            ) {
                history.push('/home');
            } else {
                setError(true);
                setIsValidate(false);
                setTimeout(() => {
                    setError(false);
                }, 4000);
            }
        }, 3000);
    };

    useEffect(() => {
        // setError(false);
        const emailValidate = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
        if (emailValidate.test(values.email) && values.password.length >= 6) {
            setValidate(false);
            setError(false);
        } else {
            setValidate(true);
            // setError(true);
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
                        id="outlined-adornment-email"
                        fullWidth={true}
                        value={values.email}
                        onChange={handleChange('email')}
                        labelWidth={40}
                    />
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
                    disabled={validate || isValidate}
                    color={'primary'}
                    className="btn-login"
                    variant="contained"
                    disableRipple
                >
                    {!isValidate ? 'Entrar' : 'Aguarde...'}
                </Button>
                {/* {error && (
                    <span className="span-error">
                        E-mail ou senha inválidos
                    </span>
                )} */}
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
