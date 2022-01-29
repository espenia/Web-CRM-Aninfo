import React from 'react'
import {Table} from 'react-bootstrap'
import { useHistory } from "react-router-dom";


export default function TicketGrid({ticketData}) {
    const history = useHistory();
    const handleRowClick = (id) => {
      history.push(`/soporte/tickets/${id}`);
    }  
    console.log("ticketData: ",ticketData);
    
    return (
        <div style={{ margin: '0 10% 0 10%', height:'300px', overflow:'auto'}}>
             <Table striped bordered hover variant="dark">
                <thead style={{backgroundColor:'#045174'}}>
                    <tr>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Fecha de Vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ticketData.map((ticket) => (
                            <tr style={{cursor:'pointer'}} onClick={ () => handleRowClick(ticket.id)}>
                                <td>{ticket.name}</td>
                                <td>{ticket.state}</td>
                                <td>{ticket.expirationDate.split('T')[0]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}
