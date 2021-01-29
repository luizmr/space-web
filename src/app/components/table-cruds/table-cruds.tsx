import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
} from '@material-ui/core';
import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { DataModulosOutput } from '../../models/cadastro-modulos';

type Props = {
    classRoot?: string;
    classContainer?: string;
    columns: {
        id: string;
        label: string;
        minWidth: number;
    }[];
    filteredData: Array<DataModulosOutput>;
    page: number;
    rowsPerPage: number;
    handleEditModule: (a: number, b: number, c: string) => void;
    setShowModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
    handleChangePage: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number
    ) => void;
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
};

const TableCrudComponent = ({
    classRoot,
    classContainer,
    columns,
    filteredData,
    page,
    rowsPerPage,
    handleEditModule,
    setShowModalDelete,
    handleChangePage,
    handleChangeRowsPerPage,
}: Props) => {
    return (
        <>
            <Paper className={classRoot}>
                <TableContainer className={classContainer}>
                    <Table aria-label="table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column: any, index) => (
                                    <>
                                        {column.id === 'acoes' ? (
                                            <TableCell
                                                key={`${column.id}-${index}`}
                                                align={column.align}
                                                className="th-acoes"
                                                style={{
                                                    minWidth: column.minWidth,
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ) : (
                                            <TableCell
                                                key={`${column.id}-${index}`}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        )}
                                    </>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row: any, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={`${row.id}-${index}`}
                                        >
                                            {columns.map(
                                                (column: any, index) => {
                                                    const value =
                                                        row[column.id];
                                                    return (
                                                        <>
                                                            {column.id ===
                                                            'acoes' ? (
                                                                <TableCell
                                                                    key={`${column.id}-${index}`}
                                                                    align={
                                                                        column.align
                                                                    }
                                                                    className="td-acoes"
                                                                >
                                                                    <Tooltip title="Editar Módulo/Evento">
                                                                        <IconButton
                                                                            aria-label="edit"
                                                                            onClick={() =>
                                                                                handleEditModule(
                                                                                    row[
                                                                                        'Id'
                                                                                    ],
                                                                                    row[
                                                                                        'AppId'
                                                                                    ],
                                                                                    row[
                                                                                        'Name'
                                                                                    ]
                                                                                )
                                                                            }
                                                                        >
                                                                            <FaEdit fontSize="medium" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="Excluir Módulo/Evento">
                                                                        <IconButton
                                                                            aria-label="delete"
                                                                            onClick={() =>
                                                                                setShowModalDelete(
                                                                                    true
                                                                                )
                                                                            }
                                                                        >
                                                                            <FaTrashAlt fontSize="medium" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            ) : (
                                                                <TableCell
                                                                    key={`${column.id}-${index}`}
                                                                    align={
                                                                        column.align
                                                                    }
                                                                >
                                                                    {value}
                                                                </TableCell>
                                                            )}
                                                        </>
                                                    );
                                                }
                                            )}
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
        </>
    );
};

export default TableCrudComponent;
