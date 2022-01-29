import React from 'react'
import { Card } from 'react-bootstrap'
import {
    Link
  } from "react-router-dom";

export default function ProductCard({name,version, id}) {
    return (
        <Card style={{ flex: '0 0 15%', marginTop: '2%', marginRight:'2%',marginLeft:'2%', width:'20%', cursor:'pointer'}}>
            <Card.Header style={{ backgroundColor: '#045174', color: 'white'}}>Ver. {version}</Card.Header>
            <Card.Body style={{ backgroundColor: '#D89C60', color: '#001F3D'}}>
                <Link to={`./productos/${id}`}><h5 style={{color:'black'}}>{name}</h5></Link>
            </Card.Body>
        </Card>
    )
}
