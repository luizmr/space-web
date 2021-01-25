import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import StoreIcon from '@material-ui/icons/Store';
import HelpIcon from '@material-ui/icons/Help';
import PaymentIcon from '@material-ui/icons/Payment';
import Avatar from '@material-ui/core/Avatar';

function Home() {
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
                height: '250px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
            },
            a: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'black',
            },
        })
    );
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Navbar />
            <div className={`${classes.root} btn-floating-navbar`}>
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={handleClick}
                >
                    <AddIcon />
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
                                {/* <Avatar> */}
                                {icon}
                                {/* </Avatar> */}
                                <p>{title}</p>
                            </Link>
                        ))}
                    </Typography>
                </Popover>
            </div>
        </div>
    );
}

export default Home;
