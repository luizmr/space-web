import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
    show?: boolean;
    onHide: () => void;
    header?: string;
    body?: string;
};

const ModalComponent = ({ show, onHide, header, body }: Props) => {
    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                {header && (
                    <Modal.Header closeButton>
                        <Modal.Title>{header}</Modal.Title>
                    </Modal.Header>
                )}
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onHide}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalComponent;
