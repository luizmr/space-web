import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { AppOutput } from '../../models/cadastro-apps';

const MeusAppsCard: React.FC<AppOutput> = ({ Nome, Logo, Descricao, Link }) => {
    const [state, setState] = useState({
        checkedA: true,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <>
            <Card className="meus-apps-card">
                <Card.Img variant="top" src={Logo} />
                <Card.Body className="meus-apps-card__body">
                    <div>
                        <Card.Title>{Nome}</Card.Title>
                        <Card.Text>
                            <p>{Descricao}</p>
                        </Card.Text>
                    </div>
                    <div className="meus-apps-card__buttons">
                        <Button
                            variant="contained"
                            onClick={() => window.open(`${Link}`, '_blank')}
                        >
                            Abrir
                        </Button>
                        <Button variant="contained">Remover</Button>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={state.checkedA}
                                        onChange={handleChange}
                                        name="checkedA"
                                        color="primary"
                                    />
                                }
                                label=""
                            />
                        </FormGroup>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default MeusAppsCard;
