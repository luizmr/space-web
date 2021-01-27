import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import StoreIcon from '@material-ui/icons/Store';
import HelpIcon from '@material-ui/icons/Help';
import PaymentIcon from '@material-ui/icons/Payment';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';

import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';

const FloatingNavbar: React.FC = () => {
    const user = localStorage.user;
    const history = useHistory();

    const options =
        user !== 'admin'
            ? [
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
                      title: 'Ajuda',
                      path: '/ajuda',
                      icon: <HelpIcon fontSize="large" />,
                  },
              ]
            : [
                  {
                      title: 'Cadastrar',
                      path: '/billing',
                      icon: <AddCircleOutlineIcon fontSize="large" />,
                  },
                  {
                      title: 'Meus Produtos',
                      path: '/billing',
                      icon: <AppsIcon fontSize="large" />,
                  },
                  {
                      title: 'Regras de Cobranças',
                      path: '/billing',
                      icon: <PaymentIcon fontSize="large" />,
                  },
                  {
                      title: 'Ajuda',
                      path: '/ajuda',
                      icon: <HelpIcon fontSize="large" />,
                  },
              ];

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                transform: 'translateZ(0px)',
                flexGrow: 1,
                '& > *': {
                    margin: theme.spacing(1),
                },
            },

            tooltip: {
                fontSize: 16,
            },

            speedDial: {
                position: 'absolute',
                bottom: theme.spacing(2),
                right: theme.spacing(2),
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
                textAlign: 'center',
                color: 'black',
                borderRadius: '8px',
                '&:hover': {
                    color: 'black',
                    backgroundColor: '#dbdbdb',
                    transition: '0.3s',
                    textDecoration: 'none',
                },
            },
            b: {
                backgroundColor: '#dbdbdb',
                '&:hover': {
                    backgroundColor: '#b3b3b3',

                    color: 'black',
                    transition: '0.3s',
                },
            },
        })
    );

    // const handleOpen = () => {
    //     setOpen(!open);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const [open, setOpen] = React.useState(false);
    // const [hidden, setHidden] = React.useState(false);

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
                size="medium"
                className={classes.b}
                onClick={handleClick}
            >
                <img
                    src="https://i.pinimg.com/originals/88/fa/91/88fa91d09a2a25809a73cada846821ee.png"
                    alt="foguete"
                    draggable={false}
                    style={{
                        width: '35px',
                        marginRight: '3px',
                    }}
                />
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
                style={{ top: '-8px' }}
            >
                <Typography className={classes.typography}>
                    {options.map(({ title, path, icon }) => (
                        <Link to={path} className={classes.a}>
                            {icon}
                            <p>{title}</p>
                        </Link>
                    ))}
                </Typography>
            </Popover>

            {/* <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                icon={
                    <img
                        src="https://i.pinimg.com/originals/88/fa/91/88fa91d09a2a25809a73cada846821ee.png"
                        alt="foguete"
                        draggable={false}
                        style={{
                            width: '35px',
                            marginRight: '3px',
                        }}
                    />
                }
                onClose={handleClose}
                onClick={handleOpen}
                open={open}
            >
                {options.map((option) => (
                    <SpeedDialAction
                        key={option.title}
                        icon={option.icon}
                        tooltipTitle={option.title}
                        TooltipClasses={classes}
                        onClick={() => {
                            history.push(option.path);
                        }}
                    />
                ))}
            </SpeedDial> */}
        </div>
    );
};

export default FloatingNavbar;
