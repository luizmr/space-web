import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import {
    mockApps,
    mockEventos,
    mockMoedas,
    mockProdutor,
    mockProdutos,
    mockRegras,
} from '../consulta-regras/mockBilling';
import { FiCornerDownLeft, FiCornerDownRight } from 'react-icons/fi';
import {
    FaEdit,
    FaPlus,
    FaTrashAlt,
    FaEraser,
    FaRegFrown,
    FaCheck,
    FaSearch,
    FaFilter,
} from 'react-icons/fa';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
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
import {
    AppOutput,
    DataRulesOutput,
    DataRulesSearchOutput,
    EventsOutput,
    FeeOutput,
    MoedasOutput,
    ProdutoOutput,
    ProdutorOutput,
    RegrasOutput,
} from '../../models/billingModels';
import { DataModulosOutput } from '../../models/cadastro-modulos';
import ModalDeletingComponent from '../../components/modal-deleting/modal-deleting';
import ModalSuccessComponent from '../../components/modal-success/modal-success';
import { Autocomplete } from '@material-ui/lab';

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 440,
            md: 830,
            lg: 1280,
            xl: 1920,
        },
    },
});

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
        width: 225,
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
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
    { id: 'acoes', label: 'Ações', width: 50 },
    // {
    //     id: 'FeeId',
    //     label: 'Taxa ID',
    //     minWidth: 100,
    // },
    // { id: 'Id', label: 'ID', minWidth: 10 },
    {
        id: 'RuleName',
        label: 'Regra',
        minWidth: 200,
    },
    {
        id: 'AppName',
        label: 'Aplicativo',
        width: 100,
    },
    {
        id: 'EventName',
        label: 'Módulo/Evento',
        width: 150,
    },
    {
        id: 'CustomerName',
        label: 'Produtor',
        width: 200,
    },
    // {
    //     id: 'ProductName',
    //     label: 'Produto',
    //     minWidth: 200,
    // },
    // {
    //     id: 'CurrencyName',
    //     label: 'Moeda',
    //     minWidth: 150,
    // },
    // {
    //     id: 'FeeValue',
    //     label: 'Valor',
    //     minWidth: 100,
    // },
    // {
    //     id: 'FeeRangeFrom',
    //     label: 'Range De',
    //     minWidth: 150,
    // },
    // {
    //     id: 'FeeRangeTo',
    //     label: 'Range Para',
    //     minWidth: 150,
    // },
    // {
    //     id: 'FeePeriodFrom',
    //     label: 'Período De',
    //     minWidth: 150,
    // },
    // {
    //     id: 'FeePeriodTo',
    //     label: 'Período Para',
    //     minWidth: 150,
    // },
];

function CadastroRegras() {
    const history = useHistory();
    const classes = useStyles();
    const outlinedInputClasses = useOutlinedInputStyles();
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [ruleId, setRuleId] = useState<number>(0);
    const [rules, setRules] = useState<Array<RegrasOutput>>([]);
    const [filteredRules, setFilteredRules] = useState<Array<RegrasOutput>>([]);
    const [appId, setAppId] = useState<number>(0);
    const [newAppId, setNewAppId] = useState<number>(0);
    const [moduloId, setModuloId] = useState<number>(0);
    const [apps, setApps] = useState<Array<AppOutput>>([]);
    const [filteredApps, setFilteredApps] = useState<Array<AppOutput>>([]);
    const [data, setData] = useState<Array<DataRulesOutput>>([]);
    const [filteredData, setFilteredData] = useState<Array<DataRulesOutput>>(
        []
    );
    const [filteredModulos, setFilteredModulos] = useState<Array<EventsOutput>>(
        []
    );
    const [modulos, setModulos] = useState<Array<EventsOutput>>([]);
    const [showModalEditAdd, setShowModalEditAdd] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [nameValid, setNameValid] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [rule, setRule] = useState<EventsOutput>({});
    const [currencyId, setCurrencyId] = useState<number>(1);
    const [customer, setCustomer] = useState<Array<ProdutorOutput>>([]);
    const [autoCompleteOpen, setAutoCompleteOpen] = useState<boolean>(false);
    const [
        autoCompleteOpenProduct,
        setAutoCompleteOpenProduct,
    ] = useState<boolean>(false);
    const [customerState, setCustomerState] = useState<any>({
        Id: undefined,
        Name: '',
    });
    const [products, setProducts] = useState<Array<ProdutoOutput>>([]);
    const [productState, setProductState] = useState<any>({
        Id: undefined,
        Name: '',
    });
    const [value, setValue] = useState<string>('');
    const [period, setPeriod] = useState<string>('');
    const [dataSearch, setDataSearch] = useState<DataRulesSearchOutput>({});
    const [openFilter, setOpenFilter] = useState<boolean>(false);

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const createData = (
        app: Array<AppOutput>,
        events: Array<EventsOutput>,
        rules: Array<RegrasOutput>,
        customer: Array<ProdutorOutput>,
        product: Array<ProdutoOutput>,
        currency: Array<MoedasOutput>
    ) => {
        let newArray: Array<DataRulesOutput> = [];
        rules.map((obj: RegrasOutput) => {
            let appFound = app.find((el: AppOutput) => el.Id === obj.AppId);
            let eventFound = events.find(
                (el: EventsOutput) => el.Id === obj.EventId
            );
            let customerFound = customer.find(
                (el: ProdutorOutput) => el.Id === obj.Customer.Id
            );
            let productFound = product.find(
                (el: ProdutoOutput) => el.Id === obj.Product?.Id
            );
            let currencyFound = currency.find(
                (el: MoedasOutput) => el.Id === obj.CurrencyId
            );

            // obj.Fees?.map((fee: FeeOutput) => {
            //     let value = fee.IsPercent
            //         ? `${fee.Value} %`
            //         : fee.Value % 1 != 0
            //         ? formatter.format(fee.Value)
            //         : `${fee.Value}`;
            //     newArray.push({
            //         ...obj,
            //         AppName: appFound?.Name,
            //         EventName: eventFound?.Name,
            //         CustomerName: customerFound?.Name,
            //         ProductName: productFound ? productFound?.Name : '',
            //         CurrencyName: `${currencyFound?.ShortName} - ${currencyFound?.Name}`,
            //         FeeId: fee.Id,
            //         FeeValue: value,
            //         FeeIsPercent: fee.IsPercent,
            //         FeeRangeFrom: fee.Range?.From,
            //         FeeRangeTo: fee.Range?.To,
            //         FeePeriodFrom: fee.Period?.From,
            //         FeePeriodTo: fee.Period?.To,
            //     });
            // });

            newArray.push({
                ...obj,
                AppName: appFound?.Name,
                EventName: eventFound?.Name,
                CustomerName: customerFound?.Name,
                ProductName: productFound ? productFound?.Name : '',
                CurrencyName: `${currencyFound?.ShortName} - ${currencyFound?.Name}`,
                RuleName: `${obj.Id} - ${obj.Name}`,
            });
        });
        console.log('1', newArray);
        return newArray;
    };

    useEffect(() => {
        setApps(mockApps);
        setRules(mockRegras);
        setModulos(mockEventos);
        setCustomer(mockProdutor);
        setProducts(mockProdutos);
        setData(
            createData(
                mockApps,
                mockEventos,
                mockRegras,
                mockProdutor,
                mockProdutos,
                mockMoedas
            )
        );
        setFilteredData(
            createData(
                mockApps,
                mockEventos,
                mockRegras,
                mockProdutor,
                mockProdutos,
                mockMoedas
            )
        );
        console.log('filtered data', filteredData);
        setFilteredModulos(mockEventos);
        setFilteredRules(mockRegras);
        setFilteredApps(mockApps);
    }, []);

    const handleChangeRule = (event: any): void => {
        setRuleId(event.target.value);
        setDataSearch({ ...dataSearch, Id: event.target.value });

        if (event.target.value === 0 && appId === 0) {
            setAppId(0);
            setModuloId(0);
            setDataSearch({ ...dataSearch, EventId: 0, AppId: 0, Id: 0 });
        } else if (event.target.value === 0 && appId !== 0) {
            setAppId(0);
            setDataSearch({ ...dataSearch, EventId: 0, AppId: 0, Id: 0 });
            setFilteredModulos(modulos);
        } else {
            let newDataArray: Array<DataRulesOutput> = [];
            let newAppArray: Array<AppOutput> = [];
            data.map((obj) => {
                if (obj.Id === event.target.value) {
                    newDataArray.push(obj);
                    newAppArray.push({ Id: obj.AppId, Name: obj.AppName });
                }
            });

            setFilteredApps(filterDuplicate(newAppArray));
        }
    };

    const handleChangeApp = (event: any): void => {
        setAppId(event.target.value);
        setModuloId(0);
        setDataSearch({ ...dataSearch, AppId: event.target.value });

        if (event.target.value === 0) {
            setFilteredModulos(modulos);
            setFilteredRules(rules);
            setDataSearch({ ...dataSearch, EventId: 0, AppId: 0 });
            setModuloId(0);
        } else {
            let newDataArray: Array<DataRulesOutput> = [];
            let newEventArray: Array<EventsOutput> = [];
            let newRuleArray: Array<{ Id: number; Name: string }> = [];
            data.map((obj) => {
                if (obj.AppId === event.target.value) {
                    newDataArray.push(obj);
                    newEventArray.push({
                        Id: obj.EventId,
                        Name: obj.EventName,
                    });
                    newRuleArray.push({ Id: obj.Id, Name: obj.Name });
                }
            });

            setFilteredModulos(filterDuplicate(newEventArray));
            setFilteredRules(filterDuplicate(newRuleArray));
        }
    };

    const handleChangeModulo = (event: any): void => {
        setModuloId(event.target.value);
        setDataSearch({ ...dataSearch, EventId: event.target.value });

        if (event.target.value === 0 && appId === 0) {
            setFilteredData(data);
            setAppId(0);
        } else if (event.target.value === 0 && appId !== 0) {
            setAppId(0);
            setFilteredModulos(modulos);
        }
    };

    const handleChangeCustomer = (value: any): void => {
        if (value) {
            setDataSearch({ ...dataSearch, CustomerId: value.Id });

            setCustomerState({ ...customerState, Name: value.Name });
        }
    };

    const handleChangeProduct = (value: any): void => {
        if (value) {
            setDataSearch({ ...dataSearch, ProductId: value.Id });
            setProductState({ ...productState, Name: value.Name });
        }
    };

    const handleChangeValue = (event: any): void => {
        console.log(event.target.value);
        if (event.target.value) {
            setValue(event.target.value);
            setDataSearch({ ...dataSearch, FeeValue: event.target.value });
        } else {
            setValue('');
            setDataSearch({ ...dataSearch, FeeValue: null });
        }
    };

    const handleChangePeriod = (event: any): void => {
        if (event.target.value) {
            setPeriod(event.target.value);
            setDataSearch({
                ...dataSearch,
                FeePeriod: `${new Date(event.target.value).getTime()}`,
            });
        } else {
            setPeriod('');
            setDataSearch({ ...dataSearch, FeePeriod: null });
        }
    };

    const handleChangeCurrency = (event: any): void => {
        setCurrencyId(event.target.value);
        setDataSearch({ ...dataSearch, CurrencyId: event.target.value });
    };

    const searchRules = (): void => {
        console.log(dataSearch);
        // setFeesIsTrue(true);
        // setPeriodIsTrue(true);
        // setClear(false);
        // setWasFound(false);
        // setIsSearching(true);

        let newArray: Array<DataRulesOutput> = data;
        console.log('data', newArray);
        if (dataSearch.Id) {
            if (dataSearch.Id !== 0) {
                newArray = newArray.filter((obj) => obj.Id === dataSearch.Id);
            }
        }
        if (dataSearch.AppId) {
            if (dataSearch.AppId !== 0) {
                newArray = newArray.filter(
                    (obj) => obj.AppId === dataSearch.AppId
                );
            }
        }
        if (dataSearch.EventId) {
            if (dataSearch.EventId !== 0) {
                newArray = newArray.filter(
                    (obj) => obj.EventId === dataSearch.EventId
                );
            }
        }
        if (dataSearch.CustomerId) {
            if (dataSearch.CustomerId !== 0) {
                newArray = newArray.filter(
                    (obj) => obj.Customer?.Id === dataSearch.CustomerId
                );
            }
        }
        if (dataSearch.ProductId) {
            if (dataSearch.ProductId !== 0) {
                newArray = newArray.filter(
                    (obj) => obj.Product?.Id === dataSearch.ProductId
                );
            }
        }
        if (dataSearch.CurrencyId) {
            newArray = newArray.filter(
                (obj) => obj.CurrencyId === dataSearch.CurrencyId
            );
        }

        let arrayWithValue: Array<DataRulesOutput> = [];
        if (dataSearch.FeeValue) {
            newArray.map((obj) => {
                let validatedFees = validateValue(obj);
                console.log('validatedfees', validatedFees);
                if (Array.isArray(validatedFees) && validatedFees.length) {
                    console.log('array with value push');
                    arrayWithValue.push({ ...obj });
                }
            });
        }

        console.log(
            'antes',
            dataSearch.FeePeriod,
            arrayWithValue,
            dataSearch.FeeValue
        );

        let arrayWithPeriod: Array<DataRulesOutput> = [];
        if (
            dataSearch.FeePeriod &&
            !dataSearch.FeeValue &&
            !arrayWithValue.length
        ) {
            console.log('1');
            newArray.map((obj) => {
                let validatedPeriod = validatePeriod(obj);
                console.log('validatedperiod', validatedPeriod);
                if (Array.isArray(validatedPeriod) && validatedPeriod.length) {
                    console.log('array with period push 1');
                    arrayWithPeriod.push({ ...obj });
                }
            });
            console.log('aqui', arrayWithPeriod);
            setFilteredData(arrayWithPeriod);
        } else if (
            dataSearch.FeePeriod &&
            dataSearch.FeeValue &&
            arrayWithValue.length
        ) {
            console.log('2');
            arrayWithValue.map((obj) => {
                let validatedPeriod = validatePeriod(obj);
                console.log('validatedperiod', validatedPeriod);

                if (Array.isArray(validatedPeriod) && validatedPeriod.length) {
                    console.log('array with period push 1');
                    arrayWithPeriod.push({ ...obj });
                }
            });
            setFilteredData(arrayWithPeriod);
        } else if (
            dataSearch.FeePeriod &&
            arrayWithValue === [] &&
            dataSearch.FeeValue
        ) {
            console.log('3');
            setFilteredData([]);
        } else if (!dataSearch.FeePeriod && dataSearch.FeeValue) {
            console.log('4');
            setFilteredData(arrayWithValue);
        } else {
            console.log('5');
            setFilteredData(newArray);
        }

        // setTimeout(() => {
        //     setIsSearching(false);
        //     setWasFound(true);
        // }, 3000);
    };

    const validateValue = (obj: DataRulesOutput) => {
        if (obj) {
            let fees = obj.Fees?.filter((el) => {
                if (dataSearch.FeeValue === undefined) {
                    return el;
                }
                if (el.Range?.From && el.Range?.To) {
                    if (
                        Number(dataSearch.FeeValue) > el.Range?.From &&
                        Number(dataSearch.FeeValue) < el.Range?.To
                    ) {
                        return el;
                    } else {
                        return false;
                    }
                } else if (el.Range?.From && !el.Range?.To) {
                    if (Number(dataSearch.FeeValue) > el.Range?.From) {
                        return el;
                    } else {
                        return false;
                    }
                } else if (!el.Range?.From && el.Range?.To) {
                    if (Number(dataSearch.FeeValue) < el.Range?.To) {
                        return el;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
            return fees;
        }
    };

    const validatePeriod = (obj: DataRulesOutput) => {
        if (obj) {
            let periods = obj.Fees?.filter((el) => {
                if (dataSearch.FeePeriod === undefined) {
                    return el;
                }
                if (el.Period?.From && el.Period?.To) {
                    if (
                        Number(dataSearch.FeePeriod) >
                            new Date(el.Period?.From).getTime() &&
                        Number(dataSearch.FeePeriod) <
                            new Date(el.Period?.To).getTime()
                    ) {
                        return el;
                    } else {
                        return false;
                    }
                } else if (el.Period?.From && !el.Period?.To) {
                    if (
                        Number(dataSearch.FeePeriod) >
                        new Date(el.Period?.From).getTime()
                    ) {
                        return el;
                    } else {
                        return false;
                    }
                } else if (!el.Period?.From && el.Period?.To) {
                    if (
                        Number(dataSearch.FeePeriod) <
                        new Date(el.Period?.To).getTime()
                    ) {
                        return el;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
            return periods;
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

    const filterDuplicate = (arr: any) => {
        return arr.filter(
            (obj: any, index: any, self: any) =>
                index ===
                self.findIndex(
                    (t: any) => t.Id === obj.Id && t.Name === obj.Name
                )
        );
    };

    const clearFields = (): void => {
        setModuloId(0);
        setAppId(0);
        setRuleId(0);
        setPeriod('');
        setValue('');
        setFilteredData(data);
        setFilteredModulos(modulos);
        setFilteredRules(rules);
        setCustomerState({ Id: undefined, Name: '' });
        setProductState({ Id: undefined, Name: '' });
    };

    const editAddRule = (): void => {
        setShowModalEditAdd(true);
        setSending(true);
        setTimeout(() => {
            setSending(false);
        }, 3000);
        setTimeout(() => {
            setShowModalEditAdd(false);
            setIsEditing(false);
            setNameValid(false);
            setRule({ Id: undefined, Name: '', AppId: 0 });
            history.push('/billing/cadastro-modulos');
        }, 5000);
    };

    const handleNewRule = (): void => {
        setOpen(true);
        setNewAppId(0);
        setIsEditing(false);
        setNameValid(false);
        setRule({
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
        setRule({
            Id: id,
            AppId: appId,
            Name: name,
        });
    };

    const handleClose = (): void => {
        setOpen(false);
        setNewAppId(0);
        setIsEditing(false);
        setRule({ Id: undefined, Name: '', AppId: 0 });
    };

    const handleSubmit = (): void => {
        setOpen(false);
        setNewAppId(0);
        editAddRule();
    };

    const handleRuleAppEdit = (event: any): void => {
        setNewAppId(event.target.value);
        setRule({ ...rule, AppId: event.target.value });
    };

    const handleRuleNameEdit = (event: any): void => {
        event.target.value.length > 10
            ? setNameValid(true)
            : setNameValid(false);
        setRule({ ...rule, Name: event.target.value });
    };

    const FormataStringData = (data: any): string => {
        const ano = data.split('-')[0];
        const mes = data.split('-')[1];
        const dia = data.split('-')[2];

        return (
            ('0' + dia).slice(1, 3) + '/' + ('0' + mes).slice(-2) + '/' + ano
        );
    };

    return (
        <>
            <Navbar />
            <div className="cadastro-regras">
                <div className="cadastro-regras__header">
                    <h2>Cadastro de Regras</h2>
                    <Link to="/billing">
                        <Button
                            variant="dark"
                            className="cadastro-regras__header-button"
                        >
                            <FiCornerDownLeft />
                        </Button>
                    </Link>
                </div>

                <div className="cadastro-regras__filter">
                    <div className={`filters `}>
                        <FormControl
                            variant="outlined"
                            className={`${outlinedInputClasses.root} ${outlinedInputClasses.width1}`}
                        >
                            <InputLabel id="rule-input">Regra</InputLabel>
                            <Select
                                labelId="rule-input"
                                id="rule-select"
                                value={ruleId}
                                label="Regra"
                                onChange={handleChangeRule}
                            >
                                <MenuItem value={0}>
                                    <em>Todos</em>
                                </MenuItem>
                                {filteredRules.map((obj) => (
                                    <MenuItem value={obj.Id} key={obj.Id}>
                                        {obj.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            className={`${outlinedInputClasses.root} ${outlinedInputClasses.width1}`}
                        >
                            <InputLabel id="app-input">Aplicativo</InputLabel>
                            <Select
                                labelId="app-input"
                                id="app-select"
                                value={appId}
                                label="Aplicativo"
                                onChange={handleChangeApp}
                            >
                                <MenuItem value={0}>
                                    <em>Todos</em>
                                </MenuItem>
                                {filteredApps.map((obj) => (
                                    <MenuItem value={obj.Id} key={obj.Id}>
                                        {obj.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {openFilter && (
                            <>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.root} ${outlinedInputClasses.width1}`}
                                >
                                    <InputLabel id="modulo-input">
                                        Módulo/Evento
                                    </InputLabel>
                                    <Select
                                        labelId="modulo-input"
                                        id="modulo-select"
                                        value={moduloId}
                                        onChange={handleChangeModulo}
                                        label="Módulo/Evento"
                                        disabled={appId === 0 ? true : false}
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
                                <FormControl
                                    variant="outlined"
                                    className={` ${outlinedInputClasses.root} ${outlinedInputClasses.width1}`}
                                >
                                    <Autocomplete
                                        id="customer-state"
                                        options={customer}
                                        getOptionLabel={(option) =>
                                            `${option.Id} - ${option.Name}`
                                        }
                                        open={autoCompleteOpen}
                                        onChange={(event, value) =>
                                            handleChangeCustomer(value)
                                        }
                                        inputValue={customerState.Name}
                                        onInputChange={(
                                            event,
                                            value,
                                            reason
                                        ) => {
                                            switch (reason) {
                                                case 'input':
                                                    setAutoCompleteOpen(
                                                        !!value
                                                    );

                                                    break;
                                                case 'reset':

                                                case 'clear':
                                                    setAutoCompleteOpen(false);
                                                    if (!value) {
                                                        // setFilteredData(data);
                                                        setDataSearch({
                                                            ...dataSearch,
                                                            CustomerId: 0,
                                                        });
                                                        setCustomerState({
                                                            ...customerState,
                                                            Name: '',
                                                        });
                                                    }

                                                    break;
                                                default:
                                                    console.log(reason);
                                            }
                                        }}
                                        renderOption={(option) => (
                                            <React.Fragment>
                                                {option.Id} - {option.Name}
                                            </React.Fragment>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Produtor"
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setCustomerState({
                                                        ...customerState,
                                                        Name: e.target.value,
                                                    })
                                                }
                                            />
                                        )}
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.root} ${outlinedInputClasses.width1}`}
                                >
                                    <Autocomplete
                                        id="product-state"
                                        options={products}
                                        getOptionLabel={(option) =>
                                            `${option.Id} - ${option.Name}`
                                        }
                                        open={autoCompleteOpenProduct}
                                        onChange={(event, value) =>
                                            handleChangeProduct(value)
                                        }
                                        inputValue={productState.Name}
                                        onInputChange={(
                                            event,
                                            value,
                                            reason
                                        ) => {
                                            switch (reason) {
                                                case 'input':
                                                    setAutoCompleteOpenProduct(
                                                        !!value
                                                    );

                                                    break;
                                                case 'reset':

                                                case 'clear':
                                                    setAutoCompleteOpenProduct(
                                                        false
                                                    );
                                                    if (!value) {
                                                        // setFilteredData(data);
                                                        setDataSearch({
                                                            ...dataSearch,
                                                            ProductId: 0,
                                                        });
                                                        setProductState({
                                                            ...productState,
                                                            Name: '',
                                                        });
                                                    }

                                                    break;
                                                default:
                                                    console.log(reason);
                                            }
                                        }}
                                        renderOption={(option) => (
                                            <React.Fragment>
                                                {option.Id} - {option.Name}
                                            </React.Fragment>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Produto"
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setProductState({
                                                        ...productState,
                                                        Name: e.target.value,
                                                    })
                                                }
                                            />
                                        )}
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.width1} ${outlinedInputClasses.root}`}
                                >
                                    <TextField
                                        id="value"
                                        label="Valor"
                                        value={value}
                                        type="number"
                                        placeholder="Valor (1,00) ou Quantidade (1)"
                                        onChange={handleChangeValue}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.width1} ${outlinedInputClasses.root}`}
                                >
                                    <TextField
                                        id="value"
                                        label="Data"
                                        value={
                                            period
                                                ? period
                                                : new Date()
                                                      .toISOString()
                                                      .slice(0, 16)
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        type="datetime-local"
                                        onChange={handleChangePeriod}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.root} ${outlinedInputClasses.width1}`}
                                >
                                    <InputLabel id="currency-input">
                                        Moeda
                                    </InputLabel>
                                    <Select
                                        labelId="currency-input"
                                        id="currency-select"
                                        value={currencyId}
                                        label="Moeda"
                                        onChange={handleChangeCurrency}
                                    >
                                        <MenuItem value={1}>
                                            <em>R$ - Real</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </>
                        )}
                        <div
                            className={` ${outlinedInputClasses.root} ${outlinedInputClasses.width1} open-filter`}
                        >
                            <Tooltip title="Limpar Campos">
                                <IconButton
                                    aria-label="clear"
                                    onClick={clearFields}
                                    className="clear-button"
                                >
                                    <FaEraser fontSize="medium" />
                                </IconButton>
                            </Tooltip>
                            <div className="cadastro-regras__filter-search">
                                <Tooltip
                                    title={
                                        openFilter
                                            ? 'Fechar Filtro Avançado'
                                            : 'Abrir Filtro Avançado'
                                    }
                                >
                                    <IconButton
                                        aria-label="filter"
                                        onClick={() => {
                                            if (openFilter) {
                                                setOpenFilter(false);
                                            } else {
                                                setOpenFilter(true);
                                            }
                                        }}
                                        className="clear-button"
                                    >
                                        <FaFilter fontSize="medium" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            {!openFilter && (
                                <>
                                    <div className="cadastro-regras__filter-search">
                                        <Tooltip title="Pesquisar Regra">
                                            <IconButton
                                                aria-label="search"
                                                onClick={searchRules}
                                                className="search-button"
                                            >
                                                <FaSearch fontSize="medium" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div className="cadastro-regras__filter-search">
                                        <Tooltip title="Nova Regra">
                                            <IconButton
                                                aria-label="search"
                                                onClick={handleNewRule}
                                                className="search-button"
                                            >
                                                <FaPlus fontSize="medium" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {openFilter && (
                        <div className="cadastro-regras__filter-buttons">
                            <div style={{ width: '225px' }}></div>
                            <div style={{ width: '225px' }}>
                                <div className="cadastro-regras__filter-new">
                                    <Button
                                        onClick={searchRules}
                                        className="new-button"
                                    >
                                        <p>Pesquisar</p>
                                        <FaSearch fontSize="medium" />
                                    </Button>
                                </div>
                            </div>
                            <div style={{ width: '225px' }}>
                                <div className="cadastro-regras__filter-new">
                                    <Button
                                        onClick={handleNewRule}
                                        className="new-button"
                                    >
                                        <p>Nova Regra</p>
                                        <FaPlus fontSize="medium" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {filteredData.length === 0 ? (
                    <div className="cadastro-regras__not-found">
                        <p>Resultado não encontrado para a procura desejada!</p>
                        <FaRegFrown />
                    </div>
                ) : (
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
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
                                                            minWidth:
                                                                column.minWidth,
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ) : (
                                                    <TableCell
                                                        key={`${column.id}-${index}`}
                                                        align={column.align}
                                                        style={{
                                                            minWidth:
                                                                column.minWidth,
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
                                                        (
                                                            column: any,
                                                            index
                                                        ) => {
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
                                                                            <Tooltip title="Editar Regra">
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
                                                                        </TableCell>
                                                                    ) : (
                                                                        <TableCell
                                                                            key={`${column.id}-${index}`}
                                                                            align={
                                                                                column.align
                                                                            }
                                                                        >
                                                                            {value ===
                                                                                null ||
                                                                            value ===
                                                                                ''
                                                                                ? 'Indefinido'
                                                                                : // : column.id ===
                                                                                  //       'FeePeriodFrom' ||
                                                                                  //   column.id ===
                                                                                  //       'FeePeriodTo'
                                                                                  // ? FormataStringData(
                                                                                  //       value
                                                                                  //   )
                                                                                  value}
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
                )}
            </div>
            {showModalEditAdd && (
                <ModalSuccessComponent
                    show={showModalEditAdd}
                    editFalse={'nova Regra'}
                    editTrue={'Regra'}
                    isEditing={isEditing}
                    sending={sending}
                />
            )}
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {rule.Id ? 'Editar Regra' : 'Nova Regra'}
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
                                onChange={handleRuleAppEdit}
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
                                id="outlined-rule"
                                label="Regra"
                                value={rule.Name}
                                onChange={handleRuleNameEdit}
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

export default CadastroRegras;
