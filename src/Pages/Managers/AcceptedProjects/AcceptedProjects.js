import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './AcceptedProjects.css'

const AcceptedProjects = () => {

    const { user } = useAuth();
    const [projects, setProjects] = useState([])


    useEffect(() => {
        fetch(`http://localhost:5000/getOwnProjects/${user.email}`)
            .then((response) => response.json())
            .then(data => setProjects(data))
    }, [])



    return (


        <div>
            <h6 className="page-header"> My Running Tasks & Projects </h6>

            <div>

                <Table className="table mt-4">
                    <thead>
                        <tr className="border border-2 ">

                            <th>project Name</th>
                            <th>project deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>


                        {projects.map(project =>



                            <tr key={project?._id} className="border border-2">
                                <td >{project?.title}</td>
                                <td className="text-danger">{project?.deadline}</td>







                                <td >

                                    {project?.status === "done" ? <p className="submit-text">Project Submitted</p> :

                                        <div className='d-flex'>

                                            <div>


                                                {project?.isAssigned ? <p className="submit-text text-warning">Team Working</p> : <NavLink style={{ textDecoration: 'none' }} to={`/dashboard/assignTeam/${project?._id}`}><button className="btn btn-info text-white" style={{ backgroundColor: 'orange', width: '100%', margin: '0px 3px' }} > 👨‍💻 Assign Team</button></NavLink>}

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

export default AcceptedProjects;