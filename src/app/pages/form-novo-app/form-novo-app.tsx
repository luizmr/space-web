import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { Link, match } from 'react-router-dom';
import { FiCornerDownLeft } from 'react-icons/fi';
import { FaCheck, FaChevronRight } from 'react-icons/fa';
import DadosBasicosForm from './dados-basicos-form/dados-basicos-form';
import CobrancaForm from './cobranca/cobranca-form';
import ProximosPassosForm from './proximos-passos/proximos-passos-form';
import { AppOutput } from '../../models/cadastro-apps';
import Navbar from '../../components/Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import { mockApps } from '../cadastro-apps/mock';
import App from '../../../App';

export interface AuditCompareRouteParams {
    id: string;
}

export default function FormNovoApp({
    match,
}: {
    match: match<AuditCompareRouteParams>;
}) {
    console.log(match?.params.id);

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

    const nextStep = (): void => {
        setStep(step + 1);
    };

    const prevStep = (): void => {
        setStep(step - 1);
    };

    const finalizar = (): void => {
        setShowModal(true);
        setSending(true);
        console.log('app finalizado', app);
        // vai fazer o envio do app para o back-end
        // redirecionar para a tela /billing/cadastro-apps
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
                <div className="novo-app__header">
                    <h2>Novo Aplicativo</h2>
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
                    <FaChevronRight />
                    <p id="cobranca" className={step === 2 ? 'selected' : ''}>
                        2 - Cobrança
                    </p>
                    <FaChevronRight />
                    <p
                        id="proximos-passos"
                        className={step === 3 ? 'selected' : ''}
                    >
                        3 - Próximos Passos
                    </p>
                </div>
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
                </div>
            </div>
            <div className="novo-app__steps-buttons">
                <div>
                    {step > 1 && (
                        <Button variant="dark" onClick={prevStep}>
                            Voltar
                        </Button>
                    )}
                    <Button variant="outline-dark">Preview na Loja</Button>
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
                                    disabled={
                                        app.Cobranca?.length === 0
                                            ? true
                                            : false
                                    }
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
            {showModal && (
                <Modal show={showModal} centered className="modal-success">
                    <Modal.Body>
                        {match?.params.id === undefined ? (
                            <p>
                                Cadastro de novo Aplicativo{' '}
                                {sending
                                    ? 'sendo enviado!'
                                    : 'enviado com sucesso!'}
                            </p>
                        ) : (
                            <p>
                                Nova Edição do Aplicativo{' '}
                                {sending
                                    ? 'sendo enviada!'
                                    : 'enviada com sucesso!'}
                            </p>
                        )}
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
