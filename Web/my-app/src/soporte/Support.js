import React, { useState } from 'react'
import { Form, InputGroup, Button ,Alert} from 'react-bootstrap'

import NavigationBar from '../shared/navbar'
import ProductCard from './components/ProductCard'

import {products} from './ProductList'

export default function Support() {
    const [productList, setProductList] = useState(products)
    const [inputSearch, setInputSearch] = useState("")

    const searchProducts = (searchText) => {
        if(!searchText || searchText === ""){
            setProductList(products)
            return;
        } 
        const filteredProducts = products.filter((item) => (item.name.includes(searchText)))
        setProductList(filteredProducts);
    }


    return (
        <div style={{backgroundColor:'#eee', color:'black', paddingBottom:'3%'}}>
            <NavigationBar/>
            <div style={{marginTop:'1%'}}>
            <ul style={{  padding: '10px 5%',  listStyle: 'none',  backgroundColor:'#E0E0E0', color: 'black', flexDirection:'row', display:'flex'}}>
                <li style={{marginRight:'5px'}}><a href="/home"> Home</a> / </li>
                <li style={{marginRight:'5px'}}><a href="/soporte/productos"> Soporte</a> / </li>
                <li style={{marginRight:'5px'}}>Productos</li>
            </ul>
                <h3 style={{marginLeft:'5%'}}>Productos</h3>
                <Form style={{width:'30%', alignContent:'center',marginTop: '1.5%', display:'flex', marginLeft:'33%'}}>
                    <InputGroup className="mb-3">
                        <Form.Control onChange={(e) => setInputSearch(e.target.value)} type="search" placeholder="Buscar producto"/>
                        <InputGroup.Append>
                            <Button  variant="primary" style={{backgroundColor:'#001F3D',borderColor:'#001F3D',color:'white' }} onClick={() => searchProducts(inputSearch)}>Buscar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <div 
                    style=
                    {{
                        display:'flex',
                        flexWrap: 'wrap',
                        paddingBottom:'3%',
                        width:'90%',
                        justifyContent:'space-around',
                        margin: '0 auto',
                        backgroundColor:'#E0E0E0',
                        
                    }}>
                    {
                        productList.length !== 0 ?
                        productList.map((item) => (
                            <ProductCard name={item.name} version={item.version} id={item.id}/>
                        )) :
                        <Alert variant={"danger"} style={{margin:'3% 15% 0 15%', padding:'1%'}}>No hay resultados disponibles.</Alert>
                    }
                </div>
            </div>
        </div>
    )
}