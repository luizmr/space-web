import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiCornerDownLeft } from 'react-icons/fi';
import { FaChevronRight } from 'react-icons/fa';
import DadosBasicosForm from './dados-basicos-form/dados-basicos-form';
import CobrancaForm from './cobranca/cobranca-form';
import ProximosPassosForm from './proximos-passos/proximos-passos-form';
import { AppOutput } from '../../models/cadastro-apps';
import Navbar from '../../components/Navbar/Navbar';

interface IApp {
    app: AppOutput;
}

export default function FormNovoApp() {
    const [step, setStep] = useState<number>(1);
    const [app, setApp] = useState<AppOutput>({
        Nome: '',
        Descricao: '',
        Logo: '',
        Link: '',
        Imagens: [],
        Cobranca: [],
    });

    const nextStep = (): void => {
        setStep(step + 1);
    };

    const prevStep = (): void => {
        setStep(step - 1);
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
                        <DadosBasicosForm app={app} setApp={setApp} />
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
                        <Button variant="dark" onClick={nextStep}>
                            Avançar
                        </Button>
                    )}
                </div>
            </div>
            <div className="footer-div"></div>
            <div className="footer">Footer</div>
        </>
    );
}
