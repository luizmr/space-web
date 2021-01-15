import React, { useEffect, useState } from 'react';
import {
    Form,
    Col,
    Button,
    InputGroup,
    Popover,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import { FaClone } from 'react-icons/fa';
import { FiCornerDownLeft } from 'react-icons/fi';
import { AppOutput } from '../../../models/cadastro-apps';

type Props = {
    app?: AppOutput;
    setApp: React.Dispatch<React.SetStateAction<AppOutput>>;
    setStep: React.Dispatch<React.SetStateAction<number>>;
};

const PreviewVitrine = ({ app, setApp, setStep }: Props) => {
    return (
        <>
            <div className="vitrine__header">
                <h2>Preview na Loja</h2>

                <Button
                    variant="dark"
                    className="vitrine__header-button"
                    onClick={() => setStep(1)}
                >
                    <FiCornerDownLeft />
                </Button>
            </div>
        </>
    );
};

export default PreviewVitrine;
