import React from 'react'
import NavigationBar from '../shared/navbar'
import {Table, Button} from 'react-bootstrap'

import './general.css'
import './Resources.css'


function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}


export default class Resources extends React.Component {
    constructor(){
        super();
        this.Recursos = '';
        this.filtrar_tabla = this.filtrar_tabla.bind(this);
    }

    

    filtrar_tabla(){
        let legajo = document.getElementById('legajo').value;

        fetch("https://psa-recursos.herokuapp.com/recursos/"+legajo)
        .then(response => response.json())
        .then(data => {
            this.Recursos = data;
            if (this.Recursos != null && !isArray((this.Recursos))){
                if(this.Recursos.legajo != undefined){
                    document.getElementsByTagName("tbody")[0].innerHTML = '<tr><td>'+0+'</td><td>'+this.Recursos.nombre+'</td><td>'+this.Recursos.apellido+'</td><td>'+this.Recursos.legajo+'</td></tr>';
                }else{
                    document.getElementsByTagName("tbody")[0].innerHTML = '';
                }
            }else if (this.Recursos != null && isArray(this.Recursos)){
                let string = '';
                 //this.Recursos.map((persona, index) =>
                 for (let i = 0; i < this.Recursos.length; i++) {
                    string +='<tr><td>'+i+'</td><td>'+this.Recursos[i].nombre+'</td><td>'+this.Recursos[i].apellido+'</td><td>'+this.Recursos[i].legajo+'</td></tr>';
                }
                document.getElementsByTagName("tbody")[0].innerHTML = string;
            }
            else{
                document.getElementsByTagName("tbody")[0].innerHTML = '';
            }
        });
    }

    componentDidMount() {
         fetch("https://psa-recursos.herokuapp.com/recursos")
        .then(response => response.json())
        .then(data => {
            this.Recursos = data;
            let string = '';
            //this.Recursos.map((persona, index) =>
            for (let i = 0; i < this.Recursos.length; i++) {
            string +='<tr><td>'+i+'</td><td>'+this.Recursos[i].nombre+'</td><td>'+this.Recursos[i].apellido+'</td><td>'+this.Recursos[i].legajo+'</td></tr>';
            }
            document.getElementsByTagName("tbody")[0].innerHTML = string;
        });
    }
    render() {
        return (
            <div>
                <NavigationBar/>
                <ul style={{  padding: '10px 5%',  listStyle: 'none',  backgroundColor:'#E0E0E0', color: 'black', flexDirection:'row', display:'flex'}}>
                    <li style={{marginRight:'5px'}}><a href="/home"> Home</a> / </li>
                    <li style={{marginRight:'5px'}}>Recursos</li>
                </ul>
                <h2 id="titulo_modulo">Recursos</h2>
                <div id="container_filtros" className='row mt-4'>
                    <h3 className="col-12 mb-4">Filtrá tu búsqueda</h3>
                    <div className='col-12 col-lg-3' id='filtro_texto'>
                        <input id='legajo' placeholder="Filtrar por Legajo..." style={{float: 'left'}}/>
                    </div>
                    <div className='col-12 col-lg-6'>
                    </div>
                    <div className="col-12 col-lg-3" id="boton_busqueda_cont">
                    <Button className='boton_oscuro' size={'lg'} onClick={this.filtrar_tabla}>Buscar</Button>{' '}
                    </div>
                </div>
                <div id="table_container" className="col-12 mt-4">
                    <Table responsive striped bordered variant="dark" className="table-dark">
                        <thead className="table-dark">
                            <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Legajo</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
