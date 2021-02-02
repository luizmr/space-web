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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
    FiBarChart,
    FiCornerDownLeft,
    FiCornerDownRight,
    FiPlusCircle,
} from 'react-icons/fi';
import {
    FaEdit,
    FaPlus,
    FaTrashAlt,
    FaEraser,
    FaRegFrown,
    FaSearch,
    FaFilter,
    FaChevronUp,
    FaDonate,
    FaCalendarAlt,
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
    Box,
    Typography,
    Tab,
    Tabs,
    AppBar,
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
        [theme.breakpoints.up('sm')]: {
            width: '45% !important',
        },
        [theme.breakpoints.up('md')]: {
            width: '225px !important',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    width2: {
        width: 300,
    },
    width3: {
        width: 200,
    },
});

const useStyles = makeStyles({
    tabRoot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        minHeight: 400,
        width: '100%',
    },
    container: {
        minHeight: 350,
    },
    cardRoot: {
        minWidth: '250px !important',
        marginBottom: 20,
    },
});

const columns = [
    { id: 'acoes', label: 'Ações', width: 50 },
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
];

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

function CadastroRegras() {
    const history = useHistory();
    const classes = useStyles();
    const outlinedInputClasses = useOutlinedInputStyles();
    const [tabValue, setTabValue] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const [ruleName, setRuleName] = useState<string>('');
    const [rules, setRules] = useState<Array<RegrasOutput>>([]);

    const [appId, setAppId] = useState<number>(0);
    const [newAppId, setNewAppId] = useState<number>(0);
    const [oldAppId, setOldAppId] = useState<number>(0);
    const [moduloId, setModuloId] = useState<number>(0);
    const [newModuloId, setNewModuloId] = useState<number>(0);
    const [oldModuloId, setOldModuloId] = useState<number>(0);
    const [apps, setApps] = useState<Array<AppOutput>>([]);
    const [filteredApps, setFilteredApps] = useState<Array<AppOutput>>([]);
    const [data, setData] = useState<Array<DataRulesOutput>>([]);
    const [filteredData, setFilteredData] = useState<Array<DataRulesOutput>>(
        []
    );
    const [filteredModulos, setFilteredModulos] = useState<Array<EventsOutput>>(
        []
    );
    const [newFilteredModulos, setNewFilteredModulos] = useState<
        Array<EventsOutput>
    >([]);
    const [oldFilteredModulos, setOldFilteredModulos] = useState<
        Array<EventsOutput>
    >([]);
    const [modulos, setModulos] = useState<Array<EventsOutput>>([]);
    const [showModalEditAdd, setShowModalEditAdd] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [ruleEditing, setRuleEditing] = useState<boolean>(false);
    const [ruleNew, setRuleNew] = useState<boolean>(false);
    const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);

    const [sending, setSending] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [rule, setRule] = useState<RegrasOutput>({
        Name: '',
        AppId: 0,
        EventId: 0,
        CurrencyId: 1,
        Customer: null,
        Product: null,
        Fees: [],
        Id: undefined,
    });
    const [oldRule, setOldRule] = useState<any>({});
    const [currencyId, setCurrencyId] = useState<number>(1);
    const [isPercent, setIsPercent] = useState<number>(0);
    const [newCurrencyId, setNewCurrencyId] = useState<number>(1);
    const [customer, setCustomer] = useState<Array<ProdutorOutput>>([]);
    const [autoCompleteOpen, setAutoCompleteOpen] = useState<boolean>(false);
    const [editAutoCompleteOpen, setEditAutoCompleteOpen] = useState<boolean>(
        false
    );
    const [
        autoCompleteOpenProduct,
        setAutoCompleteOpenProduct,
    ] = useState<boolean>(false);
    const [
        editAutoCompleteOpenProduct,
        setEditAutoCompleteOpenProduct,
    ] = useState<boolean>(false);
    const [customerState, setCustomerState] = useState<any>({
        Id: undefined,
        Name: '',
    });
    const [editCustomerState, setEditCustomerState] = useState<any>({
        Id: undefined,
        Name: '',
    });
    const [oldEditCustomerState, setOldEditCustomerState] = useState<any>({
        Id: undefined,
        Name: '',
    });
    const [products, setProducts] = useState<Array<ProdutoOutput>>([]);
    const [productState, setProductState] = useState<any>({
        Id: undefined,
        Name: '',
    });
    const [editProductState, setEditProductState] = useState<any>({
        Id: undefined,
        Name: '',
    });
    const [oldEditProductState, setOldEditProductState] = useState<any>({
        Id: undefined,
        Name: '',
    });
    const [value, setValue] = useState<string>('');
    const [feeValue, setFeeValue] = useState<string>('');
    const [feeValueFrom, setFeeValueFrom] = useState<string>('');
    const [feeValueTo, setFeeValueTo] = useState<string>('');
    const [period, setPeriod] = useState<string>('');
    const [periodFrom, setPeriodFrom] = useState<string>('');
    const [periodTo, setPeriodTo] = useState<string>('');
    const [dataSearch, setDataSearch] = useState<DataRulesSearchOutput>({});
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [feeObject, setFeeObject] = useState<FeeOutput>({
        Id: undefined,
        Value: undefined,
        IsPercent: false,
        Range: {
            From: null,
            To: null,
        },
        Period: { From: null, To: null },
    });
    const [feesArray, setFeesArray] = useState<Array<FeeOutput> | undefined>(
        []
    );
    const [oldFeesArray, setOldFeesArray] = useState<
        Array<FeeOutput> | undefined
    >([]);

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
        rules.forEach((obj: RegrasOutput) => {
            let appFound = app.find((el: AppOutput) => el.Id === obj.AppId);
            let eventFound = events.find(
                (el: EventsOutput) => el.Id === obj.EventId
            );
            let customerFound = customer.find(
                (el: ProdutorOutput) => el.Id === obj.Customer?.Id
            );
            let productFound = product.find(
                (el: ProdutoOutput) => el.Id === obj.Product?.Id
            );
            let currencyFound = currency.find(
                (el: MoedasOutput) => el.Id === obj.CurrencyId
            );

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

        setFilteredModulos(mockEventos);

        setFilteredApps(mockApps);
    }, []);

    const handleChangeRule = (event: any): void => {
        const {
            target: { value },
        } = event;

        setRuleName(value);
        setDataSearch({ ...dataSearch, Name: value });

        if (value === '' && appId === 0) {
            setAppId(0);
            setModuloId(0);
            setDataSearch({
                ...dataSearch,
                EventId: 0,
                AppId: 0,
                Id: 0,
                Name: '',
            });
        } else if (value === '' && appId !== 0) {
            setAppId(0);
            setDataSearch({
                ...dataSearch,
                EventId: 0,
                AppId: 0,
                Id: 0,
                Name: '',
            });
            setFilteredModulos(modulos);
        } else {
            let newDataArray: Array<DataRulesOutput> = [];
            let newAppArray: Array<AppOutput> = [];
            data.forEach((obj) => {
                if (obj.Name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                    newDataArray.push(obj);
                    newAppArray.push({ Id: obj.AppId, Name: obj.AppName });
                }
            });

            setFilteredApps(filterDuplicate(newAppArray));
        }
    };

    const handleChangeApp = (event: any): void => {
        const {
            target: { value },
        } = event;
        setAppId(value);
        setModuloId(0);
        setDataSearch({ ...dataSearch, AppId: value });

        if (event.target.value === 0) {
            setFilteredModulos(modulos);
            setDataSearch({ ...dataSearch, EventId: 0, AppId: 0 });
            setModuloId(0);
        } else {
            let newDataArray: Array<DataRulesOutput> = [];
            let newEventArray: Array<EventsOutput> = [];
            let newRuleArray: Array<{ Id: number; Name: string }> = [];
            data.forEach((obj) => {
                if (obj.AppId === value) {
                    newDataArray.push(obj);
                    newEventArray.push({
                        Id: obj.EventId,
                        Name: obj.EventName,
                    });
                    newRuleArray.push({ Id: obj.Id!, Name: obj.Name });
                }
            });

            setFilteredModulos(filterDuplicate(newEventArray));
        }
    };

    const handleChangeModulo = (event: any): void => {
        const {
            target: { value },
        } = event;
        setModuloId(value);
        setDataSearch({ ...dataSearch, EventId: value });

        if (value === 0 && appId === 0) {
            setFilteredData(data);
            setAppId(0);
        } else if (value === 0 && appId !== 0) {
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
        const {
            target: { value },
        } = event;
        if (value) {
            setValue(value);
            setDataSearch({ ...dataSearch, FeeValue: value });
        } else {
            setValue('');
            setDataSearch({ ...dataSearch, FeeValue: null });
        }
    };

    const handleChangePeriod = (event: any): void => {
        const {
            target: { value },
        } = event;
        if (value) {
            setPeriod(value);
            setDataSearch({
                ...dataSearch,
                FeePeriod: `${new Date(value).getTime()}`,
            });
        } else {
            setPeriod('');
            setDataSearch({ ...dataSearch, FeePeriod: null });
        }
    };

    const handleChangeCurrency = (event: any): void => {
        const {
            target: { value },
        } = event;
        setCurrencyId(value);
        setDataSearch({ ...dataSearch, CurrencyId: value });
    };

    const searchRules = (): void => {
        let newArray: Array<DataRulesOutput> = data;

        if (dataSearch.Name) {
            if (dataSearch.Name !== '') {
                newArray = newArray.filter(
                    (obj) =>
                        obj.Name.toLowerCase().indexOf(
                            dataSearch.Name!.toLowerCase()
                        ) > -1
                );
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
            newArray.forEach((obj) => {
                let validatedFees = validateValue(obj);

                if (Array.isArray(validatedFees) && validatedFees.length) {
                    arrayWithValue.push({ ...obj });
                }
            });
        }

        let arrayWithPeriod: Array<DataRulesOutput> = [];
        if (
            dataSearch.FeePeriod &&
            !dataSearch.FeeValue &&
            !arrayWithValue.length
        ) {
            newArray.forEach((obj) => {
                let validatedPeriod = validatePeriod(obj);

                if (Array.isArray(validatedPeriod) && validatedPeriod.length) {
                    arrayWithPeriod.push({ ...obj });
                }
            });

            setFilteredData(arrayWithPeriod);
        } else if (
            dataSearch.FeePeriod &&
            dataSearch.FeeValue &&
            arrayWithValue.length
        ) {
            arrayWithValue.forEach((obj) => {
                let validatedPeriod = validatePeriod(obj);

                if (Array.isArray(validatedPeriod) && validatedPeriod.length) {
                    arrayWithPeriod.push({ ...obj });
                }
            });
            setFilteredData(arrayWithPeriod);
        } else if (
            dataSearch.FeePeriod &&
            arrayWithValue === [] &&
            dataSearch.FeeValue
        ) {
            setFilteredData([]);
        } else if (!dataSearch.FeePeriod && dataSearch.FeeValue) {
            setFilteredData(arrayWithValue);
        } else {
            setFilteredData(newArray);
        }
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

        setPeriod('');
        setValue('');
        setFilteredData(data);
        setFilteredModulos(modulos);

        setRuleName('');
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
            setRuleEditing(false);
            setRuleNew(false);

            setRule({
                Id: undefined,
                Name: '',
                AppId: 0,
                EventId: 0,
                CurrencyId: 1,
                Customer: null,
                Product: null,
                Fees: [],
            });
            history.push('/billing/cadastro-regras');
        }, 5000);
    };

    const handleNewRule = (): void => {
        setOpen(true);
        setNewAppId(0);
        setIsEditing(false);
        setRuleEditing(false);
        setRuleNew(true);

        setRule({
            Id: undefined,
            Name: '',
            AppId: 0,
            EventId: 0,
            CurrencyId: 1,
            Customer: null,
            Product: null,
            Fees: [],
        });
        setEditCustomerState({ Id: undefined, Name: '' });
        setEditProductState({ Id: undefined, Name: '' });
        setNewFilteredModulos(modulos);
        setInputsDisabled(false);
    };

    const handleEditRule = (id: number): void => {
        setOpen(true);
        setRuleNew(false);

        setIsEditing(true);
        setInputsDisabled(true);
        let ruleEdit = rules.find((obj) => obj.Id === id);
        setRule(ruleEdit!);
        setOldRule(ruleEdit!);
        setNewAppId(ruleEdit?.AppId!);
        setNewModuloId(ruleEdit?.EventId!);
        setOldAppId(ruleEdit?.AppId!);
        setOldModuloId(ruleEdit?.EventId!);
        setNewFilteredModulos(
            modulos.filter((obj) => obj.Id === ruleEdit?.EventId!)
        );
        setOldFilteredModulos(
            modulos.filter((obj) => obj.Id === ruleEdit?.EventId!)
        );
        setEditCustomerState({
            ...editCustomerState,
            Name: ruleEdit?.Customer?.Name,
        });
        setEditProductState({
            ...editProductState,
            Name: ruleEdit?.Product?.Name,
        });
        setOldEditCustomerState({
            ...editCustomerState,
            Name: ruleEdit?.Customer?.Name,
        });
        setOldEditProductState({
            ...editProductState,
            Name: ruleEdit?.Product?.Name,
        });
        setFeesArray(ruleEdit?.Fees);
        setOldFeesArray(ruleEdit?.Fees);
    };

    const startEditing = (): void => {
        setRuleEditing(true);
        setInputsDisabled(false);
    };

    const cancelEditing = (): void => {
        setRuleEditing(false);
        setInputsDisabled(true);
        setRule(oldRule);
        setNewAppId(oldAppId);
        setNewModuloId(oldModuloId);
        setNewFilteredModulos(oldFilteredModulos);
        setEditCustomerState(oldEditCustomerState);
        setEditProductState(oldEditProductState);
        setFeesArray(oldFeesArray);
    };

    const handleClose = (): void => {
        setRuleNew(false);
        setInputsDisabled(true);
        setOpen(false);
        setNewAppId(0);
        setIsEditing(false);
        setRuleEditing(false);
        setRule({
            Id: undefined,
            Name: '',
            AppId: 0,
            EventId: 0,
            CurrencyId: 1,
            Customer: null,
            Product: null,
            Fees: [],
        });
        setEditCustomerState({ Id: undefined, Name: '' });
        setEditProductState({ Id: undefined, Name: '' });
        setFeesArray([]);
    };

    const handleSubmit = (): void => {
        setOpen(false);
        setFeesArray([]);
        setNewAppId(0);
        editAddRule();
    };

    const handleRuleAppEdit = (event: any): void => {
        const {
            target: { value },
        } = event;
        setNewAppId(value);
        setNewModuloId(0);
        setRule({ ...rule, AppId: value });

        if (value === 0) {
            setNewFilteredModulos(modulos);
            setNewModuloId(0);
        } else {
            let newEventArray: Array<EventsOutput> = [];

            data.forEach((obj) => {
                if (obj.AppId === value) {
                    newEventArray.push({
                        Id: obj.EventId,
                        Name: obj.EventName,
                    });
                }
            });

            setNewFilteredModulos(filterDuplicate(newEventArray));
        }
    };

    const handleRuleNameEdit = (event: any): void => {
        setRule({ ...rule, Name: event.target.value });
    };

    const handleRuleModuloEdit = (event: any): void => {
        const {
            target: { value },
        } = event;
        setNewModuloId(value);
        setRule({ ...rule, EventId: value });

        if (value === 0 && newAppId === 0) {
            setNewAppId(0);
        } else if (value === 0 && newAppId !== 0) {
            setNewAppId(0);
            setNewFilteredModulos(modulos);
        }
    };

    const handleRuleCurrencyEdit = (event: any): void => {
        const {
            target: { value },
        } = event;
        setNewCurrencyId(value);
        setRule({ ...rule, CurrencyId: value });
    };

    const handleRuleCustomerEdit = (value: any): void => {
        if (value) {
            setRule({ ...rule, Customer: value });
            setEditCustomerState({ Id: value.Id, Name: value.Name });
        }
    };

    const handleRuleProductEdit = (value: any): void => {
        if (value) {
            setRule({ ...rule, Product: value });
            setEditProductState({ Id: value.Id, Name: value.Name });
        }
    };

    const handleFeeValueEdit = (event: any): void => {
        const {
            target: { value },
        } = event;

        setFeeValue(value);
        setFeeObject({ ...feeObject, Value: value });
    };

    const handleFeeIsPercent = (event: any): void => {
        if (event.target.value === 0) {
            setIsPercent(0);
            setFeeObject({ ...feeObject, IsPercent: false });
        } else {
            setIsPercent(1);
            setFeeObject({ ...feeObject, IsPercent: true });
        }
    };

    const handleFeeValueFromEdit = (event: any): void => {
        const {
            target: { value },
        } = event;
        if (value) {
            setFeeValueFrom(value);
            setFeeObject({
                ...feeObject,
                Range: { ...feeObject.Range, From: value },
            });
        } else {
            setFeeValueFrom('');
            setFeeObject({
                ...feeObject,
                Range: { ...feeObject.Range, From: null },
            });
        }
    };

    const handleFeeValueToEdit = (event: any): void => {
        const {
            target: { value },
        } = event;
        if (value) {
            setFeeValueTo(value);
            setFeeObject({
                ...feeObject,
                Range: { ...feeObject.Range, To: value },
            });
        } else {
            setFeeValueTo('');
            setFeeObject({
                ...feeObject,
                Range: { ...feeObject.Range, To: null },
            });
        }
    };

    const handleFeePeriodFromEdit = (event: any): void => {
        const {
            target: { value },
        } = event;
        if (value) {
            setPeriodFrom(value);
            setFeeObject({
                ...feeObject,
                Period: { ...feeObject.Period, From: value },
            });
        } else {
            setPeriodFrom('');
            setFeeObject({
                ...feeObject,
                Period: { ...feeObject.Period, From: null },
            });
        }
    };

    const handleFeePeriodToEdit = (event: any): void => {
        const {
            target: { value },
        } = event;
        if (value) {
            setPeriodTo(value);
            setFeeObject({
                ...feeObject,
                Period: { ...feeObject.Period, To: value },
            });
        } else {
            setPeriodTo('');
            setFeeObject({
                ...feeObject,
                Period: { ...feeObject.Period, To: null },
            });
        }
    };

    const editFee = (i: number): void => {
        let feeObjectEdit = feesArray?.find((obj, index) => index === i);

        setFeeObject(feeObjectEdit!);
        setFeeValue(`${feeObjectEdit?.Value}`);
        setIsPercent(feeObjectEdit?.IsPercent ? 1 : 0);
        setFeeValueFrom(`${feeObjectEdit?.Range?.From}`);
        setFeeValueTo(`${feeObjectEdit?.Range?.To}`);
        if (feeObjectEdit?.Period?.From !== null) {
            setPeriodFrom(
                `${new Date(`${feeObjectEdit?.Period?.From}`)
                    .toISOString()
                    .slice(0, 16)}`
            );
        }
        if (feeObjectEdit?.Period?.To !== null) {
            setPeriodTo(
                `${new Date(`${feeObjectEdit?.Period?.To}`)
                    .toISOString()
                    .slice(0, 16)}`
            );
        }
    };

    const removeFee = (i: number): void => {
        let newFeeArray = feesArray?.filter((obj, index) => index !== i);

        setFeesArray(newFeeArray);
    };

    const cancelEditFee = (): void => {
        setFeeObject({
            Id: undefined,
            Value: undefined,
            IsPercent: false,
            Range: {
                From: null,
                To: null,
            },
            Period: { From: null, To: null },
        });
        setFeeValue('');
        setIsPercent(0);
        setFeeValueFrom('');
        setFeeValueTo('');

        setPeriodFrom('');

        setPeriodTo('');
    };

    const newEditFee = (): void => {
        let newFeesArray: Array<FeeOutput> = [];
        feesArray?.forEach((el) => {
            if (el.Id === feeObject.Id) {
                newFeesArray.push(feeObject);
            } else {
                newFeesArray.push(el);
            }
        });

        setFeesArray(newFeesArray);

        cancelEditFee();
    };

    const newFee = (): void => {
        let newFeesArray: any = feesArray;

        let lastElement = feesArray?.length
            ? feesArray?.slice(-1)[0]
            : { Id: 0 };

        newFeesArray.push({
            ...feeObject,
            Id: lastElement.Id !== 0 ? lastElement.Id! + 1 : 1,
        });

        setFeesArray(newFeesArray);

        cancelEditFee();
    };

    const FormataStringData = (data: any): string => {
        const ano = data.split('-')[0];
        const mes = data.split('-')[1];
        const dia = data.split('-')[2];

        return (
            ('0' + dia).slice(1, 3) + '/' + ('0' + mes).slice(-2) + '/' + ano
        );
    };

    const handleChangeTabValue = (event: any, newValue: number): void => {
        setTabValue(newValue);
    };

    const mediaQuery = () => window.matchMedia('(max-width: 430px)').matches;

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
                            className={`${outlinedInputClasses.width1} ${outlinedInputClasses.root}`}
                        >
                            <TextField
                                id="rule"
                                label="Regra"
                                value={ruleName}
                                onChange={handleChangeRule}
                                variant="outlined"
                            />
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
                                        id="date"
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
                                        style={
                                            openFilter
                                                ? { backgroundColor: '#DE3E44' }
                                                : { backgroundColor: '#343a40' }
                                        }
                                        onClick={() => {
                                            if (openFilter) {
                                                setOpenFilter(false);
                                            } else {
                                                setOpenFilter(true);
                                            }
                                        }}
                                    >
                                        {openFilter ? (
                                            <FaChevronUp fontSize="medium" />
                                        ) : (
                                            <FaFilter fontSize="medium" />
                                        )}
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
                    <Paper>
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
                                                                            <Tooltip title="Detalhes">
                                                                                <IconButton
                                                                                    aria-label="edit"
                                                                                    onClick={() =>
                                                                                        handleEditRule(
                                                                                            row[
                                                                                                'Id'
                                                                                            ]
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <FiPlusCircle fontSize="large" />
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
                                                                                : value}
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
                    <div className={classes.tabRoot}>
                        <AppBar
                            position="static"
                            style={{
                                background: 'transparent',
                                boxShadow: 'none',
                                color: '#343a40',
                            }}
                        >
                            <Tabs
                                value={tabValue}
                                onChange={handleChangeTabValue}
                                aria-label="tabs-data"
                                scrollButtons={mediaQuery() ? 'on' : 'auto'}
                                variant="scrollable"
                            >
                                <Tab label="Dados Básicos" {...a11yProps(0)} />
                                <Tab
                                    label="Produtor / Produto"
                                    {...a11yProps(1)}
                                />
                                <Tab label="Taxas" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel
                            value={tabValue}
                            index={0}
                            className="dialog-form"
                        >
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
                                        disabled={inputsDisabled}
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.root} ${outlinedInputClasses.width2}`}
                                >
                                    <InputLabel id="app-dialog">
                                        Aplicativo
                                    </InputLabel>
                                    <Select
                                        labelId="app-dialog"
                                        id="app-select-dialog"
                                        value={newAppId}
                                        label="Aplicativo"
                                        onChange={handleRuleAppEdit}
                                        fullWidth
                                        disabled={inputsDisabled}
                                    >
                                        <MenuItem value={0}>
                                            <em>Todos</em>
                                        </MenuItem>
                                        {apps.map((obj) => (
                                            <MenuItem
                                                value={obj.Id}
                                                key={obj.Id}
                                            >
                                                {obj.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.root} ${outlinedInputClasses.width2}`}
                                >
                                    <InputLabel id="modulo-input">
                                        Módulo/Evento
                                    </InputLabel>
                                    <Select
                                        labelId="modulo-input"
                                        id="modulo-select"
                                        value={newModuloId}
                                        onChange={handleRuleModuloEdit}
                                        label="Módulo/Evento"
                                        disabled={
                                            newAppId === 0 || inputsDisabled
                                                ? true
                                                : false
                                        }
                                    >
                                        <MenuItem value={0}>
                                            <em>Todos</em>
                                        </MenuItem>

                                        {newFilteredModulos.map((el: any) => (
                                            <MenuItem value={el.Id} key={el.Id}>
                                                <FiCornerDownRight className="mr-2" />{' '}
                                                {el.Name}
                                            </MenuItem>
                                        ))}
                                        {newFilteredModulos.length === 0 && (
                                            <ListSubheader value={0}>
                                                Sem Módulos/Eventos
                                            </ListSubheader>
                                        )}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.root} ${outlinedInputClasses.width2}`}
                                >
                                    <InputLabel id="currency-input">
                                        Moeda
                                    </InputLabel>
                                    <Select
                                        labelId="currency-input"
                                        id="currency-select"
                                        value={newCurrencyId}
                                        label="Moeda"
                                        onChange={handleRuleCurrencyEdit}
                                        disabled={inputsDisabled}
                                    >
                                        <MenuItem value={1}>
                                            <em>R$ - Real</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </TabPanel>
                        <TabPanel
                            value={tabValue}
                            index={1}
                            className="dialog-form"
                        >
                            <FormControl
                                variant="outlined"
                                className={` ${outlinedInputClasses.root} ${outlinedInputClasses.width2}`}
                            >
                                <Autocomplete
                                    disabled={inputsDisabled}
                                    id="customer-state-edit"
                                    options={customer}
                                    getOptionLabel={(option) =>
                                        `${option.Id} - ${option.Name}`
                                    }
                                    open={editAutoCompleteOpen}
                                    onChange={(event, value) =>
                                        handleRuleCustomerEdit(value)
                                    }
                                    inputValue={editCustomerState.Name}
                                    onInputChange={(event, value, reason) => {
                                        switch (reason) {
                                            case 'input':
                                                setEditAutoCompleteOpen(
                                                    !!value
                                                );

                                                break;
                                            case 'reset':
                                                setEditCustomerState({
                                                    ...editCustomerState,
                                                });
                                                setEditAutoCompleteOpen(false);
                                                break;
                                            case 'clear':
                                                setEditAutoCompleteOpen(false);

                                                if (!value) {
                                                    setFilteredData(data);
                                                    setRule({
                                                        ...rule,
                                                        Customer: null,
                                                    });
                                                    setEditCustomerState({
                                                        Id: undefined,
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
                                                setEditCustomerState({
                                                    ...editCustomerState,
                                                    Name: e.target.value,
                                                })
                                            }
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className={` ${outlinedInputClasses.root} ${outlinedInputClasses.width2}`}
                            >
                                <Autocomplete
                                    id="product-state-edit"
                                    disabled={inputsDisabled}
                                    options={products}
                                    getOptionLabel={(option) =>
                                        `${option.Id} - ${option.Name}`
                                    }
                                    open={editAutoCompleteOpenProduct}
                                    onChange={(event, value) =>
                                        handleRuleProductEdit(value)
                                    }
                                    inputValue={editProductState.Name}
                                    onInputChange={(event, value, reason) => {
                                        switch (reason) {
                                            case 'input':
                                                setEditAutoCompleteOpenProduct(
                                                    !!value
                                                );

                                                break;
                                            case 'reset':
                                                setEditProductState({
                                                    ...editProductState,
                                                });
                                                setEditAutoCompleteOpenProduct(
                                                    false
                                                );
                                                break;
                                            case 'clear':
                                                setEditAutoCompleteOpenProduct(
                                                    false
                                                );

                                                if (!value) {
                                                    setFilteredData(data);
                                                    setRule({
                                                        ...rule,
                                                        Product: null,
                                                    });
                                                    setEditProductState({
                                                        Id: undefined,
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
                                                setEditProductState({
                                                    ...editProductState,
                                                    Name: e.target.value,
                                                })
                                            }
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl
                                className={`${outlinedInputClasses.width2} ${outlinedInputClasses.root}`}
                                style={{ visibility: 'hidden' }}
                            >
                                <TextField />
                            </FormControl>
                        </TabPanel>
                        <TabPanel
                            value={tabValue}
                            index={2}
                            className="dialog-form"
                        >
                            <div className="part-form">
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.width3} ${outlinedInputClasses.root}`}
                                >
                                    <TextField
                                        id="value-edit"
                                        disabled={inputsDisabled}
                                        label="Valor"
                                        value={feeValue}
                                        type="number"
                                        placeholder="Valor (1,00) ou Quantidade (1)"
                                        onChange={handleFeeValueEdit}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.root} ${outlinedInputClasses.width3}`}
                                >
                                    <InputLabel id="percent-input">
                                        É %?
                                    </InputLabel>
                                    <Select
                                        disabled={inputsDisabled}
                                        labelId="percent-input"
                                        id="percent-select"
                                        value={isPercent}
                                        label="É %?"
                                        onChange={handleFeeIsPercent}
                                    >
                                        <MenuItem value={0}>
                                            <em>Não</em>
                                        </MenuItem>
                                        <MenuItem value={1}>
                                            <em>Sim</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="part-form">
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.width3} ${outlinedInputClasses.root}`}
                                >
                                    <TextField
                                        disabled={inputsDisabled}
                                        id="value-from"
                                        label="Range De"
                                        value={feeValueFrom}
                                        type="number"
                                        placeholder={
                                            feeValueFrom === null
                                                ? 'Indefinido'
                                                : feeValueFrom
                                                ? feeValueFrom
                                                : 'Valor (1,00) ou Quantidade (1)'
                                        }
                                        onChange={handleFeeValueFromEdit}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.width3} ${outlinedInputClasses.root}`}
                                >
                                    <TextField
                                        disabled={inputsDisabled}
                                        id="value-to"
                                        label="Range Para"
                                        value={feeValueTo}
                                        type="number"
                                        placeholder={
                                            feeValueTo === null
                                                ? 'Indefinido'
                                                : feeValueTo
                                                ? feeValueTo
                                                : 'Valor (1,00) ou Quantidade (1)'
                                        }
                                        onChange={handleFeeValueToEdit}
                                        variant="outlined"
                                    />
                                </FormControl>
                            </div>
                            <div className="part-form">
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.width3} ${outlinedInputClasses.root}`}
                                >
                                    <TextField
                                        disabled={inputsDisabled}
                                        id="period-from"
                                        label="Período De"
                                        value={periodFrom ? periodFrom : ''}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        type="datetime-local"
                                        onChange={handleFeePeriodFromEdit}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={`${outlinedInputClasses.width3} ${outlinedInputClasses.root}`}
                                >
                                    <TextField
                                        disabled={inputsDisabled}
                                        id="period-to"
                                        label="Período Para"
                                        value={periodTo ? periodTo : ''}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        type="datetime-local"
                                        onChange={handleFeePeriodToEdit}
                                        variant="outlined"
                                    />
                                </FormControl>
                            </div>
                            <div className="part-form">
                                {feeObject.Id ? (
                                    <Button
                                        className="button-cancel"
                                        onClick={cancelEditFee}
                                    >
                                        <span>Cancelar</span>
                                    </Button>
                                ) : (
                                    <span></span>
                                )}

                                {feeObject.Id ? (
                                    <Button onClick={newEditFee}>
                                        <span>Editar</span>
                                        <FaEdit />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={newFee}
                                        disabled={inputsDisabled}
                                    >
                                        <span>Adicionar</span>
                                        <FaPlus />
                                    </Button>
                                )}
                            </div>
                            <div className="cards-fees">
                                {feesArray?.length ? (
                                    <>
                                        {feesArray?.map((el, index) => (
                                            <Card
                                                className={classes.cardRoot}
                                                variant="outlined"
                                                key={el.Id}
                                            >
                                                <CardContent>
                                                    <div className="header-div">
                                                        <Typography
                                                            className="card-title"
                                                            variant="h6"
                                                        >
                                                            <FaDonate className="mr-2" />{' '}
                                                            Taxa {index + 1}
                                                        </Typography>
                                                        <div>
                                                            <Tooltip title="Editar Taxa">
                                                                <IconButton
                                                                    disabled={
                                                                        inputsDisabled
                                                                    }
                                                                    aria-label="edit-fee"
                                                                    onClick={() =>
                                                                        editFee(
                                                                            index
                                                                        )
                                                                    }
                                                                    className="clear-button"
                                                                >
                                                                    <FaEdit fontSize="medium" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Remover Taxa">
                                                                <IconButton
                                                                    disabled={
                                                                        inputsDisabled
                                                                    }
                                                                    aria-label="remove-fee"
                                                                    onClick={() =>
                                                                        removeFee(
                                                                            index
                                                                        )
                                                                    }
                                                                    className="clear-button"
                                                                >
                                                                    <FaTrashAlt fontSize="medium" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </div>
                                                    </div>

                                                    <div className="fees-data">
                                                        <Typography>
                                                            Valor:{' '}
                                                            {!el.IsPercent &&
                                                                formatter.format(
                                                                    el.Value!
                                                                )}
                                                            {el.IsPercent &&
                                                                `${el.Value} %`}
                                                        </Typography>
                                                    </div>
                                                    <Typography className="card-title">
                                                        <FiBarChart className="mr-2" />{' '}
                                                        Range:
                                                    </Typography>
                                                    <div className="fees-data">
                                                        <Typography className="mb-3">
                                                            De:{' '}
                                                            {el.Range?.From ===
                                                            null
                                                                ? 'Indefinido'
                                                                : `${el.Range?.From}`}
                                                        </Typography>
                                                        <Typography className="mb-3">
                                                            Para:{' '}
                                                            {el.Range?.To ===
                                                            null
                                                                ? 'Indefinido'
                                                                : `${el.Range?.To}`}
                                                        </Typography>
                                                    </div>
                                                    <Typography className="card-title">
                                                        <FaCalendarAlt className="mr-2" />{' '}
                                                        Período:
                                                    </Typography>
                                                    <div className="fees-data">
                                                        <Typography className="mb-1">
                                                            De:{' '}
                                                            {el.Period?.From ===
                                                                null ||
                                                            el.Period?.From ===
                                                                undefined
                                                                ? 'Indefinido'
                                                                : `${FormataStringData(
                                                                      el.Period
                                                                          ?.From
                                                                  )}`}
                                                        </Typography>
                                                        <Typography className="mb-1">
                                                            Para:{' '}
                                                            {el.Period?.To ===
                                                                null ||
                                                            el.Period?.To ===
                                                                undefined
                                                                ? 'Indefinido'
                                                                : `${FormataStringData(
                                                                      el.Period
                                                                          ?.To
                                                                  )}`}
                                                        </Typography>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </>
                                ) : (
                                    <span></span>
                                )}
                            </div>
                        </TabPanel>
                    </div>
                </DialogContent>
                <DialogActions className="dialog-buttons">
                    <div>
                        {ruleEditing ? (
                            <Button onClick={cancelEditing} variant="outlined">
                                Cancelar
                            </Button>
                        ) : (
                            <Button onClick={handleClose} variant="outlined">
                                Fechar
                            </Button>
                        )}
                    </div>
                    <div>
                        {ruleEditing ? (
                            <Button
                                onClick={handleSubmit}
                                className="confirm-button"
                            >
                                Confirmar
                            </Button>
                        ) : ruleNew ? (
                            <Button
                                onClick={handleSubmit}
                                className="confirm-button"
                            >
                                Confirmar
                            </Button>
                        ) : (
                            <Button
                                onClick={startEditing}
                                className="edit-button"
                                // disabled={
                                //     newAppId === 0 || !nameValid ? true : false
                                // }
                            >
                                Editar
                            </Button>
                        )}
                    </div>
                </DialogActions>
            </Dialog>
            <div className="footer">footer</div>
        </>
    );
}

export default CadastroRegras;
