import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { Form, Button } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import MeusAplicativosCard from '../../components/meus-apps/meus-apps-card';
import { mockApps, mockPlugins } from '../cadastro-apps/mock';
import { AppOutput } from '../../models/cadastro-apps';
import AppsPluginsCard from '../../components/apps-plugins/AppsPluginsCard';

function MeusAplicativos() {
    const quantityOfResults = 2;

    const [btnSelect, setBtnSelect] = useState(0);
    const [apps, setApps] = useState<Array<AppOutput>>([]);
    const [plugins, setPlugins] = useState<Array<AppOutput>>([]);
    const [filteredData, setFilteredData] = useState<Array<AppOutput>>([]);
    const [filteredApps, setFilteredApps] = useState<Array<AppOutput>>([]);
    const [filtredValue, setFilteredValue] = useState<number>(0);
    const [searching, setSearching] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const [resultSlicer, setResultSlicer] = useState<number>(quantityOfResults);
    const [showResultSlicer, setShowResultSlicer] = useState<boolean>(true);

    useEffect(() => {
        setApps(mockApps);
        setPlugins(mockPlugins);
        // setFilteredApps(mockApps);
    }, []);

    useEffect(() => {
        if (textSearch !== '') {
            const resultApps = apps.filter(searchItems);
            const resultPlugins = plugins.filter(searchItems);
            setFilteredValue(resultApps.length + resultPlugins.length);
            setFilteredData([...resultApps, ...resultPlugins]);
            setSearching(true);
            setShowResultSlicer(false);
            setResultSlicer(resultApps.length + resultPlugins.length);
        } else {
            setFilteredApps(mockApps);
            setSearching(false);
            setResultSlicer(quantityOfResults);
            setShowResultSlicer(true);
        }
    }, [textSearch]);

    useEffect(() => {
        if (btnSelect === 0) {
            setFilteredData(mockApps);
        } else {
            setFilteredData(mockPlugins);
        }
    }, [btnSelect]);

    const searchItems = (item: AppOutput) => {
        if (textSearch === '') {
            return true;
        } else {
            if (
                item.Descricao?.toLowerCase().includes(
                    textSearch.toLowerCase()
                ) ||
                item.Nome?.toLowerCase().includes(textSearch.toLowerCase())
            )
                return true;
            return false;
        }
    };

    const moreResults = (): void => {
        setResultSlicer(resultSlicer + 2);
        if (resultSlicer + 2 >= apps.length) {
            setShowResultSlicer(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="meus-apps">
                <div className="meus-apps__filter">
                    <div className="meus-apps__filter-1">
                        <Form inline className="meus-apps__filter-search">
                            <FiSearch />
                            <input
                                type="text"
                                placeholder="O que você procura?"
                                className="search-box"
                                onChange={(e) => {
                                    setTextSearch(e.target.value);
                                }}
                            />
                        </Form>
                    </div>
                </div>

                {searching ? (
                    <p>
                        encontramos {`${filtredValue}`} resultados para a sua
                        procura "{`${textSearch}`}"
                    </p>
                ) : (
                    <div className="meus-apps__menu">
                        <button
                            className={btnSelect === 0 ? 'selected' : ''}
                            onClick={() => {
                                setBtnSelect(0);
                            }}
                            type="button"
                        >
                            Aplicativos
                        </button>
                        <button
                            className={btnSelect === 1 ? 'selected' : ''}
                            type="button"
                            onClick={() => {
                                setBtnSelect(1);
                            }}
                        >
                            Templates
                        </button>
                    </div>
                )}

                <div className="meus-aplicativos-cards">
                    {btnSelect === 0 && textSearch === ''
                        ? filteredApps.map((app, index) => {
                              if (index + 1 <= resultSlicer) {
                                  return (
                                      <MeusAplicativosCard
                                          Nome={app.Nome}
                                          Logo={app.Logo}
                                          Descricao={app.Descricao}
                                          Id={app.Id}
                                          Url={app.Link}
                                          key={app.Id}
                                      />
                                  );
                              } else {
                                  return '';
                              }
                          })
                        : filteredData.map((plugin) => (
                              <AppsPluginsCard
                                  Nome={plugin.Nome}
                                  Logo={plugin.Logo}
                                  Tipo={plugin.Tipo}
                                  Id={plugin.Id}
                                  Link={plugin.Link}
                                  key={plugin.Id}
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
        </>
    );
}

export default MeusAplicativos;
