import React, { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import {
    Form,
    Col,
    Button,
    Dropdown,
    DropdownButton,
    Modal,
} from 'react-bootstrap';
import { AppOutput } from '../../../models/cadastro-apps';
import { FaArrowCircleUp, FaTrashAlt } from 'react-icons/fa';

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
    console.log('app passed', app);

    const [logoDefault, setLogoDefault] = useState<string>('Logo');
    const [imagensDefault, setImagensDefault] = useState<boolean>(true);
    const [imagensArray, setImagensArray] = useState<Array<any>>([]);
    const [show, setShow] = useState<boolean>(false);
    const [showModalLength, setShowModalLength] = useState<boolean>(false);
    const [showModalArray, setShowModalArray] = useState<boolean>(false);
    // const [descricaoAceita, setDescricaoAceita] = useState<boolean>(false);

    const handleCloseSizeModal = () => setShow(false);
    const handleShowSizeModal = () => setShow(true);

    const handleCloseModalLength = () => setShowModalLength(false);
    const handleShowModalLength = () => setShowModalLength(true);

    const handleCloseModalArray = () => setShowModalArray(false);
    const handleShowModalArray = () => setShowModalArray(true);

    const uploadImage = (e: any) => {
        let file = e.target.files[0];
        console.log('nome', file.name);
        if (file && !file.name) {
            window.alert('Please select a file');
            return false;
        }
        if (file.name.length > 24) {
            handleShowModalLength();
            return false;
        }
        if (file.size > 4 * 10e6) {
            handleShowSizeModal();
            return false;
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
            window.alert('Please select a file');
            return false;
        }
        if (file.name.length > 24) {
            handleShowModalLength();
            return false;
        }
        if (file.size > 4 * 10e6) {
            handleShowSizeModal();
            return false;
        }
        if (imagensArray.length > 5) {
            handleShowModalArray();
            return false;
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
                                console.log('logo', app);
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
                        onChange={(e) => {
                            setApp({ ...app, Nome: e.currentTarget.value });
                            console.log('nome', app);
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
                                console.log('imagens', app);
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
                        onChange={(e) => {
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
                        onChange={(e) => {
                            setApp({ ...app, Link: e.currentTarget.value });
                            console.log('Link', app);
                        }}
                    />
                </Form.Group>
            </Form>
            <Modal show={show} onHide={handleCloseSizeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Erro no tamanho da Imagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Por favor, selecione uma imagem menor que 4 MB!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseSizeModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showModalLength}
                onHide={handleCloseModalLength}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Erro no tamanho do nome da Imagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Por favor, defina um nome menor que 20 caracteres!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalLength}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showModalArray}
                onHide={handleCloseModalArray}
                centered
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title>Erro quantidade máxima atingida</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    Quantidade máxima de imagens atingida (6 imagens)!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalArray}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DadosBasicosForm;
