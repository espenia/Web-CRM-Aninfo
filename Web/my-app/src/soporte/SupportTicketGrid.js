import React, {useState, useEffect} from 'react'
import NavigationBar from '../shared/navbar'
import TicketGrid from './components/TicketGrid'
import { Form, InputGroup, Button, Alert,ToggleButton,ButtonGroup } from 'react-bootstrap'
import {
    useParams,
    Link
} from "react-router-dom";

import Checkbox from '@material-ui/core/Checkbox';

import {products} from './ProductList'

export default function SupportTicketGrid() {
    const {idProducto} = useParams();
    const [ticketList, setTicketList] = useState([])
    const [ticketFiltered, setTicketFiltered] = useState([])
    const [isFiltered, setIsFiltered] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [inputSearch, setInputSearch] = useState("")
    const selectedProduct = products.filter((product) => product.id.toString() === idProducto)[0]

    const searchProducts = (searchText) => {
        if(!searchText || searchText === ""){
            setTicketFiltered([])
            setIsFiltered(false)
            return;
        } 
        const filteredTickets = ticketList.filter((item) => (item.name.includes(searchText)))
        setTicketFiltered(filteredTickets);
        setIsFiltered(true)
    }

    const searchStates = () => {
        if(isChecked==false){
            const filteredTickets = ticketList.filter((item) => (item.state == 'RESUELTO'))
            setTicketFiltered(filteredTickets);
            setIsFiltered(true)
            setIsChecked(true)
        }else{
            setTicketFiltered(ticketList);
            setIsFiltered(false)
            setIsChecked(false)
        }
    }


    const getTicketsForProduct = () => {
        const url = `https://psa2021-soporte.herokuapp.com/ticket/product/${idProducto}`

        const requestOptions = {
            method: 'GET',
        }

        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                   return;
                }
                console.log("OK");
                return response.json();
            })
            .then(json => {
                if(json){
                    console.log("Json: ", json);
                    setTicketList(json)
                }
            })
    }

    useEffect(() => {
        getTicketsForProduct();
    },[]);


    return (
        <div style= {{backgroundColor:'#eee', height:'100vh'}}>
            <NavigationBar/>
            <div style={{marginTop:'1%'}}>
                <ul style={{  padding: '10px 5%',  listStyle: 'none',  backgroundColor:'#E0E0E0', color: 'black', flexDirection:'row', display:'flex'}}>
                    <li style={{marginRight:'5px'}}><a href="/home"> Home</a> / </li>
                    <li style={{marginRight:'5px'}}><a href="/soporte/productos"> Soporte</a> / </li>
                    <li style={{marginRight:'5px'}}><a href="/soporte/productos"> Productos</a> /</li>
                    <li style={{marginRight:'5px'}}>Tickets de {selectedProduct.name}</li>
                </ul>
                <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                    <h3 style={{marginLeft:'10%'}}>Tickets de {selectedProduct.name}</h3>
                    <Link to={"/soporte/tickets/create/"+idProducto} style={{backgroundColor:'#001F3D', borderRadius:'6%', color:'white', marginRight:'10%', padding:'0 2% 0 2%' }}>
                        <Button  variant="primary"  style={{backgroundColor:'#001F3D',  borderColor:'#001F3D',color:'white',padding:'0 2% 0 2%' }}>
                            Crear Ticket
                        </Button>
                    </Link>
                </div>
                <Form style={{width:'30%', alignContent:'center',marginTop: '1.5%', display:'flex', marginLeft:'33%', marginBottom:'0.5%'}}>
                    <InputGroup className="mb-3">
                        <Form.Control onChange={(e) => setInputSearch(e.target.value)} type="search" placeholder="Buscar ticket.."/>
                        <InputGroup.Append>
                            <Button  variant="primary" style={{backgroundColor:'#001F3D',borderColor:'#001F3D',color:'white' }} onEnter={() => searchProducts(inputSearch)} onClick={() => searchProducts(inputSearch)}>Buscar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <Checkbox style={{color: '#045174',marginLeft:'75%'}}
                    value={isChecked}
                    inputProps={{ 'aria-label': 'Checkbox A' }} onClick={() => searchStates()}  
                /> Mostrar Solo Resueltos
                

                {
                    ticketList.length === 0 || (ticketFiltered.length === 0 && isFiltered) ?
                    <Alert variant={"danger"} style={{margin:'3% 15% 0 15%', padding:'1%'}}>No hay resultados disponibles.</Alert>:
                    <TicketGrid ticketData={isFiltered ? ticketFiltered : ticketList}/> 
                }

            </div>
        </div>
    )
}