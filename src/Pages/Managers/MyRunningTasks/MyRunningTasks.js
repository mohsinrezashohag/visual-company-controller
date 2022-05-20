import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './MyRunningTasks.css'

const MyRunningTasks = () => {

    const { user } = useAuth();
    const [projects, setProjects] = useState([])


    useEffect(() => {
        fetch(`http://localhost:5000/getOwnProjects/${user.email}`)
            .then((response) => response.json())
            .then(data => setProjects(data))
    }, [])

    const handleDelete = () => {

    }

    const handleDone = (id) => {

        const projectID = { id };
        if (window.confirm('Are you sure to submit ?')) {
            fetch('http://localhost:5000/projectDone', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(projectID)
            }).then(res => res.json())
                .then(data => console.log(data))
        }

        window.location.reload();


    }



    return (


        <div>



            <h6 className="page-header"> My Running Tasks & Projects </h6>

            <div>




                <Table className="table mt-4 " >
                    <thead>
                        <tr className="border border-2 ">

                            <th>project Name</th>
                            <th>project deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>


                        {projects.map(project =>



                            <tr key={project?._id} className="border border-2 ">
                                <td>{project?.title}</td>
                                <td>{project?.deadline}</td>







                                <td >

                                    {project?.status === "done" ? <p className="text-info">Project Submitted to CTO </p> :

                                        <div className='d-flex'>

                                            {/* <div className='me-2' >
                                                    <button onClick={() => handleDelete(project?._id)} className="table-action" style={{ backgroundColor: 'red', width: '100%' }}>⛔ Cancel Project</button>
                                                </div>

                                                <div>
                                                    <button className="table-action " > ▶ See Details</button>
                                                </div> */}

                                            <div>
                                                <NavLink style={{ textDecoration: 'none' }} to={`/dashboard/assignTeam/${project?._id}`}><button className="table-action " style={{ backgroundColor: 'orange', width: '100%', margin: '0px 3px' }} > 👨‍💻 Assign Team</button></NavLink>

                                            </div>

                                            <div>
                                                <button onClick={() => handleDone(project?._id)} className="table-action ms-2" style={{ backgroundColor: 'green', width: '100%' }} > ✔ Mark Done</button>
                                            </div>

                                        </div>}

                                </td>

                            </tr>)
                        }

                    </tbody>
                </Table>



            </div>






            {/* 
            <div className="row mt-5">

                <div className="col-md-4">
                    <h4>High Priority</h4>
                </div>

                <div className="col-md-4">
                    <h4>Medium Priority</h4>
                </div>

                <div className="col-md-4">
                    <h4>Normal Priority</h4>
                </div>


            </div> */}



        </div >
    );
};

export default MyRunningTasks;