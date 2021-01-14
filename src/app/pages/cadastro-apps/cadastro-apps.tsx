import React, { useState, useEffect } from 'react';
import {
    Navbar,
    Nav,
    Button,
    FormControl,
    Form,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { FiCornerDownLeft, FiSearch, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { mockApps, mockCobranca } from './mock';
import { AppOutput, CobrancaOutput } from '../../models/cadastro-apps';
import BillingAppCard from '../../components/billing/billing-app-card';

export default function CadastroApps() {
    const quantityOfResults = 2;

    const [apps, setApps] = useState<Array<AppOutput>>([]);
    const [filteredApps, setFilteredApps] = useState<Array<AppOutput>>([]);
    const [filteredArray, setFilteredArray] = useState<Array<AppOutput>>([]);
    const [filtredValue, setFilteredValue] = useState<number>(0);
    const [searching, setSearching] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const [resultSlicer, setResultSlicer] = useState<number>(quantityOfResults);
    const [showResultSlicer, setShowResultSlicer] = useState<boolean>(true);

    useEffect(() => {
        setApps(mockApps);
        setFilteredApps(mockApps.slice(0, resultSlicer));
    }, []);

    const searchApps = (e: string) => {
        setShowResultSlicer(true);
        setResultSlicer(quantityOfResults);

        if (e === '') {
            setFilteredApps(mockApps.slice(0, resultSlicer));
            setSearching(false);
            setTextSearch('');
            setShowResultSlicer(true);
            setResultSlicer(quantityOfResults);
        } else {
            let arrayFilter: Array<AppOutput> = [];
            apps?.map((el) => {
                if (el.Nome && el.Descricao) {
                    if (
                        el?.Nome.toLowerCase().indexOf(e.toLowerCase()) > -1 ||
                        el?.Descricao.toLowerCase().indexOf(e.toLowerCase()) >
                            -1
                    ) {
                        arrayFilter.push(el);
                    }
                }
            });
            setFilteredApps(arrayFilter.slice(0, resultSlicer));
            setFilteredValue(arrayFilter.length);
            setFilteredArray(arrayFilter);
            setSearching(true);
            setTextSearch(e);

            if (
                arrayFilter.length < quantityOfResults ||
                slicedArray(filteredApps).length === arrayFilter.length
            ) {
                setShowResultSlicer(false);
            }
        }
    };

    const moreResults = (): void => {
        if (!searching) {
            setFilteredApps(slicedArray(apps));
            setResultSlicer(resultSlicer + quantityOfResults);
            checkResultSlicer(apps);
        } else {
            setFilteredApps(slicedArray(filteredArray));
            setResultSlicer(resultSlicer + quantityOfResults);
            checkResultSlicer(filteredArray);
        }
    };

    const checkResultSlicer = (obj: Array<AppOutput>): void => {
        if (slicedArray(obj).length === obj.length) {
            setShowResultSlicer(false);
        }
    };

    const slicedArray = (obj: Array<AppOutput>) => {
        return obj.slice(0, resultSlicer + quantityOfResults);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
            <div className="cadastro-apps">
                <div className="cadastro-apps__header">
                    <h2>Cadastro de Aplicativos</h2>
                    <Link to="/billing">
                        <Button
                            variant="dark"
                            className="cadastro-apps__header-button"
                        >
                            <FiCornerDownLeft />
                        </Button>
                    </Link>
                </div>
                <div className="cadastro-apps__filter">
                    <div className="cadastro-apps__filter-1">
                        <Form inline className="cadastro-apps__filter-search">
                            <FiSearch />
                            <input
                                type="text"
                                placeholder="Procurar ..."
                                className="search-box"
                                onChange={(e) => {
                                    searchApps(e.currentTarget.value);
                                }}
                            />
                        </Form>
                    </div>

                    <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-bottom`}>
                                Nova Aplicação
                            </Tooltip>
                        }
                    >
                        <Link to="/billing/cadastro-apps/novo-app">
                            <div className="cadastro-apps__filter-2">
                                <FiPlus />
                            </div>
                        </Link>
                    </OverlayTrigger>
                </div>
                {searching && (
                    <p>
                        encontramos {`${filtredValue}`} resultados para a sua
                        procura "{`${textSearch}`}"
                    </p>
                )}
                <div className="billing-cards">
                    {filteredApps?.map((app) => (
                        <BillingAppCard
                            Nome={app.Nome}
                            Logo={app.Logo}
                            Descricao={app.Descricao}
                            Id={app.Id}
                            Link={app.Link}
                            Status={app.Status}
                            key={app.Id}
                        />
                    ))}
                </div>
                {showResultSlicer && (
                    <div className="more-result-button">
                        <Button variant="dark" onClick={moreResults}>
                            <FaPlus />
                        </Button>
                    </div>
                )}
            </div>
            <div className="footer">Footer</div>
        </>
    );
}
