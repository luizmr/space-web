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
    const [token, setToken] = useState<string>();
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

    const popoverUrl = (props: any) => (
        <Popover id="popover-basic" {...props}>
            <Popover.Content style={{ backgroundColor: 'red !important' }}>
                URL: <b>{`${url}`}</b> copiada!
            </Popover.Content>
        </Popover>
    );

    const popoverToken = (props: any) => (
        <Popover id="popover-basic" {...props}>
            <Popover.Content>
                Token: <b>{`${token}`}</b> copiado!
            </Popover.Content>
        </Popover>
    );

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
                        />
                        <InputGroup.Prepend>
                            <OverlayTrigger
                                // trigger="click"
                                placement="bottom"
                                overlay={popoverUrl}
                                delay={{ show: 200, hide: 400 }}
                            >
                                <Button className="copy-button">
                                    <FaClone
                                        onMouseMove={() => copy('url-copy')}
                                    />
                                </Button>
                            </OverlayTrigger>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Token"
                            value={token}
                            id="token-copy"
                        />
                        <InputGroup.Prepend>
                            <OverlayTrigger
                                // trigger="click"
                                placement="bottom"
                                overlay={popoverToken}
                                delay={{ show: 250, hide: 400 }}
                            >
                                <Button className="copy-button">
                                    <FaClone
                                        onMouseMove={() => copy('token-copy')}
                                    />
                                </Button>
                            </OverlayTrigger>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form.Group>

                <Button className="button-status">
                    Status: {`${app?.Status}`}
                </Button>
            </Form>
        </>
    );
};

export default ProximosPassosForm;
