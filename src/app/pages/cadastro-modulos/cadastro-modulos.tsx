import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FiCornerDownLeft, FiCornerDownRight } from 'react-icons/fi';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import InputAdornment from '@material-ui/core/InputAdornment';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { mockApps } from '../cadastro-apps/mock';
import { mockModulos } from './mock';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    FaEdit,
    FaPlus,
    FaTrash,
    FaTrashAlt,
    FaSearch,
    FaCaretRight,
} from 'react-icons/fa';
import { ListSubheader, TextField } from '@material-ui/core';
import { AppOutput } from '../../models/cadastro-apps';

const useOutlinedInputStyles = makeStyles({
    root: {
        width: 200,
        '& .MuiOutlinedInput-input': {
            color: '#23272b90',
        },
        '& .MuiInputLabel-root': {
            color: '#23272b',
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#23272b90',
        },
        '&:hover .MuiOutlinedInput-input': {
            color: '#23272b',
        },
        '&:hover .MuiInputLabel-root': {
            color: '#23272b',
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#23272b',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
            color: '#23272b',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#23272b',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#23272b',
            borderWidth: '1px',
        },
    },
});

const columns = [
    { id: 'acoes', label: 'Ações', minWidth: 100 },
    { id: 'Id', label: 'Módulo/Evento ID', minWidth: 10 },
    {
        id: 'Name',
        label: 'Módulo/Evento',
        minWidth: 170,
    },
    {
        id: 'AppName',
        label: 'Aplicativo',
        minWidth: 170,
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        minHeight: 350,
    },
});

function CadastroModulos() {
    const classes = useStyles();
    const outlinedInputClasses = useOutlinedInputStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [appId, setAppId] = useState(0);
    const [moduloId, setModuloId] = useState(0);
    const [apps, setApps] = useState<Array<AppOutput>>([]);
    const [data, setData] = useState<Array<any>>([]);
    const [filteredData, setFilteredData] = useState<Array<any>>([]);
    const [filteredModulos, setFilteredModulos] = useState<Array<any>>([]);
    const [modulos, setModulos] = useState<Array<any>>([]);

    const createData = (a: Array<AppOutput>, b: any) => {
        // const apps = mockApps;
        // const modules = mockModulos;

        let newArray = b.map((obj: any) => {
            let appFound = a.find((el) => el.Id === obj.AppId);

            return { ...obj, AppName: appFound?.Nome };
        });

        return newArray;
    };

    useEffect(() => {
        setApps(mockApps);
        setModulos(mockModulos);
        setData(createData(mockApps, mockModulos));
        setFilteredData(createData(mockApps, mockModulos));
    }, []);

    // const filteredData = createData(apps, modulos);

    const handleChangeModulo = (event: any) => {
        setModuloId(event.target.value);
        console.log(event.target.value);

        if (event.target.value === 0 && appId === 0) {
            setFilteredData(data);
            setAppId(0);
        } else if (event.target.value === 0 && appId !== 0) {
            setAppId(0);

            setFilteredData(data);
            setFilteredModulos(data);
        } else {
            let newDataArray: Array<object> = [];
            data.map((obj) => {
                if (obj.Id === event.target.value) {
                    newDataArray.push(obj);
                }
            });

            setFilteredData(newDataArray);
        }
    };

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const selectModulosPerApp = (event: any) => {
        setAppId(event.target.value);

        if (event.target.value === 0) {
            setFilteredData(data);
            setFilteredModulos(data);
            setModuloId(0);
        } else {
            let newDataArray: Array<object> = [];
            data.map((obj) => {
                if (obj.AppId === event.target.value) {
                    newDataArray.push(obj);
                }
            });

            setFilteredData(newDataArray);
            setFilteredModulos(newDataArray);
        }
    };

    return (
        <>
            <Navbar />
            <div className="cadastro-modulos">
                <div className="cadastro-modulos__header">
                    <h2>Cadastro de Módulos/Eventos</h2>
                    <Link to="/billing">
                        <Button
                            variant="dark"
                            className="cadastro-modulos__header-button"
                        >
                            <FiCornerDownLeft />
                        </Button>
                    </Link>
                </div>

                <div className="cadastro-modulos__filter">
                    <FormControl
                        variant="outlined"
                        className={`mr-3 ${outlinedInputClasses.root}`}
                    >
                        <InputLabel id="app-input">Aplicativo</InputLabel>
                        <Select
                            labelId="app-input"
                            id="app-select"
                            value={appId}
                            label="Aplicativo"
                            onChange={selectModulosPerApp}
                        >
                            <MenuItem value={0}>
                                <em>Todos</em>
                            </MenuItem>
                            {apps.map((obj) => (
                                <MenuItem value={obj.Id}>{obj.Nome}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        className={outlinedInputClasses.root}
                    >
                        <InputLabel id="modulo-input">Módulo/Evento</InputLabel>
                        <Select
                            labelId="modulo-input"
                            id="modulo-select"
                            value={moduloId}
                            onChange={handleChangeModulo}
                            label="Módulo/Evento"
                        >
                            <MenuItem value={0}>
                                <em>Todos</em>
                            </MenuItem>

                            {filteredModulos.map((el: any) => (
                                <MenuItem
                                    value={el.Id}
                                    onChange={(e: any) =>
                                        console.log('menu', e.target.value)
                                    }
                                >
                                    <FiCornerDownRight className="mr-2" />{' '}
                                    {el.Name}
                                </MenuItem>
                            ))}
                            {filteredModulos.length === 0 && (
                                <ListSubheader value={0}>
                                    Sem Módulos/Eventos
                                </ListSubheader>
                            )}
                            {/* {apps.map((obj) => (
                                <>
                                    {obj.Id === 1 &&
                                        filteredData.length === 0 && (
                                            <ListSubheader>
                                                Sem Módulos/Eventos
                                            </ListSubheader>
                                        )}
                                    {filteredData.find(
                                        (ele: any) => ele.AppId === obj.Id
                                    ) !== undefined && (
                                        <ListSubheader>
                                            {obj.Nome}
                                        </ListSubheader>
                                    )} */}
                            {/* {filteredData.map((el: any) => (
                                        <>
                                            {el.AppId === obj.Id && (
                                                <MenuItem
                                                    value={el.Id}
                                                    onChange={(e: any) =>
                                                        console.log(
                                                            'menu',
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <FaCaretRight /> {el.Name}
                                                </MenuItem>
                                           )} 
                                       </>
                                    ))} */}
                            {/* </>
                            ))} */}
                        </Select>
                    </FormControl>
                    <div className="cadastro-modulos__filter-clear"></div>
                    <div className="cadastro-modulos__filter-button">
                        <Tooltip title="Novo Módulo/Evento">
                            <IconButton aria-label="add">
                                <FaPlus fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table aria-label="table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column: any) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row: any) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.Id}
                                            >
                                                {columns.map((column: any) => {
                                                    const value =
                                                        row[column.id];
                                                    return (
                                                        <>
                                                            {column.id ===
                                                            'acoes' ? (
                                                                <TableCell
                                                                    key={
                                                                        column.id
                                                                    }
                                                                    align={
                                                                        column.align
                                                                    }
                                                                >
                                                                    <Tooltip title="Editar Módulo/Evento">
                                                                        <IconButton aria-label="edit">
                                                                            <FaEdit fontSize="medium" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="Excluir Módulo/Evento">
                                                                        <IconButton aria-label="delete">
                                                                            <FaTrashAlt fontSize="medium" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            ) : (
                                                                <TableCell
                                                                    key={
                                                                        column.id
                                                                    }
                                                                    align={
                                                                        column.align
                                                                    }
                                                                >
                                                                    {value}
                                                                </TableCell>
                                                            )}
                                                        </>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        labelRowsPerPage={'Linhas por página'}
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </>
    );
}

export default CadastroModulos;
