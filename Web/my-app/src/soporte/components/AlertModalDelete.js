import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function AlertModal({showModal, handleCloseModal, title, text,handleDeleteTicket}) {
    return (
        <Modal centered show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton style={{alignItems:'center',backgroundColor:'#eee'}}>
                <h5 style={{marginRight:'4%',backgroundColor:'#eee'}}>{title}</h5>
            </Modal.Header>
            <Modal.Body>
                <p>{text}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" style={{backgroundColor:'#ca6212',border:'none',color:'white' }} onClick={handleDeleteTicket}>
                    Eliminar
                </Button>
                <Button variant="secondary" style={{backgroundColor:'#045174',border:'none',color:'white' }} onClick={handleCloseModal}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
