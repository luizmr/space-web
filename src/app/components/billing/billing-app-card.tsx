import React, { useState } from 'react';
import { AppOutput } from '../../models/cadastro-apps';
import {
    Card,
    Button,
    Dropdown,
    DropdownButton,
    Modal,
    Spinner,
} from 'react-bootstrap';
import {
    FaExternalLinkAlt,
    FaEdit,
    FaTrashAlt,
    FaStore,
    FaCheck,
} from 'react-icons/fa';

const BillingAppCard: React.FC<AppOutput> = ({
    Nome,
    Logo,
    Descricao,
    Link,
    Status,
    Id,
}) => {
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);

    const handleCloseModalDelete = () => setShowModalDelete(false);

    const finalizar = (): void => {
        handleCloseModalDelete();
        setShowModal(true);
        setSending(true);
        // vai fazer o envio do app para o back-end
        // redirecionar para a tela /billing/cadastro-apps
        setTimeout(() => {
            setSending(false);
        }, 3000);
        setTimeout(() => {
            setShowModal(false);
        }, 5000);
    };

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

                            <Dropdown.Item href={`/vitrine-app/${Id}`}>
                                <FaStore />
                                <p>Ver na Loja</p>
                            </Dropdown.Item>
                            <Dropdown.Item
                                href={`/billing/cadastro-apps/editar-app/${Id}`}
                            >
                                <FaEdit />
                                <p>Editar</p>
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => setShowModalDelete(true)}
                            >
                                <FaTrashAlt />
                                <p>Deletar</p>
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Card.Body>
            </Card>
            <Modal
                show={showModalDelete}
                onHide={handleCloseModalDelete}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Deletar Aplicativo para Sempre</Modal.Title>
                </Modal.Header>
                <Modal.Body className="my-3 h6">
                    Você tem certeza que deseja{' '}
                    <b className="text-danger">confirmar</b> esta operação?
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button
                        variant="outline-secondary"
                        onClick={handleCloseModalDelete}
                    >
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={finalizar}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
            {showModal && (
                <Modal show={showModal} centered className="modal-delete-app">
                    <Modal.Body>
                        <p>
                            Aplicativo{' '}
                            {sending
                                ? 'sendo deletado do banco de Dados!'
                                : 'deletado com sucesso do banco de Dados!'}
                        </p>

                        {sending ? (
                            <Spinner animation="border" variant="danger" />
                        ) : (
                            <FaCheck />
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default BillingAppCard;
