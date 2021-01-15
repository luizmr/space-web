import React, { useState, useEffect } from 'react';
import {
    Form,
    Col,
    Button,
    Table,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import {
    FaEdit,
    FaTrashAlt,
    FaPlus,
    FaRegEye,
    FaRegEyeSlash,
} from 'react-icons/fa';
import { AppOutput, CobrancaOutput } from '../../../models/cadastro-apps';

type Props = {
    app?: AppOutput;
    setApp: React.Dispatch<React.SetStateAction<AppOutput>>;
};

const CobrancaForm = ({ app, setApp }: Props) => {
    const [currencyValue, setCurrencyValue] = useState<number>(0);
    const [cobrancaArray, setCobrancaArray] = useState<Array<CobrancaOutput>>(
        app?.Cobranca || []
    );
    const [cobranca, setCobranca] = useState<CobrancaOutput>({
        CobrancaDescricao: '',
        CobrancaTipo: 0,
        CobrancaValor: '',
        CobrancaId: 0,
    });
    const [descricaoAceita, setDescricaoAceita] = useState<boolean>(false);
    const [showTable, setShowTable] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [lastId, setLastId] = useState<any>(1);

    useEffect(() => {
        if (cobrancaArray.length > 0) {
            let cobrancaLength = cobrancaArray.length;
            setLastId(cobrancaArray[cobrancaLength - 1].CobrancaId);
        }
    }, []);

    const tiposDeCobranca = [
        {
            Id: 1,
            Nome: 'Cartão de Crédito',
        },
        {
            Id: 2,
            Nome: 'Boleto Bancário',
        },
        {
            Id: 3,
            Nome: 'Débito Bancário',
        },
        {
            Id: 4,
            Nome: 'Cartão de Crédito via Paypal',
        },
        {
            Id: 5,
            Nome: 'Saldo Eduzz',
        },
    ];

    // useEffect(() => {
    //     console.log(cobrancaArray, 'cobrancaarray');
    // }, [cobrancaArray]);

    const editarCobranca = (el: CobrancaOutput) => {
        setIsEditing(true);
        let cobrancaObjeto = cobrancaArray.find(
            (obj, index) => obj.CobrancaId === el.CobrancaId
        );
        console.log(cobrancaObjeto);
        // setCobranca(cobrancaObjeto);
        setCobranca({
            CobrancaDescricao: cobrancaObjeto?.CobrancaDescricao,
            CobrancaTipo: cobrancaObjeto?.CobrancaTipo,
            CobrancaValor: cobrancaObjeto?.CobrancaValor,
            CobrancaId: cobrancaObjeto?.CobrancaId,
        });
    };

    const removerCobranca = (el: CobrancaOutput) => {
        let newCobrancaArray = cobrancaArray.filter(
            (obj, index) => obj.CobrancaId != el.CobrancaId
        );

        setCobrancaArray(newCobrancaArray);
        setApp({ ...app, Cobranca: newCobrancaArray });
    };

    return (
        <>
            <Form>
                <Form.Group controlId="formGridCobrancaTipo">
                    <Form.Control
                        as="select"
                        defaultValue="Escolha o Tipo de Cobrança"
                        value={cobranca.CobrancaTipo}
                        onChange={(e) => {
                            console.log(e.currentTarget.value);
                            setCobranca({
                                ...cobranca,
                                CobrancaTipo: parseInt(e.currentTarget.value),
                            });
                        }}
                    >
                        <option>Escolha o Tipo de Cobrança</option>
                        {tiposDeCobranca.map((el) => (
                            <option value={el.Id} key={el.Id}>
                                {el.Nome}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGridCobrancaValor">
                    <Form.Control
                        type="number"
                        // step="any"
                        min="0.00"
                        placeholder="Valor em Real (R$)"
                        value={
                            cobranca.CobrancaValor === ''
                                ? ''
                                : Number(cobranca.CobrancaValor)
                        }
                        onChange={(e) => {
                            setCobranca({
                                ...cobranca,
                                CobrancaValor: parseFloat(
                                    e.currentTarget.value
                                ).toFixed(2),
                            });
                            console.log('cobranca valor', app);
                        }}
                    />
                </Form.Group>

                <Form.Group controlId="formGridCobrancaDescricao">
                    <Form.Control
                        as="textarea"
                        style={{ resize: 'none' }}
                        rows={3}
                        placeholder="Descrição"
                        value={cobranca.CobrancaDescricao}
                        onChange={(e) => {
                            setCobranca({
                                ...cobranca,
                                CobrancaDescricao: e.currentTarget.value,
                            });
                            if (e.currentTarget.value.length >= 100) {
                                setDescricaoAceita(true);
                            } else {
                                setDescricaoAceita(false);
                            }
                            console.log('cobranca descricao', cobranca);
                            console.log(descricaoAceita);
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
                        >{`${cobranca.CobrancaDescricao?.length}/100`}</span>
                    </Form.Text>
                </Form.Group>
                <div className="buttons-form">
                    <Button
                        variant="dark"
                        onClick={() => {
                            setShowTable(showTable ? false : true);
                        }}
                    >
                        Mostrar Tabela{' '}
                        {showTable ? <FaRegEye /> : <FaRegEyeSlash />}
                    </Button>
                    <Button
                        // className="my-1"
                        variant="dark"
                        disabled={
                            cobranca.CobrancaTipo === 0 ||
                            cobranca.CobrancaValor === '' ||
                            !descricaoAceita
                                ? true
                                : false
                        }
                        onClick={(e) => {
                            if (isEditing) {
                                let editArray: Array<CobrancaOutput> = [];

                                cobrancaArray.map((obj) => {
                                    if (
                                        obj.CobrancaId !== cobranca.CobrancaId
                                    ) {
                                        editArray.push(obj);
                                    } else {
                                        editArray.push(cobranca);
                                    }
                                });

                                setCobrancaArray(editArray);
                                console.log(
                                    'cobranca array editada',
                                    cobrancaArray
                                );
                                setCobranca({
                                    CobrancaDescricao: '',
                                    CobrancaTipo: 0,
                                    CobrancaValor: '',
                                    CobrancaId: 0,
                                });
                            } else {
                                let oldArray = cobrancaArray;
                                let cobrancaLength = cobrancaArray.length;

                                oldArray.push({
                                    ...cobranca,
                                    CobrancaId:
                                        cobrancaLength > 0 ? lastId + 1 : 1,
                                });
                                setCobrancaArray(oldArray);
                                setCobranca({
                                    CobrancaDescricao: '',
                                    CobrancaTipo: 0,
                                    CobrancaValor: '',
                                    CobrancaId: 0,
                                });
                            }
                            setIsEditing(false);

                            setApp({ ...app, Cobranca: cobrancaArray });

                            console.log('cobranca array', app);
                        }}
                    >
                        {isEditing ? 'Editar' : 'Adicionar'}
                        {isEditing ? <FaEdit /> : <FaPlus />}
                    </Button>
                </div>
            </Form>

            <Table
                striped
                bordered
                hover
                variant="dark"
                className="cobranca-table"
            >
                <thead>
                    <tr>
                        <th className="acoes">Ações</th>
                        <th className="tipos">Tipo de Cobrança</th>
                        <th className="valores">Valor</th>
                        <th className="descricoes">Descrição</th>
                    </tr>
                </thead>
                {showTable && (
                    <tbody>
                        {cobrancaArray.map((el, i) => {
                            let tipoObj = tiposDeCobranca.find(
                                (obj) => obj.Id === el.CobrancaTipo
                            );
                            return (
                                <tr key={i}>
                                    <td className="acoes-icones">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>
                                                    Editar Cobrança
                                                </Tooltip>
                                            }
                                        >
                                            <FaEdit
                                                onClick={() =>
                                                    editarCobranca(el)
                                                }
                                            />
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>
                                                    Excluir Cobrança
                                                </Tooltip>
                                            }
                                        >
                                            <FaTrashAlt
                                                onClick={() =>
                                                    removerCobranca(el)
                                                }
                                            />
                                        </OverlayTrigger>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        {tipoObj?.Nome}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        R$ {el.CobrancaValor?.replace('.', ',')}
                                    </td>
                                    <td
                                        style={{
                                            wordWrap: 'break-word',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {el.CobrancaDescricao}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </Table>
        </>
    );
};

export default CobrancaForm;
