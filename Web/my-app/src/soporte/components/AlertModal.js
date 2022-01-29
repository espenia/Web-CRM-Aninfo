import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function AlertModal({showModal, handleCloseModal, varsRequired, title, isAlert, text}) {
    return (
        <Modal centered show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton style={{alignItems:'center',backgroundColor:'#eee'}}>
                <h5 style={{marginRight:'4%',backgroundColor:'#eee'}}>{title}</h5>
            </Modal.Header>
            <Modal.Body>
                <p>{text}</p>
                {
                    isAlert &&
                    <ul style={{  padding: '2% 2% 2% 5%'}}>
                        {
                            varsRequired && varsRequired.map((varRequired) => (
                                <li style={{marginRight:'5px'}}> {varRequired} </li>
                            ))
                        }
                    </ul>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" style={{backgroundColor:'#045174',border:'none',color:'white' }} onClick={handleCloseModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
