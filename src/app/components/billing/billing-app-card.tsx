import React from 'react';
import { AppOutput } from '../../models/cadastro-apps';
import { Link } from 'react-router-dom';
import {
    Card,
    Button,
    Dropdown,
    DropdownButton,
    NavLink,
} from 'react-bootstrap';
import { FaExternalLinkAlt, FaEdit, FaTrashAlt, FaStore } from 'react-icons/fa';

const BillingAppCard: React.FC<AppOutput> = ({
    Nome,
    Logo,
    Descricao,
    Link,
    Status,
    Id,
}) => {
    return (
        <>
            <Card className="billing-app-card">
                <Card.Img variant="top" src={Logo} />
                <Card.Body className="billing-app-card__body">
                    <div>
                        <Card.Title>{Nome}</Card.Title>
                        <Card.Text>
                            <p>{Descricao}</p>
                            <p>
                                <b>Status:</b> {Status}
                            </p>
                        </Card.Text>
                    </div>
                    <div className="billing-app-card__buttons">
                        <DropdownButton
                            key="right"
                            id={`dropdown-button-drop-right`}
                            drop="right"
                            variant="dark"
                            title={`Opções`}
                        >
                            <Dropdown.Item
                                onClick={() => window.open(`${Link}`, '_blank')}
                            >
                                <FaExternalLinkAlt /> <p>Abrir</p>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <FaStore />
                                <p>Ver na Vitrine</p>
                            </Dropdown.Item>
                            <Dropdown.Item
                                href={`/billing/cadastro-apps/editar-app/${Id}`}
                            >
                                <FaEdit />
                                <p>Editar</p>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <FaTrashAlt />
                                <p>Deletar</p>
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default BillingAppCard;
