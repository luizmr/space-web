import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';

type Props = {
    show?: boolean;
    editFalse?: string;
    editTrue?: string;
    sending?: boolean;
    isEditing?: boolean;
};

const ModalSuccessComponent = ({
    show,
    editTrue,
    editFalse,
    sending,
    isEditing,
}: Props) => {
    return (
        <>
            <Modal show={show} centered className="modal-success">
                <Modal.Body>
                    <p>
                        {!isEditing
                            ? `Cadastro de ${editFalse}`
                            : `Nova edição de ${editTrue}`}
                        {sending
                            ? !isEditing
                                ? ' sendo enviado!'
                                : ' sendo enviada!'
                            : !isEditing
                            ? ' enviado com sucesso!'
                            : ' enviada com sucesso!'}
                    </p>

                    {sending ? (
                        <Spinner animation="border" variant="success" />
                    ) : (
                        <FaCheck />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalSuccessComponent;
