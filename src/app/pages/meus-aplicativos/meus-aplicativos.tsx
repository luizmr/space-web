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
    const [filteredApps, setFilteredApps] = useState<Array<AppOutput>>([]);
    const [filteredArray, setFilteredArray] = useState<Array<AppOutput>>([]);
    const [filtredValue, setFilteredValue] = useState<number>(0);
    const [searching, setSearching] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const [resultSlicer, setResultSlicer] = useState<number>(quantityOfResults);
    const [showResultSlicer, setShowResultSlicer] = useState<boolean>(true);

    useEffect(() => {
        setApps(mockApps);
        setFilteredApps(mockApps);
    }, []);

    useEffect(() => {
        if (textSearch !== '') {
            const result = apps.filter(searchApps);
            setFilteredValue(result.length);
            setFilteredApps(result);
            setSearching(true);
            setShowResultSlicer(false);
            setResultSlicer(result.length);
        } else {
            setFilteredApps(mockApps);
            setSearching(false);
            setResultSlicer(quantityOfResults);
            setShowResultSlicer(true);
        }
    }, [textSearch]);

    const searchApps = (app: AppOutput) => {
        if (textSearch === '') {
            return true;
        } else {
            if (
                app.Descricao?.toLowerCase().includes(
                    textSearch.toLowerCase()
                ) ||
                app.Nome?.toLowerCase().includes(textSearch.toLowerCase())
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
                    {textSearch === ''
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
                        : mockPlugins.map((plugin) => (
                              <AppsPluginsCard
                                  Nome={plugin.Nome}
                                  Logo={plugin.Logo}
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
