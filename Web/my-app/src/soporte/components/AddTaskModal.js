import React, { useState, useEffect } from 'react'
import { Modal, Button, Card,Dropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function AddTaskModal({showModal, handleCloseModal, idTicket, handleOpenModalSuccessLink, getTasksLinked}) {
    const [projectList, setProjectList] = useState([])
    const [taskList, setTaskList] = useState([])

    const [projectIsLoading, setProjectIsLoading] = useState(true)
    const [tasksIsLoading, setTasksIsLoading] = useState(true)

    const [projectSelected, setProjectSelected] = useState("")
    const [taskSelected, setTaskSelected] = useState({idTask: -1, name:""})

    const getProjects = ()  => {
        const url = "https://project-squad5.herokuapp.com/api/projects/"
    
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
                    const projects = json.data.map( (project) => ({
                        idProject: project.id,
                        name: project.name
                    }))
                    console.log(projects);
                    setProjectList(projects)
                    setProjectIsLoading(false)
                }
            })
    }

    const linkTaskWithTicket = () => {
        console.log("Task es :",taskSelected);
        console.log(`Quiero asdas vincular el task ${taskSelected.idTask} al ticket ${idTicket}`);

        const url = `https://psa2021-soporte.herokuapp.com/ticket/${idTicket}/task/${taskSelected.idTask}`
        console.log("url:",url);

 
        const requestOptions = {
            method: 'POST',
        }
    
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                   //codigo en caso de error
                   return;
                }
                console.log("asociacion OK");
                handleOpenModalSuccessLink()
                getTasksLinked()
            })
    }

    const getTasks = (projectId,projectName)  => {
        console.log("entré con pid:",projectId);
        setProjectSelected(projectName)
        if(!tasksIsLoading) setTasksIsLoading(true)

        const url = `https://project-squad5.herokuapp.com/api/projects/${projectId}/tasks/`
    
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
                    const tasks = json.map( (task) => ({
                        idTask: task.task_id,
                        name: task.name
                    }))
                    console.log("tasks:",tasks);
                    setTaskList(tasks)
                    setTasksIsLoading(false)
                }
            })
    }

    useEffect(() => {
        if(showModal)
            getProjects()
        
    }, [showModal])


    const DashboardDropdownCard = ({title,data, itemName, dropdownItems}) => (
        <Card style={{ marginBottom:'8%', padding: '4% 0 0 5%',backgroundColor:'#E0E0E0'}}>
            <h5>{title}</h5>
            <Dropdown >
                <Dropdown.Toggle disabled={(itemName === "task" && (tasksIsLoading || projectIsLoading)) || (itemName === "project" && projectIsLoading)} style={{marginBottom:'5%',backgroundColor:'#045174'}} variant="secondary" id="dropdown-basic">
                    {data}
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
                    {
                        dropdownItems && dropdownItems.map((item) => (
                            <Dropdown.Item name={itemName} onClick={() => {
                                itemName === "project" ? getTasks(item.idProject,item.name) :
                                setTaskSelected({idTask: item.idTask, name: item.name})
                            }} >
                                {item.name}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Card>
    )

    return (
        <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton style={{alignItems:'center',backgroundColor:'#eee'}}>
            <h5 style={{marginRight:'4%',backgroundColor:'#eee'}}>Agregar nueva tarea</h5>
        </Modal.Header>
        <Modal.Body>
            <Link to={`/tareas/crear/soporte/${idTicket}`}>
                <Button variant="primary" style={{backgroundColor:'#ca6212',border:'none',color:'white',marginBottom:'5%', alignSelf:'flex-end' }}>Crear nueva tarea</Button>
            </Link>
            <div style={{ margin: '0 10% 0 10%', overflow:'auto'}}>
                <DashboardDropdownCard itemName="project" title="Proyecto" data= {projectSelected !== "" ? projectSelected : "Seleccionar proyecto"} dropdownItems={projectList}/>
                <DashboardDropdownCard itemName="task" title="Tarea" data= {taskSelected.name !== "" ? taskSelected.name : "Seleccionar tarea"} dropdownItems={taskList}/>
            </div>
        </Modal.Body>
            <Modal.Footer>
            <Button disabled={taskSelected.idTask === -1} variant="primary" style={{backgroundColor:'#ca6212',border:'none',color:'white' }} onClick={linkTaskWithTicket}>
                Asociar tarea
            </Button>
        </Modal.Footer>
    </Modal>
    )
}
