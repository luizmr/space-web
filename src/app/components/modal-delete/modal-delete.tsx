import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
    show?: boolean;
    onHide: () => void;
    header?: string;
    onDelete: () => void;
};

const ModalDeleteComponent = ({ show, onHide, header, onDelete }: Props) => {
    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                {header && (
                    <Modal.Header closeButton>
                        <Modal.Title>{header}</Modal.Title>
                    </Modal.Header>
                )}
                <Modal.Body className="my-3 h6">
                    Você tem certeza que deseja{' '}
                    <b className="text-danger">confirmar</b> esta operação?
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button variant="outline-secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={onDelete}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteComponent;
