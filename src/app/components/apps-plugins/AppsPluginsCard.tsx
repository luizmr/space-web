import React from 'react';
import { Card } from 'react-bootstrap';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { AppOutput } from '../../models/cadastro-apps';

const AppsPluginsCard: React.FC<AppOutput> = ({ Nome, Logo, Link, Tipo }) => {
    return (
        <>
            <Card className="apps-plugins-card">
                <Card.Img variant="top" src={Logo} />
                <Card.Body className="apps-plugins-card__body">
                    <div>
                        <Badge
                            badgeContent={Tipo ? Tipo : 'Aplicativos'}
                            color={Tipo ? 'primary' : 'secondary'}
                        ></Badge>
                        <Card.Title>{Nome}</Card.Title>
                    </div>
                    <div className="apps-plugins-card__buttons">
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
