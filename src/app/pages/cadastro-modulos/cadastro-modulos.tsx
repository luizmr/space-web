import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { mockApps, mockEventos } from '../consulta-regras/mockBilling';
import { FiCornerDownLeft, FiCornerDownRight } from 'react-icons/fi';
import {
    FaEdit,
    FaPlus,
    FaTrashAlt,
    FaEraser,
    FaRegFrown,
    FaCheck,
} from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import {
    IconButton,
    Tooltip,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    ListSubheader,
} from '@material-ui/core';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { AppOutput, EventsOutput } from '../../models/billingModels';
import { DataModulosOutput } from '../../models/cadastro-modulos';
import ModalDeleteComponent from '../../components/modal-delete/modal-delete';
import ModalDeletingComponent from '../../components/modal-deleting/modal-deleting';
import ModalSuccessComponent from '../../components/modal-success/modal-success';
import TableCrudComponent from '../../components/table-cruds/table-cruds';

const useOutlinedInputStyles = makeStyles({
    root: {
        // width: 200,
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
    width1: {
        width: 200,
    },
    width2: {
        width: 300,
    },
});

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        minHeight: 350,
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

function CadastroModulos() {
    const history = useHistory();
    const classes = useStyles();
    const outlinedInputClasses = useOutlinedInputStyles();
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [appId, setAppId] = useState<number>(0);
    const [newAppId, setNewAppId] = useState<number>(0);
    const [moduloId, setModuloId] = useState<number>(0);
    const [apps, setApps] = useState<Array<AppOutput>>([]);
    const [data, setData] = useState<Array<DataModulosOutput>>([]);
    const [filteredData, setFilteredData] = useState<Array<DataModulosOutput>>(
        []
    );
    const [filteredModulos, setFilteredModulos] = useState<Array<EventsOutput>>(
        []
    );
    const [modulos, setModulos] = useState<Array<EventsOutput>>([]);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [showModalEditAdd, setShowModalEditAdd] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [nameValid, setNameValid] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [modulo, setModulo] = useState<EventsOutput>({});

    const createData = (a: Array<AppOutput>, b: Array<EventsOutput>) => {
        let newArray = b.map((obj: EventsOutput) => {
            let appFound = a.find((el: AppOutput) => el.Id === obj.AppId);

            return { ...obj, AppName: appFound?.Name };
        });

        return newArray;
    };

    useEffect(() => {
        setApps(mockApps);
        setModulos(mockEventos);
        setData(createData(mockApps, mockEventos));
        setFilteredData(createData(mockApps, mockEventos));
        setFilteredModulos(mockEventos);
    }, []);

    const handleChangeModulo = (event: any): void => {
        setModuloId(event.target.value);

        if (event.target.value === 0 && appId === 0) {
            setFilteredData(data);
            setAppId(0);
        } else if (event.target.value === 0 && appId !== 0) {
            setAppId(0);

            setFilteredData(data);
            setFilteredModulos(data);
        } else {
            let newDataArray: Array<DataModulosOutput> = [];
            data.map((obj) => {
                if (obj.Id === event.target.value) {
                    newDataArray.push(obj);
                }
            });

            setFilteredData(newDataArray);
        }
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number
    ): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const selectModulosPerApp = (event: any): void => {
        setAppId(event.target.value);
        setModuloId(0);

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

    const clearFields = (): void => {
        setModuloId(0);
        setAppId(0);
        setFilteredData(data);
        setFilteredModulos(data);
    };

    const deleteModule = (): void => {
        handleCloseModalDelete();
        setShowModal(true);
        setSending(true);
        setTimeout(() => {
            setSending(false);
        }, 3000);
        setTimeout(() => {
            setShowModal(false);
            history.push('/billing/cadastro-modulos');
        }, 5000);
    };

    const editAddModule = (): void => {
        setShowModalEditAdd(true);
        setSending(true);
        setTimeout(() => {
            setSending(false);
        }, 3000);
        setTimeout(() => {
            setShowModalEditAdd(false);
            setIsEditing(false);
            setNameValid(false);
            setModulo({ Id: undefined, Name: '', AppId: 0 });
            history.push('/billing/cadastro-modulos');
        }, 5000);
    };

    const handleCloseModalDelete = (): void => setShowModalDelete(false);

    const handleNewModule = (): void => {
        setOpen(true);
        setNewAppId(0);
        setIsEditing(false);
        setNameValid(false);
        setModulo({
            AppId: 0,
            Name: '',
            Id: undefined,
        });
    };

    const handleEditModule = (
        id: number,
        appId: number,
        name: string
    ): void => {
        setOpen(true);
        setNameValid(true);
        setNewAppId(appId);
        setIsEditing(true);
        setModulo({
            Id: id,
            AppId: appId,
            Name: name,
        });
    };

    const handleClose = (): void => {
        setOpen(false);
        setNewAppId(0);
        setIsEditing(false);
        setModulo({ Id: undefined, Name: '', AppId: 0 });
    };

    const handleSubmit = (): void => {
        setOpen(false);
        setNewAppId(0);
        editAddModule();
    };

    const handleModuleAppEdit = (event: any): void => {
        setNewAppId(event.target.value);
        setModulo({ ...modulo, AppId: event.target.value });
    };

    const handleModuleNameEdit = (event: any): void => {
        event.target.value.length > 10
            ? setNameValid(true)
            : setNameValid(false);
        setModulo({ ...modulo, Name: event.target.value });
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
                        className={`mr-3 ${outlinedInputClasses.root} ${outlinedInputClasses.width1}`}
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
                                <MenuItem value={obj.Id} key={obj.Id}>
                                    {obj.Name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        className={`mr-2 ${outlinedInputClasses.root} ${outlinedInputClasses.width1}`}
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
                                <MenuItem value={el.Id} key={el.Id}>
                                    <FiCornerDownRight className="mr-2" />{' '}
                                    {el.Name}
                                </MenuItem>
                            ))}
                            {filteredModulos.length === 0 && (
                                <ListSubheader value={0}>
                                    Sem Módulos/Eventos
                                </ListSubheader>
                            )}
                        </Select>
                    </FormControl>
                    <div className="cadastro-modulos__filter-clear">
                        <Tooltip title="Limpar Campos">
                            <IconButton
                                aria-label="clear"
                                onClick={clearFields}
                                className="clear-button"
                            >
                                <FaEraser fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="cadastro-modulos__filter-button">
                        <Tooltip title="Novo Módulo/Evento">
                            <IconButton
                                aria-label="add"
                                onClick={handleNewModule}
                                className="add-button"
                            >
                                <FaPlus fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                {filteredData.length === 0 ? (
                    <div className="cadastro-modulos__not-found">
                        <p>Resultado não encontrado para a procura desejada!</p>
                        <FaRegFrown />
                    </div>
                ) : (
                    <TableCrudComponent
                        classRoot={classes.root}
                        classContainer={classes.container}
                        columns={columns}
                        filteredData={filteredData}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleEditModule={handleEditModule}
                        setShowModalDelete={setShowModalDelete}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    // <Paper className={classes.root}>
                    //     <TableContainer className={classes.container}>
                    //         <Table aria-label="table">
                    //             <TableHead>
                    //                 <TableRow>
                    //                     {columns.map((column: any, index) => (
                    //                         <>
                    //                             {column.id === 'acoes' ? (
                    //                                 <TableCell
                    //                                     key={`${column.id}-${index}`}
                    //                                     align={column.align}
                    //                                     className="th-acoes"
                    //                                     style={{
                    //                                         minWidth:
                    //                                             column.minWidth,
                    //                                     }}
                    //                                 >
                    //                                     {column.label}
                    //                                 </TableCell>
                    //                             ) : (
                    //                                 <TableCell
                    //                                     key={`${column.id}-${index}`}
                    //                                     align={column.align}
                    //                                     style={{
                    //                                         minWidth:
                    //                                             column.minWidth,
                    //                                     }}
                    //                                 >
                    //                                     {column.label}
                    //                                 </TableCell>
                    //                             )}
                    //                         </>
                    //                     ))}
                    //                 </TableRow>
                    //             </TableHead>
                    //             <TableBody>
                    //                 {filteredData
                    //                     .slice(
                    //                         page * rowsPerPage,
                    //                         page * rowsPerPage + rowsPerPage
                    //                     )
                    //                     .map((row: any, index) => {
                    //                         return (
                    //                             <TableRow
                    //                                 hover
                    //                                 role="checkbox"
                    //                                 tabIndex={-1}
                    //                                 key={`${row.id}-${index}`}
                    //                             >
                    //                                 {columns.map(
                    //                                     (
                    //                                         column: any,
                    //                                         index
                    //                                     ) => {
                    //                                         const value =
                    //                                             row[column.id];
                    //                                         return (
                    //                                             <>
                    //                                                 {column.id ===
                    //                                                 'acoes' ? (
                    //                                                     <TableCell
                    //                                                         key={`${column.id}-${index}`}
                    //                                                         align={
                    //                                                             column.align
                    //                                                         }
                    //                                                         className="td-acoes"
                    //                                                     >
                    //                                                         <Tooltip title="Editar Módulo/Evento">
                    //                                                             <IconButton
                    //                                                                 aria-label="edit"
                    //                                                                 onClick={() =>
                    //                                                                     handleEditModule(
                    //                                                                         row[
                    //                                                                             'Id'
                    //                                                                         ],
                    //                                                                         row[
                    //                                                                             'AppId'
                    //                                                                         ],
                    //                                                                         row[
                    //                                                                             'Name'
                    //                                                                         ]
                    //                                                                     )
                    //                                                                 }
                    //                                                             >
                    //                                                                 <FaEdit fontSize="medium" />
                    //                                                             </IconButton>
                    //                                                         </Tooltip>
                    //                                                         <Tooltip title="Excluir Módulo/Evento">
                    //                                                             <IconButton
                    //                                                                 aria-label="delete"
                    //                                                                 onClick={() =>
                    //                                                                     setShowModalDelete(
                    //                                                                         true
                    //                                                                     )
                    //                                                                 }
                    //                                                             >
                    //                                                                 <FaTrashAlt fontSize="medium" />
                    //                                                             </IconButton>
                    //                                                         </Tooltip>
                    //                                                     </TableCell>
                    //                                                 ) : (
                    //                                                     <TableCell
                    //                                                         key={`${column.id}-${index}`}
                    //                                                         align={
                    //                                                             column.align
                    //                                                         }
                    //                                                     >
                    //                                                         {
                    //                                                             value
                    //                                                         }
                    //                                                     </TableCell>
                    //                                                 )}
                    //                                             </>
                    //                                         );
                    //                                     }
                    //                                 )}
                    //                             </TableRow>
                    //                         );
                    //                     })}
                    //             </TableBody>
                    //         </Table>
                    //     </TableContainer>
                    //     <TablePagination
                    //         rowsPerPageOptions={[5, 10, 25]}
                    //         labelRowsPerPage={'Linhas por página'}
                    //         component="div"
                    //         count={filteredData.length}
                    //         rowsPerPage={rowsPerPage}
                    //         page={page}
                    //         onChangePage={handleChangePage}
                    //         onChangeRowsPerPage={handleChangeRowsPerPage}
                    //     />
                    // </Paper>
                )}
            </div>
            <ModalDeleteComponent
                show={showModalDelete}
                onHide={handleCloseModalDelete}
                header={'Deletar Módulo/Evento'}
                onDelete={deleteModule}
            />

            {showModal && (
                <ModalDeletingComponent
                    show={showModal}
                    header={'Módulo/Evento'}
                    sending={sending}
                />
            )}
            {showModalEditAdd && (
                <ModalSuccessComponent
                    show={showModalEditAdd}
                    editFalse={'novo Módulo/Evento'}
                    editTrue={'Módulo/Evento'}
                    isEditing={isEditing}
                    sending={sending}
                />
            )}
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {modulo.Id ? 'Editar Módulo/Evento' : 'Novo Módulo/Evento'}
                </DialogTitle>
                <DialogContent className="dialog-module">
                    <div className="mb-4">
                        <FormControl
                            variant="outlined"
                            className={`${outlinedInputClasses.root} ${outlinedInputClasses.width2}`}
                        >
                            <InputLabel id="app-dialog">Aplicativo</InputLabel>
                            <Select
                                labelId="app-dialog"
                                id="app-select-dialog"
                                value={newAppId}
                                label="Aplicativo"
                                onChange={handleModuleAppEdit}
                                fullWidth
                            >
                                <MenuItem value={0}>
                                    <em>Nenhum</em>
                                </MenuItem>
                                {apps.map((obj) => (
                                    <MenuItem value={obj.Id} key={obj.Id}>
                                        {obj.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl
                            variant="outlined"
                            className={`${outlinedInputClasses.width2} ${outlinedInputClasses.root}`}
                        >
                            <TextField
                                id="outlined-modulo"
                                label="Módulo/Evento"
                                value={modulo.Name}
                                onChange={handleModuleNameEdit}
                                variant="outlined"
                            />
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions className="dialog-buttons">
                    <div>
                        <Button onClick={handleClose} variant="outlined">
                            Cancelar
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={handleSubmit}
                            disabled={
                                newAppId === 0 || !nameValid ? true : false
                            }
                        >
                            Confirmar
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
            <div className="footer">footer</div>
        </>
    );
}

export default CadastroModulos;
