import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { Link, match } from 'react-router-dom';
import { FiCornerDownLeft } from 'react-icons/fi';
import { FaCheck, FaChevronRight } from 'react-icons/fa';
import { AppOutput } from '../../models/cadastro-apps';
import Navbar from '../../components/Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import { mockApps } from '../cadastro-apps/mock';
import App from '../../../App';

export interface AuditCompareRouteParams {
    id: string;
}
export default function VitrineApp({
    match,
}: {
    match: match<AuditCompareRouteParams>;
}) {
    console.log(match?.params.id);

    const history = useHistory();

    return (
        <>
            <Navbar />
            <div className="novo-app">Vitrine - App: {match?.params.id}</div>

            <div className="footer-div"></div>
            <div className="footer">Footer</div>
        </>
    );
}
