import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const ProjectsUnderMe = () => {
    const { user } = useAuth()

    const [allProjects, setAllProjects] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/projectsRunning')
            .then(res => res.json())
            .then(data => setAllProjects(data))
    }, [])



    const myRunningProjects = allProjects.filter(project => project.manager === user.displayName)


    const stillRunning = allProjects.filter(project => project.isComplete !== true)

    const completedProject = myRunningProjects.filter(project => project.isComplete === true && project.submission !== "done")




    return (
        <div>

            <div className="row">


                <div className="col-md-6">

                    <h6 className="page-header">Project Submissions From Teams</h6>

                    {completedProject?.length === 0 && <h3 className="text-danger warning-text mt-5 py-5">🙂 No Submission From Any Team Yet  </h3>}


                    {completedProject.map(project => <div key={project._id}>

                        <div className="col-md-12  mt-3">
                            <div className="card">
                                {/* <img className="card-img" src="" alt="Bologna" /> */}

                                <div className="card-body">

                                    <h4 className="card-title">📌 {project.title}</h4>


                                    <small className="text-muted cat">
                                        ⏱ project deadline : <span className="text-primary">{project.deadline}</span>
                                    </small>



                                    <div className="">
                                        <p>👩‍💻 Project Team :  {project.AssignedMembers.map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                                    </div>

                                    <p>projecting Process : {project.instruction} </p>


                                    <div className="d-flex justify-center align-center">
                                        <p className="condition-text">Team Work :</p>
                                        {project?.isComplete ? <p className="text-success condition-text mx-2">Complete</p> : <p className="text-warning condition-text">On Going</p>}
                                    </div>

                                    <button className="btn btn-info"><NavLink className="card-nav-link" to={`/dashboard/reviewAction/${project.title}`}>See Details & Take Action</NavLink></button>



                                </div>

                            </div>
                        </div>


                    </div>)
                    }

                </div>



                <div className="col-md-6">

                    <h6 className="page-header">Projects working by the teams</h6>

                    {stillRunning.map(project => <div key={project._id}>

                        <div className="col-md-12  mt-3">
                            <div className="card">
                                {/* <img className="card-img" src="" alt="Bologna" /> */}

                                <div className="card-body">

                                    <h4 className="card-title">📌 {project.title}</h4>


                                    <small className="text-muted cat">
                                        ⏱ project deadline : <span className="text-primary">{project.deadline}</span>
                                    </small>



                                    <div className="">
                                        <p>👩‍💻 Project Team :  {project.AssignedMembers.map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                                    </div>

                                    <p>projecting Process : {project.instruction} </p>


                                    {project?.isComplete ? <p className="text-success condition-text">Complete</p> : <p className="text-warning condition-text">On Going</p>}


                                    {/* <button className="btn btn-info"><NavLink className="card-nav-link" to={`/dashboard/projectDetails/${project._id}`}>See Details </NavLink></button> */}

                                </div>

                            </div>
                        </div>


                    </div>)
                    }

                </div>


            </div>



        </div >
    );
};


export default ProjectsUnderMe;