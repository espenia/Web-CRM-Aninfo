import React, {useEffect, useState} from 'react'
import { Card, Button, Dropdown, Alert } from 'react-bootstrap'
import { useHistory, useParams, Link } from "react-router-dom";
import AddTaskModal from './components/AddTaskModal';
import AlertModal from './components/AlertModal'
import AlertModalDelete from './components/AlertModalDelete'

//tasklist -> lista tareas
const DashboardListCard = ({taskList, projectName}) => (
    <Card style={{marginLeft:'2%', borderStyle:'solid', backgroundColor:'#E0E0E0', margin:'0 2% 2% 2%'}}>
        <ul style={{  padding: '2% 2% 2% 5%'}}>
            <li style={{marginRight:'5px'}}> {projectName} </li>
            {
                taskList.map((task) => (
                    <ul>
                        <li style={{marginRight:'5px'}}> {task} </li>
                    </ul>
                ))
            }
        </ul>

    </Card>
)

export default function TicketDetails() {
    const statusValues = ["EN_PROGRESO","NUEVO", "BLOQUEADO", "RESUELTO"];
    const severityValues = ["S1","S2","S3","S4"];
    const priorityValues = ["CRITICA","ALTA","MEDIA","BAJA"];

    const {idTicket} = useParams();
    const {idTarea} = useParams();
    const [linkTaskIsLoading, setLinkTaskIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalSuccessLink, setShowModalSuccessLink] = useState(false)
    const [currentTicket, setCurrentTicket] = useState(null);
    const [errorTicket, setErrorTicket] = useState(false)
    const [tasksAssociated, setTasksAssociated] = useState([])

    
    const [varsRequired, setVarsRequired] = useState([])
    const [responsableSelected, setResponsableSelected] = useState("")
    const [clientSelected, setClientSelected] = useState("")
    const [clients, setClients] = useState([])
    const [humanResources, setHumanResources] = useState([])
    const [loadingRRHH, setLoadingRRHH] = useState(true)
    const [loadingClients, setLoadingClients] = useState(true)

    const handleCloseModalSuccessLink = () => setShowModalSuccessLink(false);
    const handleOpenModalSuccessLink = () => setShowModalSuccessLink(true);
    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModalAlert = () => setShowModalAlert(false);
    const handleOpenModalAlert = () => setShowModalAlert(true);
    const handleCloseModalSuccess = () => setShowModalSuccess(false);
    const handleOpenModalSuccess = () => setShowModalSuccess(true);
    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleOpenModalDelete = () => setShowModalDelete(true);
    const history = useHistory();



    const getClients = async(ticket) => {
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
                    const clientSelected = json.find((client) => client.id === ticket.clientId)
                    setClientSelected(clientSelected["razon social"])
                    setLoadingClients(false)
                }
            })
    }

    const getHumanResources = async(ticket) => {
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
                    if(ticket.responsableId !== -1){
                        const humanSelected = json.find((human) => human.legajo === ticket.responsableId)
                        setResponsableSelected(`${humanSelected.nombre} ${humanSelected.apellido}`)
                    }
                    setLoadingRRHH(false)
                }
            })
    }


    const handleDeleteTicket = () => {
        const url = `https://psa2021-soporte.herokuapp.com/ticket/${currentTicket.id}`
        const requestOptions = {
            method: 'DELETE'
        }
    
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                   //codigo en caso de error
                   console.log("Error");
                   return;
                }
                history.push(`/soporte/productos/${currentTicket && currentTicket.productId}`)
            })
    }

    const setClientAndResponsable = (ticket) => {
        getHumanResources(ticket)
        getClients(ticket)
    }
    
    const handleGetTicket = () => {
        const url = `https://psa2021-soporte.herokuapp.com/ticket/${idTicket}`
    
        const requestOptions = {
            method: 'GET'
        }
    
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                   //codigo en caso de error
                   setErrorTicket(true);
                   return;
                }
                console.log("OK");
                return response.json();
            }).then(json => {
                if(json){
                    setClientAndResponsable(json);
                    json.expirationDate = json.expirationDate.split('T')[0]
                    json.creationDate = json.creationDate.split('T')[0]
                    if(json.resolvedDate)
                        json.resolvedDate = json.resolvedDate.split('T')[0]

                    setCurrentTicket(json);
                    console.log("currr ticket: ",json);
                }
            })
    }

    const handleInputChange = (e) => {
        setCurrentTicket({
            ...currentTicket, 
            [e.target.name]: e.target.value
        })
    }

    const handleDropdownTicket = (type,value) => {
        console.log("value: ",value, "Type: ", type);
        if(type === "clientId"){
            setClientSelected(value["razon social"])
            value = value.id
        }
        if(type === "responsableId"){
            setResponsableSelected(`${value.nombre} ${value.apellido}`)
            value = value.legajo
        }

        setCurrentTicket({
            ...currentTicket, 
            [type]: value
        })
    }

    const validateTicket = () => {
        // Prioridad severidad cliente descripcion creador
        let var_required = [];
        if(currentTicket.priority === ""){
            var_required.push("Prioridad")
        }
        if(currentTicket.severity === ""){
            var_required.push("Severidad")
        }
        if(currentTicket.clientId === -1){
            var_required.push("Cliente")
        }
        if(currentTicket.description === ""){
            var_required.push("Descripción")
        }
        if(var_required.length !== 0){
            setVarsRequired(var_required)
            handleOpenModalAlert()
            return true;
        }
        return false;
    }

    const handleUpdateTicket = (e) => {
        e.preventDefault()
        const ticketIsCorrect = validateTicket()
        if(ticketIsCorrect){
            return
        }
        console.log("Ola quiero updatear este ticket: ", currentTicket);
        const url = "https://psa2021-soporte.herokuapp.com/ticket/update"
 


        const jsonBody = JSON.stringify({
            id: currentTicket.id,
            productId: currentTicket.productId,
            name: currentTicket.name === "" ? "Nuevo Ticket" : currentTicket.name,
            description: currentTicket.description,
            severity: currentTicket.severity,
            creator: currentTicket.creatorName,
            clientId: currentTicket.clientId,
            state: currentTicket.state,
            priority: currentTicket.priority,
            responsableId: currentTicket.responsableId
        })    
        console.log("Lo que le envio al aapi:",jsonBody);
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
                console.log("OK");
                handleOpenModalSuccess();
                if(currentTicket.name === ""){
                    setCurrentTicket({
                        ...currentTicket,
                        name: "Nuevo Ticket"
                    })
                }
                return response.json();
            }).then((ticket) => {

                if(ticket && ticket.resolvedDate && currentTicket.state === "RESUELTO"){
                    console.log("La date dice",ticket.resolvedDate);
                    setCurrentTicket({
                        ...currentTicket,
                        resolvedDate: ticket.resolvedDate.split('T')[0]
                    })
                }
                if(ticket && currentTicket.state !== "RESUELTO"){
                    console.log("no es resuelto");
                    setCurrentTicket({
                        ...currentTicket,
                        resolvedDate: null
                    })
                }
                if(ticket && ticket.expirationDate){
                    setCurrentTicket({
                        ...currentTicket,
                        expirationDate: ticket.expirationDate.split('T')[0]
                    })
                }
            })
    }

    const linkTaskWithTicket = () => {
        console.log(`vengo de tareas y quiero vincular el task ${idTarea} al ticket ${idTicket}`);

        const url = `https://psa2021-soporte.herokuapp.com/ticket/${idTicket}/task/${idTarea}`

        const jsonBody = JSON.stringify({
            ticketId: idTicket,
            taskId: idTarea
        })    
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
                console.log("asociacion OK");
            })
    }

    const getTasksLinked = () => {
        setLinkTaskIsLoading(true)
        setTasksAssociated([])
        const url = `https://psa2021-soporte.herokuapp.com/ticket/${idTicket}/task`
        console.log("url:", url);
        const requestOptions = {
            method: 'GET'
        }
    
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                   //codigo en caso de error
                   return;
                }
                console.log("get tareas asociadas OK");
                return response.json()
            }).then(tasksLinked => {
                console.log("task linked",tasksLinked);
                setLinkTaskIsLoading(false)
                if(tasksLinked)
                    setTasksAssociated(tasksLinked)
            })
    }

    useEffect(() => {
        handleGetTicket()
        if(idTarea){
            console.log("Hola! la tarea vale :", idTarea);
            linkTaskWithTicket()
        }
        getTasksLinked()
    }, [])

    const DashboardDataCard = ({title,data, extraStyle}) => (
        <Card style={{...extraStyle, marginBottom:'8%', padding: '4% 0 0 5%', backgroundColor:'#E0E0E0'}}>
            <h5>{title}</h5>
            <p>{data != null ? data : " - "}</p>
        </Card>
    )
    
    const DashboardDropdownCard = ({required, title,data, itemName, dropdownItems}) => (
        <Card style={{ marginBottom:'8%', padding: '4% 0 0 5%',backgroundColor:'#E0E0E0'}}>
            <h5 className="d-flex flex-direction-row">{title} {required && <p style={{color:'red'}}>*</p>}</h5>
            <Dropdown >
                <Dropdown.Toggle disabled={(title === "Responsable" && loadingRRHH) || (title === "Cliente" && loadingClients)} style={{marginBottom:'5%',backgroundColor:'#045174'}} variant="secondary" id="dropdown-basic">
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
    const NoTicketAlert = () => (
        <Alert variant={"danger"} style={{margin:'3% 15% 0 15%', padding:'1%'}}>No existe un ticket asociado.</Alert>
    )

    return (
        <div className="container-fluid align-self-center" style={{margin:0, padding:0}}>
            {
                errorTicket ?
                <NoTicketAlert/> :
                <div>
                    <div className="d-flex flex-column justify-content-center" style={{padding:'2%',backgroundColor:'#eee'}}>
                        <div className="d-flex justify-content-center"style={{marginTop:'2%', marginBottom:'2%'}}>
                            <div className="d-flex" style={{width:'60%'}}>
                                <Link to={`/soporte/productos/${currentTicket && currentTicket.productId}`}>
                                    <Button variant="primary" style={{backgroundColor:'#001F3D',border:'none',color:'white'}}>Volver</Button>
                                </Link>
                                <h3 style={{marginLeft:'5%'}}>Detalles del Ticket</h3>
                            </div>
                            <Button variant="primary" style={{backgroundColor:'#ca6212',border:'none',color:'white' }} onClick={handleOpenModalDelete} >Eliminar ticket</Button>
                        </div>
                    
                        <form onSubmit={handleUpdateTicket}>
                            <Card style={{display:'flex', flexDirection:'row', borderStyle:'none', justifyContent:'space-between', margin: '0 15% 0 15%',backgroundColor:'#eee'}}>
                                <Card style={{borderWidth:2, marginRight:'2%', borderStyle:'solid', padding:'2%', flex:1,backgroundColor:'#045174'}}>
                                    <Card style={{ marginBottom:'8%', padding: '4% 0 0 5%',backgroundColor:'#E0E0E0'}}>
                                        <h5>Nombre Ticket</h5>
                                        <input className="form-control" type="text" name="name" value={currentTicket && currentTicket.name} onChange={handleInputChange} style={{marginBottom:'5%', width:'85%'}}/>
                                    </Card>
                                    <DashboardDataCard title="Producto" data="App música"/>
                                    <DashboardDataCard title="Versión" data="1.0.21"/>
                                    <DashboardDropdownCard required itemName="severity" title="Severidad" data={ currentTicket && currentTicket.severity} dropdownItems={severityValues}/>
                                    <DashboardDropdownCard required itemName="priority" title="Prioridad" data={ currentTicket && currentTicket.priority} dropdownItems={priorityValues}/>
                                    <DashboardDataCard title="Fecha de Vencimiento" data={ currentTicket && currentTicket.expirationDate}/>
                                    <DashboardDataCard title="Fecha de Creacion" data={ currentTicket && currentTicket.creationDate}/>
                                    <DashboardDataCard title="Fecha de Resolucion" data={ currentTicket && currentTicket.resolvedDate}/>
                                </Card>
                                <Card style={{borderWidth:2, marginLeft:'2%', borderStyle:'solid', padding:'2%', flex:1,backgroundColor:'#045174'}}> 
                                    <DashboardDropdownCard itemName="state" title="Estado" data={ currentTicket && currentTicket.state} dropdownItems={statusValues}/>
                                    <DashboardDropdownCard required itemName="clientId" title="Cliente" data={clientSelected} dropdownItems={clients}/>
                                    <DashboardDropdownCard itemName="responsableId" title="Responsable"  data={responsableSelected} dropdownItems={humanResources}/>
                                    <Card style={{ marginBottom:'8%', padding: '4% 0 0 5%',backgroundColor:'#E0E0E0'}}>
                                        <h5 className="d-flex flex-direction-row">Creador</h5>
                                        <input className="form-control" type="text" name="creatorName" value={currentTicket && currentTicket.creatorName} onChange={handleInputChange} style={{marginBottom:'5%', width:'85%'}}/>
                                    </Card>
                                    <Card style={{height:'50%', marginBottom:'8%', padding: '4% 0 0 5%',backgroundColor:'#E0E0E0'}}>
                                        <h5 className="d-flex flex-direction-row">Descripción <p style={{color:'red'}}>*</p></h5>
                                        <textarea name="description" value={currentTicket && currentTicket.description} onChange={handleInputChange} className="form-control" rows="5" style={{marginTop:'2%',width:'85%', height:'80%'}}/>
                                    </Card>
                                </Card>
                            </Card>
                            <div className="d-flex flex-column">
                                <Card style={{margin: '3% 15% 0 15%',backgroundColor:'#045174',color:'#000000'}}>
                                    <div style={{flexDirection:'row', display:'flex', margin:'2% 0 2% 2%'}}>
                                        <h4 style={{marginRight:'5%', color:'#eeeeee'}}>Tareas Asociadas</h4>
                                        <Button variant="primary" style={{backgroundColor:'#ca6212',border:'none',color:'white' }} onClick={handleOpenModal} >Asociar tarea</Button>
                                    </div>
                                    {
                                        tasksAssociated.length === 0 ?
                                        <Alert variant={"primary"} style={{margin:'2%'}}>
                                            <p style={{color:'black',marginTop:'0.5%',textAlign:'center'}}>{linkTaskIsLoading ? "Cargando..." : "No hay tareas asociadas al ticket."}</p>
                                        </Alert>:
                                        tasksAssociated.map((project) => (
                                            <DashboardListCard projectName={project.name} taskList={project.tasks} />
                                        ))
                                    }
                                </Card>
                            
                                <Button type="submit" className='btn' variant="primary" style={{backgroundColor:'#ca6212', border:'none',color:'white',padding:'1%', width:'10%', marginTop:'2%', alignSelf:'center' }}>Actualizar ticket</Button>
                            </div>
                        </form>
                    </div>
                    <AddTaskModal getTasksLinked={getTasksLinked} handleCloseModal={handleCloseModal} handleOpenModalSuccessLink={handleOpenModalSuccessLink} showModal={showModal} idTicket={idTicket}/>
                    <AlertModal 
                        handleCloseModal={handleCloseModalAlert} 
                        showModal={showModalAlert} 
                        varsRequired={varsRequired}
                        title="Advertencia"
                        isAlert={true}
                        text="Los siguientes campos deben ser llenados de forma obligatoria:"
                    />
                    <AlertModal 
                        handleCloseModal={handleCloseModalSuccess} 
                        showModal={showModalSuccess} 
                        title="Actualización de ticket exitosa"
                        isAlert={false}
                        text="Se realizó la actualización del ticket exitosamente."
                    />
                    <AlertModal 
                        handleCloseModal={handleCloseModalSuccessLink} 
                        showModal={showModalSuccessLink} 
                        title="Vinculación de tarea exitosa"
                        isAlert={false}
                        text="Se realizó la vinculación con el ticket exitosamente."
                    />
                    <AlertModalDelete 
                        handleCloseModal={handleCloseModalDelete} 
                        showModal={showModalDelete} 
                        title="Advertencia"
                        isAlert={false}
                        handleDeleteTicket={handleDeleteTicket}
                        text="¿Está seguro que quiere eliminar el ticket?"
                    />
                </div>
            }
            
        </div>
    )
}
