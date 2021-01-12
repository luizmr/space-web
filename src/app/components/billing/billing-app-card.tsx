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
import { FaExternalLinkAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';

const BillingAppCard: React.FC<AppOutput> = ({
    Nome,
    Logo,
    Descricao,
    Link,
}) => {
    return (
        <>
            <Card className="billing-app-card">
                <Card.Img variant="top" src={Logo} />
                <Card.Body className="billing-app-card__body">
                    <div>
                        <Card.Title>{Nome}</Card.Title>
                        <Card.Text>{Descricao}</Card.Text>
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

                            <Dropdown.Item eventKey="2">
                                <FaEdit />
                                <p>Editar</p>
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3">
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
