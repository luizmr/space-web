import React, { useState, useEffect } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { Link, match } from 'react-router-dom';
import { FiCornerDownLeft } from 'react-icons/fi';
import { FaCheck, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import DadosBasicosForm from './dados-basicos-form/dados-basicos-form';
import CobrancaForm from './cobranca/cobranca-form';
import ProximosPassosForm from './proximos-passos/proximos-passos-form';
import { AppOutput } from '../../models/cadastro-apps';
import Navbar from '../../components/Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import { mockApps } from '../cadastro-apps/mock';
import PreviewVitrine from './preview-vitrine/preview-vitrine';

export interface AuditCompareRouteParams {
    id: string;
}

export default function FormNovoApp({
    match,
}: {
    match: match<AuditCompareRouteParams>;
}) {
    const history = useHistory();
    const [apps, setApps] = useState<Array<AppOutput>>(mockApps);
    const [step, setStep] = useState<number>(1);
    const [descricaoAceita, setDescricaoAceita] = useState<boolean>(false);
    const [app, setApp] = useState<AppOutput>({
        Nome: '',
        Descricao: '',
        Logo: '',
        Link: '',
        Imagens: [],
        Cobranca: [],
        Status: 'Aguardando Validação',
    });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);

    useEffect(() => {
        if (match.params.id !== undefined) {
            let appFound = apps.find(
                (obj) => obj.Id === Number(match.params.id)
            );
            setApp({ ...appFound });
            setDescricaoAceita(true);
        }
    }, []);

    const nextStep = (): void => {
        setStep(step + 1);
    };

    const prevStep = (): void => {
        setStep(step - 1);
    };

    const finalizar = (): void => {
        setShowModal(true);
        setSending(true);
        setTimeout(() => {
            setSending(false);
        }, 3000);
        setTimeout(() => {
            setShowModal(false);
            history.push('/billing/cadastro-apps');
        }, 5000);
    };

    return (
        <>
            <Navbar />
            <div className="novo-app">
                {step !== 4 && (
                    <>
                        <div className="novo-app__header">
                            <h2>
                                {match.params.id === undefined
                                    ? 'Novo Aplicativo'
                                    : 'Editar Aplicativo'}
                            </h2>
                            <Link to="/billing/cadastro-apps">
                                <Button
                                    variant="dark"
                                    className="novo-app__header-button"
                                >
                                    <FiCornerDownLeft />
                                </Button>
                            </Link>
                        </div>

                        <div className="novo-app__steps">
                            <p
                                id="dados-basicos"
                                className={step === 1 ? 'selected' : ''}
                            >
                                1 - Dados Básicos
                            </p>
                            <FaChevronRight className="chevron-right" />
                            <FaChevronDown className="chevron-down" />
                            <p
                                id="cobranca"
                                className={step === 2 ? 'selected' : ''}
                            >
                                2 - Cobrança
                            </p>
                            <FaChevronRight className="chevron-right" />
                            <FaChevronDown className="chevron-down" />
                            <p
                                id="proximos-passos"
                                className={step === 3 ? 'selected' : ''}
                            >
                                3 - Próximos Passos
                            </p>
                        </div>
                    </>
                )}
                <div className="novo-app__steps-form">
                    {step === 1 && (
                        <DadosBasicosForm
                            app={app}
                            setApp={setApp}
                            descricaoAceita={descricaoAceita}
                            setDescricaoAceita={setDescricaoAceita}
                        />
                    )}
                    {step === 2 && <CobrancaForm app={app} setApp={setApp} />}
                    {step === 3 && (
                        <ProximosPassosForm app={app} setApp={setApp} />
                    )}
                    {step === 4 && (
                        <PreviewVitrine
                            app={app}
                            setApp={setApp}
                            setStep={setStep}
                        />
                    )}
                </div>
            </div>
            {step !== 4 && (
                <div className="novo-app__steps-buttons">
                    <div>
                        {step > 1 && (
                            <Button variant="dark" onClick={prevStep}>
                                Voltar
                            </Button>
                        )}
                        <Button
                            variant="outline-dark"
                            onClick={() => setStep(4)}
                        >
                            Preview na Loja
                        </Button>
                        {step < 3 && (
                            <>
                                {step === 1 ? (
                                    <Button
                                        variant="dark"
                                        onClick={nextStep}
                                        disabled={
                                            !app.Logo ||
                                            !app.Nome ||
                                            !app.Link ||
                                            app.Imagens?.length === 0 ||
                                            !descricaoAceita
                                                ? true
                                                : false
                                        }
                                    >
                                        Avançar
                                    </Button>
                                ) : (
                                    <Button
                                        variant="dark"
                                        onClick={nextStep}
                                        // disabled={
                                        //     app.Cobranca?.length === 0
                                        //         ? true
                                        //         : false
                                        // }
                                    >
                                        Avançar
                                    </Button>
                                )}
                            </>
                        )}
                        {step === 3 && (
                            <Button variant="dark" onClick={finalizar}>
                                Finalizar
                            </Button>
                        )}
                    </div>
                </div>
            )}
            {showModal && (
                <Modal show={showModal} centered className="modal-success">
                    <Modal.Body>
                        <p>
                            {match?.params.id === undefined
                                ? 'Cadastro de novo Aplicativo'
                                : 'Nova edição do Aplicativo'}
                            {sending
                                ? match?.params.id === undefined
                                    ? ' sendo enviado!'
                                    : ' sendo enviada!'
                                : match?.params.id === undefined
                                ? ' enviado com sucesso!'
                                : ' enviada com sucesso!'}
                        </p>
                        {sending ? (
                            <Spinner animation="border" variant="success" />
                        ) : (
                            <FaCheck />
                        )}
                    </Modal.Body>
                </Modal>
            )}
            <div className="footer-div"></div>
            <div className="footer">Footer</div>
        </>
    );
}
