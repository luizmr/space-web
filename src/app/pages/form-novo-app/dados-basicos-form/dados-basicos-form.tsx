import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { AppOutput } from '../../../models/cadastro-apps';
import { FaArrowCircleUp } from 'react-icons/fa';

type Props = {
    app?: AppOutput;
    setApp: React.Dispatch<React.SetStateAction<AppOutput>>;
};

const DadosBasicosForm = ({ app, setApp }: Props) => {
    console.log('app passed', app);

    const [logoDefault, setLogoDefault] = useState<string>('Logo');

    return (
        <>
            <Form>
                <Form.Group>
                    <div
                        className="file-upload-wrapper"
                        data-text={logoDefault}
                    >
                        <input
                            id="file-input"
                            name="file-upload-field"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="file-upload-field"
                            value=""
                            onChange={(e) => {
                                setLogoDefault(
                                    e.currentTarget.value.replace(
                                        /.*(\/|\\)/,
                                        ''
                                    )
                                );
                                setApp({
                                    ...app,
                                    Logo: `${e.currentTarget.value}`,
                                });
                                console.log('logo', app);
                            }}
                        />
                        <label htmlFor="file-input">
                            <FaArrowCircleUp />
                        </label>
                    </div>
                </Form.Group>
                {/* <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Control
                            type="text"
                            placeholder="Logo"
                            onChange={(e) => {
                                // appObject.Nome = e.currentTarget.value;
                                setApp({ ...app, Nome: e.currentTarget.value });
                                console.log('app new', app);
                            }}
                        />
                    </Form.Group>
                </Form.Row> */}

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default DadosBasicosForm;
