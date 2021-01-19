import React, { useState } from 'react';
import { Form, Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { AppOutput } from '../../../models/cadastro-apps';
import { FaArrowCircleUp, FaTrashAlt } from 'react-icons/fa';
import ModalComponent from '../../../components/modal/modal';

import TextField from '@material-ui/core/TextField';

type Props = {
    app?: AppOutput;
    setApp: React.Dispatch<React.SetStateAction<AppOutput>>;
    descricaoAceita?: boolean;
    setDescricaoAceita: React.Dispatch<React.SetStateAction<boolean>>;
};

const DadosBasicosForm = ({
    app,
    setApp,
    descricaoAceita,
    setDescricaoAceita,
}: Props) => {
    const [logoDefault, setLogoDefault] = useState<string>('Logo');
    const [imagensDefault, setImagensDefault] = useState<boolean>(true);
    const [imagensArray, setImagensArray] = useState<Array<any>>([]);
    const [show, setShow] = useState<boolean>(false);
    const [showModalLength, setShowModalLength] = useState<boolean>(false);
    const [showModalArray, setShowModalArray] = useState<boolean>(false);

    const handleCloseSizeModal = () => setShow(false);
    const handleShowSizeModal = () => setShow(true);

    const handleCloseModalLength = () => setShowModalLength(false);
    const handleShowModalLength = () => setShowModalLength(true);

    const handleCloseModalArray = () => setShowModalArray(false);
    const handleShowModalArray = () => setShowModalArray(true);

    const uploadImage = (e: any) => {
        let file = e.target.files[0];
        if (file && !file.name) {
            return window.alert('Please select a file');
        }
        if (file.name.length > 24) {
            return handleShowModalLength();
        }
        if (file.size > 4 * 10e6) {
            return handleShowSizeModal();
        }
        setLogoDefault(e.currentTarget.value.replace(/.*(\/|\\)/, ''));
        setApp({
            ...app,
            Logo: `${e.currentTarget.value}`,
        });
    };

    const uploadImages = (e: any) => {
        let file = e.target.files[0];
        if (file && !file.name) {
            return window.alert('Please select a file');
        }
        if (file.name.length > 24) {
            return handleShowModalLength();
        }
        if (file.size > 4 * 10e6) {
            return handleShowSizeModal();
        }
        if (imagensArray.length > 5) {
            return handleShowModalArray();
        }
        setImagensDefault(false);
        setImagensArray([...imagensArray, e.currentTarget.value]);
        setApp({
            ...app,
            Imagens: [...imagensArray, e.currentTarget.value],
        });
    };

    return (
        <>
            <Form>
                <Form.Group controlId="formGridLogo">
                    <div
                        className="file-upload-wrapper height-1"
                        data-text={
                            app?.Logo
                                ? app.Logo.replace(/.*(\/|\\)/, '')
                                : logoDefault
                        }
                    >
                        <input
                            id="file-input"
                            name="file-upload-field"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="file-upload-field"
                            value=""
                            onChange={(e) => {
                                uploadImage(e);
                            }}
                        />
                        <label htmlFor="file-input" className="arrow-svg-1">
                            <FaArrowCircleUp />
                        </label>
                    </div>
                </Form.Group>

                <Form.Group controlId="formGridNome">
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        value={app?.Nome}
                        onChange={(e: any) => {
                            setApp({ ...app, Nome: e.currentTarget.value });
                        }}
                    />
                </Form.Group>

                <Form.Group controlId="formGridImagens">
                    <div
                        className="file-upload-wrapper height-2"
                        data-text={
                            app?.Imagens?.length === 0
                                ? 'Imagens'
                                : app?.Imagens?.map(
                                      (el) => ` ${el.replace(/.*(\/|\\)/, '')}`
                                  )
                        }
                    >
                        <input
                            id="file-input-2"
                            name="file-upload-field"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="file-upload-field"
                            value=""
                            onChange={(e) => {
                                uploadImages(e);
                            }}
                        />
                        <label htmlFor="file-input-2" className="arrow-svg-2">
                            <FaArrowCircleUp />
                        </label>
                        <DropdownButton
                            key="right"
                            id={`dropdown-button-drop-right`}
                            drop="right"
                            variant="dark"
                            title={`Excluir`}
                            className="dropdown-imagens"
                        >
                            {app?.Imagens?.map((el, i) => (
                                <Dropdown.Item
                                    eventKey="1"
                                    key={i}
                                    className="dropdown-item"
                                    onClick={() => {
                                        let newImagensArray: any = app?.Imagens?.filter(
                                            (obj) => obj !== el
                                        );

                                        setImagensArray(newImagensArray);

                                        setApp({
                                            ...app,
                                            Imagens: newImagensArray,
                                        });
                                    }}
                                >
                                    <FaTrashAlt />
                                    <p>{el.replace(/.*(\/|\\)/, '')}</p>
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                </Form.Group>

                <Form.Group controlId="formGridDescricao">
                    <Form.Control
                        as="textarea"
                        style={{ resize: 'none' }}
                        rows={3}
                        value={app?.Descricao}
                        placeholder="Descrição"
                        onChange={(e: any) => {
                            setApp({
                                ...app,
                                Descricao: e.currentTarget.value,
                            });
                            if (e.currentTarget.value.length >= 100) {
                                setDescricaoAceita(true);
                            } else {
                                setDescricaoAceita(false);
                            }
                        }}
                        aria-describedby="descriptionLength"
                    />
                    <Form.Text id="descriptionLength" muted>
                        A descrição deve conter no mínimo 100 caracteres.{' '}
                        <span
                            style={
                                descricaoAceita
                                    ? { color: 'green' }
                                    : { color: 'red' }
                            }
                        >{`${app?.Descricao?.length}/100`}</span>
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formGridLink">
                    <Form.Control
                        type="text"
                        placeholder="Link do Aplicativo"
                        value={app?.Link}
                        onChange={(e: any) => {
                            setApp({ ...app, Link: e.currentTarget.value });
                        }}
                    />
                </Form.Group>
            </Form>
            <ModalComponent
                show={show}
                onHide={handleCloseSizeModal}
                header={'Erro no tamanho da Imagem'}
                body={'Por favor, selecione uma imagem menor que 4 MB!'}
            />
            <ModalComponent
                show={showModalLength}
                onHide={handleCloseModalLength}
                header={'Erro no tamanho do nome da Imagem'}
                body={'Por favor, defina um nome menor que 20 caracteres!'}
            />
            <ModalComponent
                show={showModalArray}
                onHide={handleCloseModalArray}
                body={'Quantidade máxima de imagens atingida (6 imagens)!'}
            />
        </>
    );
};

export default DadosBasicosForm;
