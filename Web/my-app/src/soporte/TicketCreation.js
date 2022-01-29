import React, {useState, useEffect} from 'react'
import { Card, Button, Dropdown } from 'react-bootstrap'
import { useHistory, useParams } from "react-router-dom";
import {products} from './ProductList'
import AlertModal from './components/AlertModal'

export default function TicketCreation() {
    const statusValues = ["EN_PROGRESO","NUEVO", "BLOQUEADO", "RESUELTO"];
    const severityValues = ["S1","S2","S3","S4"];
    const priorityValues = ["CRITICA","ALTA","MEDIA","BAJA"];
    const {idProducto} = useParams();
    const selectedProductName = products.filter((product) => product.id.toString() === idProducto)[0].name
    const selectedProductVersion = products.filter((product) => product.id.toString() === idProducto)[0].version
    
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

    const [varsRequired, setVarsRequired] = useState([])
    const [responsableSelected, setResponsableSelected] = useState("")
    const [clientSelected, setClientSelected] = useState("")
    const [clients, setClients] = useState([])
    const [humanResources, setHumanResources] = useState([])
    const [loadingRRHH, setLoadingRRHH] = useState(true)
    const [loadingClients, setLoadingClients] = useState(true)
    const history = useHistory();
    const handleBackButtonClick = () => {
      history.goBack();
    } 


    const [newTicket, setNewTicket] = useState({
        name: "",
        productId: idProducto, 
        description: "",
        severity: "",
        creator: "",
        clientId: -1,
        state: "NUEVO",
        priority: "",
        idResponsable: -1
    }) 



    const getClients = () => {
        const url = "https://psa2021-soporte.herokuapp.com/client"
    
        const requestOptions = {
            method: 'GET'
        }
    
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                   //codigo en caso de error
                   return;
                }
                console.log("OK");
                return response.json();
            }).then(json => {
                if(json){
                    setClients(json);
                    setLoadingClients(false)
                }
            })
    }

    const getHumanResources = () => {
        const url = `https://psa-recursos.herokuapp.com/recursos`
    
        const requestOptions = {
            method: 'GET'
        }
    
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                   //codigo en caso de error
                   return;
                }
                console.log("OK");
                return response.json();
            }).then(json => {
                if(json){
                    setHumanResources(json);
                    setLoadingRRHH(false)
                }
            })
    }

    const handleDropdownTicket = (type,value) => {
        console.log("value: ",value);
        if(type === "clientId"){
            setClientSelected(value["razon social"])
            value = value.id
        }
        if(type === "idResponsable"){
            setResponsableSelected(`${value.nombre} ${value.apellido}`)
            value = value.legajo
        }

        setNewTicket({
            ...newTicket, 
            [type]: value
        })
    }

    const handleInputChange = (e) => {
        setNewTicket({
            ...newTicket, 
            [e.target.name]: e.target.value
        })
    }
    
    const DashboardDataCard = ({title,data, extraStyle}) => (
        <Card style={{...extraStyle, marginBottom:'8%', padding: '4% 0 0 5%',backgroundColor:'#E0E0E0'}}>
            <h5>{title}</h5>
            <p>{data}</p>
        </Card>
    )    
    
    const DashboardDropdownCard = ({required, title,data, itemName, dropdownItems}) => (
        <Card style={{ marginBottom:'8%', padding: '4% 0 0 5%',backgroundColor:'#E0E0E0'}}>
            <h5 className="d-flex flex-direction-row">{title} {required && <p style={{color:'red'}}>*</p>}</h5>
            <Dropdown >
                <Dropdown.Toggle disabled={(title === "Responsable" && loadingRRHH) || (title === "Cliente" && loadingClients)} style={{marginBottom:'5%',backgroundColor:'#001F3D'}} variant="secondary" id="dropdown-basic">
                    {data === "" || data === -1 ? "Seleccionar" : data}
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
                    {
                        dropdownItems.map((item) => (
                            <Dropdown.Item name={itemName} onClick={(e) => handleDropdownTicket(e.target.name,item)} >
                                { title=== "Responsable" ? `${item.nombre} ${item.apellido}` : (title==="Cliente" ? item["razon social"] : item)}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Card>
    )

    const validateTicket = () => {
        // Prioridad severidad cliente descripcion creador
        let var_required = [];
        if(newTicket.priority === ""){
            var_required.push("Prioridad")
        }
        if(newTicket.severity === ""){
            var_required.push("Severidad")
        }
        if(newTicket.clientId === -1){
            var_required.push("Cliente")
        }
        if(newTicket.description === ""){
            var_required.push("Descripción")
        }
        if(var_required.length !== 0){
            setVarsRequired(var_required)
            handleOpenModal()
            return true;
        }
        return false;
    }

    const handleCreateTicket = (e) => {
        e.preventDefault()
        const ticketIsCorrect = validateTicket()
        if(ticketIsCorrect){
            return
        }

        let newTicketCopy = newTicket
        newTicketCopy.name = newTicket.name === "" ? "Nuevo Ticket" : newTicket.name 
        newTicketCopy.responsableId = newTicket.idResponsable
        console.log("Ola quiero crear este ticket: ", newTicketCopy);
        const url = "https://psa2021-soporte.herokuapp.com/ticket"
        const jsonBody = JSON.stringify(newTicketCopy)    
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: jsonBody
        }
    
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                   //codigo en caso de error
                   return;
                }
                history.goBack();
            })
    }

    useEffect(() => {
        getHumanResources()
        getClients()
    }, [])

    return (
        <div>
            <div style={{padding:'2%',backgroundColor:'#eee'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin: '0 16% 1.5% 16%'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'30%'}}>
                        <Button variant="primary" style={{border:'none',backgroundColor:'#001F3D',color:'white', }} onClick={handleBackButtonClick}>Volver</Button>
                        <h3>Nuevo Ticket</h3>
                    </div>
                </div>
                <form onSubmit={handleCreateTicket} style={{display:'flex', flexDirection:'column'}}>
                    <Card style={{display:'flex', flexDirection:'row', borderStyle:'none', justifyContent:'space-between', margin: '0 15% 0 15%',backgroundColor:'#eee'}}>
                        <Card style={{ marginRight:'2%', padding:'2%', flex:1,backgroundColor:'#045174'}}>
                            <Card style={{borderWidth:1, borderRadius:'2%', marginBottom:'8%', padding: '4% 0 0 5%',backgroundColor:'#E0E0E0'}}>
                                <h5>Nombre Ticket</h5>
                                <input className="form-control" type="text" name="name" value={newTicket.name} onChange={handleInputChange} style={{marginBottom:'5%', width:'85%'}}/>
                            </Card>
                            <DashboardDataCard title="Producto" data={selectedProductName}/>
                            <DashboardDataCard title="Versión" data={selectedProductVersion}/>
                            <DashboardDropdownCard required itemName="severity" title="Severidad" data={newTicket.severity} dropdownItems={severityValues}/>
                            <DashboardDropdownCard required itemName="priority" title="Prioridad" data={newTicket.priority} dropdownItems={priorityValues}/>
                            <DashboardDataCard title="Fecha de Vencimiento" data=" - "/>
                            <DashboardDataCard title="Fecha de Creacion" data=" - "/>
                            <DashboardDataCard title="Fecha de Resolucion" data=" - "/>
                        </Card>
                        <Card style={{ marginLeft:'2%', padding:'2%', flex:1,backgroundColor:'#045174'}}> 
                            <DashboardDropdownCard itemName="state" title="Estado" data= {newTicket.state} dropdownItems={statusValues}/>
                            <DashboardDropdownCard required itemName="clientId" title="Cliente" data={clientSelected} dropdownItems={clients}/>
                            <DashboardDropdownCard itemName="idResponsable" title="Responsable"  data={responsableSelected} dropdownItems={humanResources}/>
                            <Card style={{borderWidth:1, marginBottom:'8%', padding: '4% 0 0 5%',backgroundColor:'#E0E0E0'}}>
                                <h5 className="d-flex flex-direction-row">Creador </h5>
                                <input className="form-control" type="text" name="creator" value={newTicket.creator} onChange={handleInputChange} style={{marginBottom:'5%', width:'85%'}}/>
                            </Card>
                            <Card style={{height:'50%', borderWidth:1, marginBottom:'8%', padding: '4% 0 0 5%',backgroundColor:'#E0E0E0'}}>
                                <h5 className="d-flex flex-direction-row">Descripción <p style={{color:'red'}}>*</p></h5>
                                <textarea name="description" value={newTicket.description} onChange={handleInputChange} className="form-control" rows="5" style={{marginTop:'2%',width:'85%', height:'80%'}}/>
                            </Card>
                        </Card>
                    </Card>
                    <Button type="submit" className='btn' variant="primary" style={{backgroundColor:'#E87A00', border:'none',color:'white',padding:'1%', width:'10%', marginTop:'2%', alignSelf:'center' }}>Crear Ticket</Button>
                </form>
            </div>
            <AlertModal
                handleCloseModal={handleCloseModal} 
                showModal={showModal} 
                varsRequired={varsRequired}
                title="Advertencia"
                isAlert={true}
                text="Los siguientes campos deben ser llenados de forma obligatoria:"
            />
        </div>
    )
}
