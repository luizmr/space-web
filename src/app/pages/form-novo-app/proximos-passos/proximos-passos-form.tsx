import React, { useEffect, useState } from 'react';
import {
    Form,
    Col,
    Button,
    InputGroup,
    Popover,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import { FaClone } from 'react-icons/fa';
import { AppOutput } from '../../../models/cadastro-apps';

type Props = {
    app?: AppOutput;
    setApp: React.Dispatch<React.SetStateAction<AppOutput>>;
};

const ProximosPassosForm = ({ app, setApp }: Props) => {
    const [url, setUrl] = useState<string>();
    const [urlCopied, setUrlCopied] = useState<boolean>();
    const [token, setToken] = useState<string>();
    const [tokenCopied, setTokenCopied] = useState<boolean>();

    useEffect(() => {
        let eduzz = 'https://www.eduzz.com/';
        let appName = app?.Nome?.replace(/ /g, '');
        let newUrl = eduzz.concat(`${appName?.toLowerCase()}`, `-${ID(6)}`);

        setUrl(newUrl);

        setToken(
            `${ID(12).toString()}-${ID(12).toString()}-${ID(
                12
            ).toString()}-${ID(12).toString()}`
        );
    }, []);

    const ID = (n: number) => {
        return Math.random().toString(36).toUpperCase().substr(2, n);
    };

    const copy = (input: string) => {
        /* Get the text field */
        let copyText = document.getElementById(`${input}`) as HTMLInputElement;

        /* Select the text field */
        copyText?.select();
        copyText?.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand('copy');
    };

    return (
        <>
            <Form className="proximos-passos">
                <p>Instruções de como proceder</p>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt.
                </p>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="URL"
                            value={url}
                            id="url-copy"
                            aria-describedby="url-copied"
                        />

                        <Button className="copy-button">
                            <FaClone
                                onClick={() => {
                                    copy('url-copy');

                                    setUrlCopied(true);
                                    setTokenCopied(false);
                                    setTimeout(() => {
                                        setUrlCopied(false);
                                    }, 10000);
                                }}
                            />
                        </Button>
                    </InputGroup>
                    {urlCopied && (
                        <Form.Text id="url-copied" muted>
                            URL copiada: <b>{`${url}`}</b>
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Token"
                            value={token}
                            id="token-copy"
                            aria-describedby="token-copied"
                        />

                        <Button className="copy-button">
                            <FaClone
                                onClick={() => {
                                    copy('token-copy');
                                    setTokenCopied(true);
                                    setUrlCopied(false);
                                    setTimeout(() => {
                                        setTokenCopied(false);
                                    }, 10000);
                                }}
                            />
                        </Button>
                    </InputGroup>
                    {tokenCopied && (
                        <Form.Text id="token-copied" muted>
                            Token copiado: <b>{`${token}`}</b>
                        </Form.Text>
                    )}
                </Form.Group>

                <Button className="button-status">
                    Status: {`${app?.Status}`}
                </Button>
            </Form>
        </>
    );
};

export default ProximosPassosForm;
