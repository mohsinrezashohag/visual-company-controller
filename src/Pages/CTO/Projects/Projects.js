import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Projects = () => {


    const [projects, setProjects] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/assignedProjectsCollection')
            .then(res => res.json())
            .then(data => setProjects(data))
    }, [])

    const doneProjects = projects.filter(project => project.submission === "done");
    const onGoingProjects = projects.filter(project => project.AssignedMembers !== false && project.submission !== "done")


    return (
        <div>
            <h6 className="page-header">Projects</h6>

            <div className="row">


                <div className="col-md-6">
                    <h2>On Going</h2>
                    {onGoingProjects.length}


                    <div className="row">
                        {onGoingProjects.map(work => <div key={work._id}>

                            <div className="col-md-12  mt-3">
                                <div className="card">

                                    <div className="card-body">

                                        <h4 className="card-title">📌 {work.title}</h4>

                                        {/* 
                                        <small className="text-muted cat">
                                            <i className="far fa-clock text-info"></i> project deadline : <span className="text-primary">{work.deadline}</span>
                                        </small> */}
                                        {/* 
                                        <p><strong>Work Summery :</strong> {work.Summery} </p> */}

                                        <div className="pt-4">


                                            <div className="">
                                                <p><strong>🙍‍♂️ Project Manager :</strong> {work.manager} </p>
                                            </div>

                                            <div className="">
                                                <p><strong>👩‍💻 Project Team :</strong> {work.AssignedMembers.map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                                            </div>

                                        </div>

                                        {/* <p><strong>⚙ Working Process : </strong>{work.instruction} </p> */}



                                        <button className="btn btn-info"><NavLink className="card-nav-link" to={`/dashboard/workDetails/${work._id}`}> ▶ See Details & Take Action </NavLink></button>

                                    </div>

                                </div>
                            </div>


                        </div>)
                        }
                    </div>



                </div>


                <div className="col-md-6">
                    <h2>Completed</h2>
                    {doneProjects.length}
                </div>




            </div>

        </div >
    );
};

export default Projects;
