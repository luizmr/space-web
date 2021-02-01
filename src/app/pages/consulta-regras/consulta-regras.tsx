import React, { useState, useEffect } from 'react';
import {
    FiBarChart,
    FiCornerDownLeft,
    FiCornerDownRight,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import {
    IconButton,
    Tooltip,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    ListSubheader,
    Button,
    CircularProgress,
    TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/Navbar/Navbar';
import {
    AppOutput,
    DataOutput,
    EventsOutput,
    MoedasOutput,
    ProdutoOutput,
    ProdutorOutput,
    RegrasOutput,
} from '../../models/billingModels';
import {
    mockApps,
    mockEventos,
    mockMoedas,
    mockProdutor,
    mockProdutos,
    mockRegras,
} from './mockBilling';
import {
    FaCalendarAlt,
    FaDonate,
    FaEraser,
    FaRegFrown,
    FaRegSmile,
    FaSearch,
} from 'react-icons/fa';

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
        width: '100%',
    },
    width2: {
        width: 300,
    },
});

const useStyles = makeStyles({
    root: {
        width: 350,
        margin: '20px auto',
        [theme.breakpoints.down('md')]: {
            width: 300,
            margin: '20px auto',
        },
        [theme.breakpoints.down('sm')]: {
            width: 275,
            margin: '20px auto',
        },
    },
    title: {
        fontSize: 20,
    },
    subItems: {
        fontSize: 18,
    },
});

export default function ConsultaRegras() {
    const classes = useStyles();
    const outlinedInputClasses = useOutlinedInputStyles();
    const [apps, setApps] = useState<Array<AppOutput>>([]);
    const [appId, setAppId] = useState<number>(0);
    const [events, setEvents] = useState<Array<EventsOutput>>([]);
    const [eventId, setEventId] = useState<number>(0);
    const [customer, setCustomer] = useState<Array<ProdutorOutput>>([]);
    const [value, setValue] = useState<string>('');
    const [period, setPeriod] = useState<string>('');
    const [products, setProducts] = useState<Array<ProdutoOutput>>([]);
    const [productId, setProductId] = useState<number>(0);
    const [currency, setCurrency] = useState<Array<MoedasOutput>>([]);
    const [currencyId, setCurrencyId] = useState<number>(1);
    const [filteredEvents, setFilteredEvents] = useState<Array<EventsOutput>>(
        []
    );
    const [data, setData] = useState<DataOutput>({});
    const [dataRules, setDataRules] = useState<Array<RegrasOutput>>([]);
    const [rules, setRules] = useState<Array<RegrasOutput>>([]);
    const [wasFound, setWasFound] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [clear, setClear] = useState<boolean>(false);
    const [autoCompleteOpen, setAutoCompleteOpen] = useState<boolean>(false);
    const [
        autoCompleteOpenProduct,
        setAutoCompleteOpenProduct,
    ] = useState<boolean>(false);

    const [customerState, setCustomerState] = useState<any>({
        Id: undefined,
        Name: '',
    });

    const [productState, setProductState] = useState<any>({
        Id: undefined,
        Name: '',
    });
    const [feesIsTrue, setFeesIsTrue] = useState<boolean>(true);
    const [periodIsTrue, setPeriodIsTrue] = useState<boolean>(true);

    useEffect(() => {
        setApps(mockApps);
        setEvents(mockEventos);
        setCustomer(mockProdutor);
        setProducts(mockProdutos);
        setCurrency(mockMoedas);
        setDataRules(mockRegras);
    }, []);

    const selectEventsPerApp = (event: any): void => {
        setAppId(event.target.value);
        setData({ ...data, AppId: event.target.value, CurrencyId: 1 });
        setEventId(0);

        if (event.target.value === 0) {
            setFilteredEvents([]);
            setEventId(0);
        } else {
            let newDataArray: Array<EventsOutput> = [];
            events.map((obj) => {
                if (obj.AppId === event.target.value) {
                    newDataArray.push(obj);
                }
            });

            setFilteredEvents(newDataArray);
        }
    };

    const handleChangeEvent = (event: any): void => {
        setEventId(event.target.value);
        setData({ ...data, EventId: event.target.value });
    };

    const handleChangeCustomer = (value: any): void => {
        if (value) {
            setData({ ...data, CustomerId: value.Id });
            setCustomerState({ ...customerState, Name: value.Name });
        }
    };

    const handleChangeProduct = (value: any): void => {
        if (value) {
            setProductId(value.Id);
            setData({ ...data, ProductId: value.Id });
            setProductState({ ...productState, Name: value.Name });
        }
    };

    const handleChangeCurrency = (event: any): void => {
        setCurrencyId(event.target.value);
        setData({ ...data, CurrencyId: event.target.value });
    };

    const handleChangeValue = (event: any): void => {
        console.log(event.target.value);
        if (event.target.value) {
            setValue(event.target.value);
            setData({ ...data, Value: event.target.value });
        } else {
            setValue('');
            setData({ ...data, Value: null });
        }
    };

    const handleChangePeriod = (event: any): void => {
        if (event.target.value) {
            setPeriod(event.target.value);
            setData({
                ...data,
                Period: `${new Date(event.target.value).getTime()}`,
            });
        } else {
            setPeriod('');
            setData({ ...data, Period: null });
        }
    };

    const searchRules = (): void => {
        console.log(data);
        setFeesIsTrue(true);
        setPeriodIsTrue(true);
        setClear(false);
        setWasFound(false);
        setIsSearching(true);

        let newArray: Array<RegrasOutput> = [];
        let newRule = dataRules.filter((obj) => {
            if (
                obj.AppId === data.AppId &&
                obj.EventId === data.EventId &&
                obj.Customer.Id === data.CustomerId &&
                obj.CurrencyId === data.CurrencyId
            ) {
                if (obj.Product === null) {
                    if (data.ProductId === 0 || data.ProductId === undefined) {
                        newArray.push({ ...obj });
                        return obj;
                    } else {
                        return false;
                    }
                } else {
                    if (data.ProductId === obj.Product?.Id) {
                        newArray.push({ ...obj });
                        return obj;
                    } else {
                        return false;
                    }
                }
            }
        });

        let validatedFees = validateValue(newArray);

        if (newArray.length > 0) {
            newArray[0].Fees = validatedFees;
        }

        let validatedPeriod = validatePeriod(newArray);

        if (newArray.length > 0) {
            newArray[0].Fees = validatedPeriod;
        }

        if (validatedFees?.length! > 0) {
            setFeesIsTrue(true);
        } else {
            setFeesIsTrue(false);
        }

        if (validatedPeriod?.length! > 0) {
            setPeriodIsTrue(true);
        } else {
            setPeriodIsTrue(false);
        }

        setRules(newArray);

        setTimeout(() => {
            setIsSearching(false);
            setWasFound(true);
        }, 3000);
    };

    const validateValue = (obj: Array<RegrasOutput>) => {
        if (obj[0]) {
            let fees = obj[0].Fees?.filter((el) => {
                if (data.Value === undefined) {
                    return el;
                }
                if (el.Range?.From && el.Range?.To) {
                    if (
                        Number(data.Value) > el.Range?.From &&
                        Number(data.Value) < el.Range?.To
                    ) {
                        return el;
                    } else {
                        return false;
                    }
                } else if (el.Range?.From && !el.Range?.To) {
                    if (Number(data.Value) > el.Range?.From) {
                        return el;
                    } else {
                        return false;
                    }
                } else if (!el.Range?.From && el.Range?.To) {
                    if (Number(data.Value) < el.Range?.To) {
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

    const validatePeriod = (obj: Array<RegrasOutput>) => {
        if (obj[0]) {
            let periods = obj[0].Fees?.filter((el) => {
                if (data.Period === undefined) {
                    return el;
                }
                if (el.Period?.From && el.Period?.To) {
                    if (
                        Number(data.Period) >
                            new Date(el.Period?.From).getTime() &&
                        Number(data.Period) < new Date(el.Period?.To).getTime()
                    ) {
                        return el;
                    } else {
                        return false;
                    }
                } else if (el.Period?.From && !el.Period?.To) {
                    if (
                        Number(data.Period) >
                        new Date(el.Period?.From).getTime()
                    ) {
                        return el;
                    } else {
                        return false;
                    }
                } else if (!el.Period?.From && el.Period?.To) {
                    if (
                        Number(data.Period) < new Date(el.Period?.To).getTime()
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

    const clearFields = (): void => {
        setEventId(0);
        setAppId(0);
        setProductId(0);
        setCurrencyId(1);
        setValue('');
        setPeriod('');
        setRules([]);
        setData({});
        setClear(true);
        setCustomerState({ Id: undefined, Name: '' });
        setProductState({ Id: undefined, Name: '' });
    };

    const FormataStringData = (data: any): string => {
        const ano = data.split('-')[0];
        const mes = data.split('-')[1];
        const dia = data.split('-')[2];

        return (
            ('0' + dia).slice(1, 3) + '/' + ('0' + mes).slice(-2) + '/' + ano
        );
    };

    const mediaQuery = () => window.matchMedia('(max-width: 430px)').matches;

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <>
            <Navbar />
            <div className="consulta-regras">
                <div className="consulta-regras__header">
                    <h2>Consulta de Regras</h2>
                    <Link to="/billing">
                        <Button className="consulta-regras__header-button">
                            <FiCornerDownLeft />
                        </Button>
                    </Link>
                </div>

                <div
                    className="consulta-regras__form-cards"
                    style={
                        mediaQuery()
                            ? wasFound || isSearching
                                ? { gridTemplateRows: '1fr 1fr' }
                                : { gridTemplateRows: '1fr' }
                            : wasFound || isSearching
                            ? { gridTemplateColumns: '1fr 1fr' }
                            : { gridTemplateColumns: '1fr' }
                    }
                >
                    <div
                        className="consulta-regras__form"
                        style={
                            mediaQuery()
                                ? wasFound || isSearching
                                    ? { marginRight: '0px' }
                                    : { minWidth: '80vw', margin: '0 auto' }
                                : wasFound || isSearching
                                ? { marginRight: '20px' }
                                : { minWidth: '350px', margin: '0 auto' }
                        }
                    >
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
                                onChange={selectEventsPerApp}
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
                        <FormControl
                            variant="outlined"
                            className={`${outlinedInputClasses.root} ${outlinedInputClasses.width1}`}
                        >
                            <InputLabel id="event-input">
                                Módulo/Evento
                            </InputLabel>
                            <Select
                                labelId="event-input"
                                id="event-select"
                                value={eventId}
                                onChange={handleChangeEvent}
                                label="Módulo/Evento"
                                disabled={appId === 0 ? true : false}
                            >
                                <MenuItem value={0}>
                                    <em>Nenhum</em>
                                </MenuItem>

                                {filteredEvents.map((el: any) => (
                                    <MenuItem value={el.Id} key={el.Id}>
                                        <FiCornerDownRight className="mr-2" />{' '}
                                        {el.Name}
                                    </MenuItem>
                                ))}
                                {filteredEvents.length === 0 && (
                                    <ListSubheader value={0}>
                                        Sem Módulos/Eventos
                                    </ListSubheader>
                                )}
                            </Select>
                        </FormControl>
                        <Autocomplete
                            id="customer-state"
                            options={customer}
                            getOptionLabel={(option) =>
                                `${option.Id} - ${option.Name}`
                            }
                            className={`${outlinedInputClasses.width1} ${outlinedInputClasses.root}`}
                            open={autoCompleteOpen}
                            onChange={(event, value) =>
                                handleChangeCustomer(value)
                            }
                            inputValue={customerState.Name}
                            onInputChange={(event, value, reason) => {
                                switch (reason) {
                                    case 'input':
                                        setAutoCompleteOpen(!!value);

                                        break;
                                    case 'reset':

                                    case 'clear':
                                        setAutoCompleteOpen(false);
                                        if (!value) {
                                            setData({ ...data, CustomerId: 0 });
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

                        <Autocomplete
                            id="product-state"
                            options={products}
                            getOptionLabel={(option) =>
                                `${option.Id} - ${option.Name}`
                            }
                            className={`${outlinedInputClasses.width1} ${outlinedInputClasses.root}`}
                            open={autoCompleteOpenProduct}
                            onChange={(event, value) =>
                                handleChangeProduct(value)
                            }
                            inputValue={productState.Name}
                            onInputChange={(event, value, reason) => {
                                switch (reason) {
                                    case 'input':
                                        setAutoCompleteOpenProduct(!!value);

                                        break;
                                    case 'reset':
                                    case 'clear':
                                        setAutoCompleteOpenProduct(false);
                                        if (!value) {
                                            setProductId(0);
                                            setData({ ...data, ProductId: 0 });
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

                        <FormControl
                            variant="outlined"
                            className={`${outlinedInputClasses.root} ${outlinedInputClasses.width1}`}
                        >
                            <InputLabel id="currency-input">Moeda</InputLabel>
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
                                        : new Date().toISOString().slice(0, 16)
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type="datetime-local"
                                onChange={handleChangePeriod}
                                variant="outlined"
                            />
                        </FormControl>
                        <div className="consulta-regras__form-buttons">
                            <Tooltip title="Limpar Campos">
                                <IconButton
                                    aria-label="clear"
                                    onClick={clearFields}
                                >
                                    <FaEraser />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Procurar Regras">
                                <IconButton
                                    aria-label="search"
                                    onClick={searchRules}
                                >
                                    <FaSearch />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>

                    {wasFound && (
                        <div
                            className="consulta-regras__cards"
                            style={
                                mediaQuery()
                                    ? {
                                          borderTop: '1px dashed #343a40',
                                      }
                                    : { borderLeft: '1px dashed #343a40' }
                            }
                        >
                            {rules.length > 0 && feesIsTrue && periodIsTrue ? (
                                <>
                                    <h4
                                        style={
                                            mediaQuery()
                                                ? {
                                                      marginTop: '50px',
                                                  }
                                                : { marginTop: '0px' }
                                        }
                                    >
                                        Busca encontrada para a Regra:
                                    </h4>
                                    {rules.map((obj) => (
                                        <>
                                            <div className="search-header">
                                                <FiCornerDownRight />
                                                <h4>"{obj.Name}"</h4>
                                            </div>
                                            {obj.Fees?.map((el) => (
                                                <Card
                                                    className={classes.root}
                                                    variant="outlined"
                                                    key={el.Id}
                                                >
                                                    <CardContent>
                                                        <Typography
                                                            className="mb-3 d-flex align-items-center justify-content-start"
                                                            variant="h6"
                                                        >
                                                            <FaDonate className="mr-2" />{' '}
                                                            Taxa:
                                                        </Typography>
                                                        <div className="div-fees mb-2">
                                                            <Typography
                                                                gutterBottom
                                                            >
                                                                Valor:{' '}
                                                                {!el.IsPercent &&
                                                                    el.Value %
                                                                        1 !=
                                                                        0 &&
                                                                    formatter.format(
                                                                        el.Value
                                                                    )}
                                                                {!el.IsPercent &&
                                                                    el.Value %
                                                                        1 ===
                                                                        0 &&
                                                                    el.Value}
                                                                {el.IsPercent &&
                                                                    `${el.Value} %`}
                                                            </Typography>
                                                        </div>
                                                        <Typography
                                                            className={`${classes.subItems} mb-3 d-flex align-items-center justify-content-start`}
                                                        >
                                                            <FiBarChart className="mr-2" />{' '}
                                                            Range:
                                                        </Typography>
                                                        <div className="div-fees">
                                                            <Typography className="mb-3">
                                                                De:{' '}
                                                                {el.Range
                                                                    ?.From ===
                                                                null
                                                                    ? 'Indefinido'
                                                                    : `${el.Range?.From}`}
                                                            </Typography>
                                                            <Typography className="mb-3">
                                                                Para:{' '}
                                                                {el.Range
                                                                    ?.To ===
                                                                null
                                                                    ? 'Indefinido'
                                                                    : `${el.Range?.To}`}
                                                            </Typography>
                                                        </div>
                                                        <Typography
                                                            className={`${classes.subItems} mb-3 d-flex align-items-center justify-content-start`}
                                                        >
                                                            <FaCalendarAlt className="mr-2" />{' '}
                                                            Período:
                                                        </Typography>
                                                        <div className="div-fees">
                                                            <Typography className="mb-1">
                                                                De:{' '}
                                                                {el.Period
                                                                    ?.From ===
                                                                null
                                                                    ? 'Indefinido'
                                                                    : `${FormataStringData(
                                                                          el
                                                                              .Period
                                                                              ?.From
                                                                      )}`}
                                                            </Typography>
                                                            <Typography className="mb-1">
                                                                Para:{' '}
                                                                {el.Period
                                                                    ?.To ===
                                                                null
                                                                    ? 'Indefinido'
                                                                    : `${FormataStringData(
                                                                          el
                                                                              .Period
                                                                              ?.To
                                                                      )}`}
                                                            </Typography>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </>
                                    ))}
                                </>
                            ) : clear ? (
                                <div className="not-found">
                                    <h4>Insira uma nova Busca!</h4>
                                    <FaRegSmile />
                                </div>
                            ) : (
                                <div className="not-found">
                                    <h4>Resultado não encontrado!</h4>
                                    <FaRegFrown />
                                </div>
                            )}
                        </div>
                    )}
                    {isSearching && (
                        <div className="consulta-regras__cards">
                            <div className="progress-rules">
                                <CircularProgress />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="footer">Footer</div>
        </>
    );
}
