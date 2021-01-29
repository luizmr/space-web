import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';

type Props = {
    show?: boolean;
    header?: string;
    sending?: boolean;
};

const ModalDeletingComponent = ({ show, header, sending }: Props) => {
    return (
        <>
            <Modal show={show} centered className="modal-delete-app">
                <Modal.Body>
                    <p>
                        {header}
                        {sending
                            ? ' sendo deletado do banco de Dados!'
                            : ' deletado com sucesso do banco de Dados!'}
                    </p>

                    {sending ? (
                        <Spinner animation="border" variant="danger" />
                    ) : (
                        <FaCheck />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalDeletingComponent;
