import React, {useState} from 'react';
import NavigationBar from '../shared/navbar';
import {Table, Button, Modal} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import './general.css'
import './CargaDeHoras.css'
import './FormCargaHoras'

export default function CargaDeHoras(){

    let Horas = '';
    let history = useHistory();
    

    function change_url(){
        history.push("./horas/cargar");
    }

    function reload(){
        let currentPath = window.location.pathname;
        history.replace(`${currentPath}/replace`);
        setTimeout(() => {
        history.replace(currentPath)
        }, 0);
    }

    

    async function postData(url = '', data = {}) {
        await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
    }


    async function borrar_carga(id_carga){
        await postData('https://psa-carga-de-horas.herokuapp.com/horas/'+id_carga, {});
    }


    function btFilter_onClick() {
        fetch("https://psa-carga-de-horas.herokuapp.com/horas/legajo/1/fecha/" + document.getElementById("fecha_desde").value
            + "/" + document.getElementById("fecha_hasta").value)
            .then(response => response.json())
            .then(data => {
                if (data === undefined){
                    return;
                }
                Horas = data;
                let string = '';
                for (let i = 0; i < Horas.length; i++) {
                    string += "<tr>"+
                    "<td>"+Horas[i].idCarga+"</td>"+
                    "<td>"+Horas[i].nombreTarea+"</td>"+
                    "<td>"+Horas[i].horas+"</td>"+
                    "<td>"+Horas[i].fecha.substr(8,2)+"/"+Horas[i].fecha.substr(5,2)+"/"+Horas[i].fecha.substr(0,4)+"</td>"+
                    "<td id='boton_edit_"+Horas[i].idCarga+"'></td>"+
                    "<td id='boton_eliminar_"+Horas[i].idCarga+"'></td>"+
                    "</tr>"
                }
                document.getElementsByTagName("tbody")[0].innerHTML = string;
                let table = document.getElementsByTagName("tbody")[0];
                for(let i=0, row; row=table.rows[i]; i++) {
                    let idCargaActual = row.firstChild.innerHTML;
                    ReactDOM.render(<Button id={idCargaActual} className='btn boton_oscuro' onClick={() => {history.push('/recursos/horas/editar/'+idCargaActual)}}><BsPencil/></Button>, document.getElementById('boton_edit_'+idCargaActual));
                    ReactDOM.render(<Button className="btn btn-warning" onClick={() => {borrar_carga(idCargaActual)}} id={idCargaActual}> <BsFillTrashFill/> </Button>, document.getElementById('boton_eliminar_'+idCargaActual));
                }
            });
    }
    
    class TablaHoras extends React.Component{

        constructor(props) {
            super(props);
            this.state = {id: 0, show: false, elim: false};
        }

        handleShow(idCargaActual) {
             this.state.show = true;
             this.state.id = idCargaActual;
             console.log(this.state.show);
             console.log(this.state.id);
             this.forceUpdate();
        }

        handleClose() {
            this.state.show = false;
            this.forceUpdate();
        }

        handleElim(){
            this.state.show = false;
            this.state.elim = true;
            this.forceUpdate();
        }

        handleElimClose(){
            reload();
        }

        componentDidMount() {
            fetch("https://psa-carga-de-horas.herokuapp.com/horas/legajo/1")
                .then(response => response.json())
                .then(data => {
                    Horas = data;
                    let string = '';
                    for (let i = 0; i < Horas.length; i++) {
                        string += "<tr>"+
                        "<td>"+Horas[i].idCarga+"</td>"+
                        "<td>"+Horas[i].nombreTarea+"</td>"+
                        "<td>"+Horas[i].horas+"</td>"+
                        "<td>"+Horas[i].fecha.substr(8,2)+"/"+Horas[i].fecha.substr(5,2)+"/"+Horas[i].fecha.substr(0,4)+"</td>"+
                        "<td id='boton_edit_"+Horas[i].idCarga+"'></td>"+
                        "<td id='boton_eliminar_"+Horas[i].idCarga+"'></td>"+
                        "</tr>"
                    }
                    document.getElementsByTagName("tbody")[0].innerHTML = string;
                    let table = document.getElementsByTagName("tbody")[0];
                    for(let i=0, row; row=table.rows[i]; i++) {
                        let idCargaActual = row.firstChild.innerHTML;
                        //document.getElementById('boton_edit_'+idCargaActual).innerHTML = "<Button class='btn boton_oscuro' href = '/recursos/horas/editar/"+idCargaActual+"'><BsPencil/></Button>";
                        ReactDOM.render(<Button id={idCargaActual} className='btn boton_oscuro' onClick={() => {history.push('/recursos/horas/editar/'+idCargaActual)}}><BsPencil/></Button>, document.getElementById('boton_edit_'+idCargaActual));
                        ReactDOM.render(<Button className="btn btn-warning" onClick={() => {this.handleShow(idCargaActual)}} id={idCargaActual}> <BsFillTrashFill/> </Button>, document.getElementById('boton_eliminar_'+idCargaActual));
                        //ReactDOM.render(<div onClick={this.handleShow}><BotonEliminar id={idCargaActual}/></div>, document.getElementById('boton_eliminar_'+idCargaActual));
                    }
                });
        }

        render(){
            return(
                <div>
                    <Table responsive striped bordered variant="dark" className="table-dark">
                        <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Tarea</th>
                            <th>Horas</th>
                            <th>Fecha</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                    <Modal show={this.state.show}>
                        <Modal.Header closeButton>
                            <Modal.Title>Verficar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>¿Está seguro que quiere borrar la carga {this.state.id}?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-warning' onClick={() => {borrar_carga(this.state.id); this.handleElim()}}>Eliminar</Button>
                            <Button className='btn btn-primary' onClick={() => this.handleClose()}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.elim}>
                        <Modal>
                            <Modal.Title>Eliminado</Modal.Title>
                        </Modal>
                        <Modal.Body>
                            <p>Se ha eliminado la carga {this.state.id} correctamente</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-primary' onClick={() => this.handleElimClose()}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
    }

    return (
        <div>
            <NavigationBar/>
            <ul style={{  padding: '10px 5%',  listStyle: 'none',  backgroundColor:'#E0E0E0', color: 'black', flexDirection:'row', display:'flex'}}>
                <li style={{marginRight:'5px'}}><a href="/home"> Home</a> / </li>
                <li style={{marginRight:'5px'}}><a href="/recursos"> Recursos</a> / </li>
                <li style={{marginRight:'5px'}}>Horas</li>
            </ul>

            <h2 id="titulo_modulo" className="pt-4">Horas cargadas</h2>
            <div id="container_filtros" className='row mt-4'>
                <h3 className="col-12 mb-4">Filtrá tu búsqueda</h3>
                <div className='col-12 col-lg-4' id='filtro_texto'>
                    <label >Fecha desde : </label>
                    <input type={"date"} id={"fecha_desde"}/>
                </div>
                <div className='col-12 col-lg-4' id='filtro_texto'>
                    <label >Fecha hasta : </label>
                    <input type={"date"} id={"fecha_hasta"}/>
                </div>
                <div className='col-12 col-lg-4'>
                    <Button id="btFilter" className="btn boton_oscuro mt-4" size={"lg"} onClick={btFilter_onClick}>Filtrar</Button>
                    <div className="divider"/>
                    <Button id="btQuitFilter" className="btn boton_oscuro mt-4" size={"lg"} onClick={reload}>Quitar Filtro</Button>
                </div>
                <div className='col-12 col-lg-4'>
                </div>
            </div>
            <div className="container_carga d-flex justify-content-center mt-4">
                <Button id='boton_de_carga' className='boton_oscuro' size={"lg"} onClick={change_url}>Cargar Horas</Button>
            </div>
            <div id="table_container" className="col-12 mt-4">
                <TablaHoras/>
            </div>
        </div>
    );
}