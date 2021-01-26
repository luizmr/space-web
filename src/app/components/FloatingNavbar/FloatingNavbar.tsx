import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import StoreIcon from '@material-ui/icons/Store';
import HelpIcon from '@material-ui/icons/Help';
import PaymentIcon from '@material-ui/icons/Payment';
import Avatar from '@material-ui/core/Avatar';

const FloatingNavbar: React.FC = () => {
    const options = [
        {
            title: 'Meus Aplicativos',
            path: '/meus-aplicativos',
            icon: <AppsIcon fontSize="large" />,
        },
        {
            title: 'Vitrine',
            path: '/vitrine',
            icon: <StoreIcon fontSize="large" />,
        },
        {
            title: 'Billing',
            path: '/billing',
            icon: <PaymentIcon fontSize="large" />,
        },
        { title: 'Ajuda', path: '/ajuda', icon: <HelpIcon fontSize="large" /> },
    ];

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
            typography: {
                padding: theme.spacing(2),
                width: '300px',
                height: '300px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
            },
            a: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'black',
                borderRadius: '8px',
                '&:hover': {
                    color: 'black',
                    backgroundColor: '#dbdbdb',
                    transition: '0.3s',
                },
            },
            b: {
                // backgroundColor: '#f5f5f5',
                backgroundColor: 'blue',
                '&:hover': {
                    color: 'black',
                    backgroundColor: '#dbdbdb',
                    transition: '0.3s',
                },
            },
        })
    );
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={` btn-floating-navbar`}>
            <Fab
                color="primary"
                aria-label="add"
                size="small"
                className={classes.b}
                onClick={handleClick}
            >
                <img
                    src="https://i.pinimg.com/originals/88/fa/91/88fa91d09a2a25809a73cada846821ee.png"
                    alt="foguete"
                    style={{
                        width: '35px',
                        marginRight: '3px',
                    }}
                ></img>
            </Fab>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Typography className={classes.typography}>
                    {options.map(({ title, path, icon }) => (
                        <Link
                            to={path}
                            className={classes.a}
                            style={{ textDecoration: 'none' }}
                        >
                            {/* <Avatar
                      style={{
                          backgroundColor: 'white',
                          color: 'black',
                      }}
                  > */}
                            {icon}
                            {/* </Avatar> */}
                            <p>{title}</p>
                        </Link>
                    ))}
                </Typography>
            </Popover>
        </div>
    );
};

export default FloatingNavbar;
