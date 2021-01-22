import React from 'react';
import { Card } from 'react-bootstrap';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { AppOutput } from '../../models/cadastro-apps';

const AppsPluginsCard: React.FC<AppOutput> = ({ Nome, Logo, Link, Tipo }) => {
    return (
        <>
            <Card className="meus-apps-card">
                <Card.Img variant="top" src={Logo} />
                <Card.Body className="meus-apps-card__body">
                    <div>
                        <Badge badgeContent={'Plugins'} color="primary"></Badge>
                        <Card.Title>{Nome}</Card.Title>
                    </div>
                    <div className="meus-apps-card__buttons">
                        <Button
                            variant="contained"
                            onClick={() => window.open(`${Link}`, '_blank')}
                        >
                            Abrir
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default AppsPluginsCard;
