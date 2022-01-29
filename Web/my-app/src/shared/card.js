import React from 'react'
import { Card, Button } from 'react-bootstrap';

export default function DashboardHomeCard({titulo, descripcion, src_imagen, href}){
    return(
        <Card style={{ width: '18rem', float:'left',backgroundColor:'#E0E0E0'}} className="col-12 col-lg-3 mt-5 ml-1 mr-1">
            <Card.Img variant="top" src={src_imagen}/>
            <Card.Body>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>
                {descripcion}
                </Card.Text>
                <Button variant="primary" href={href} style={{backgroundColor:'#001F3D'}}>Ir al módulo</Button>
            </Card.Body>
        </Card>
    );
}