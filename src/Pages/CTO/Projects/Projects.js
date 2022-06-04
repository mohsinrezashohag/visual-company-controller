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
            <h6 className="page-header">Projects Condition & Process</h6>

            <div className="row mt-5">



                <div className="col-md-6">
                    <h6 className="page-header">Completed</h6>

                    {doneProjects.map(project => <div className="col-md-12  mt-3">

                        <div className="card">

                            <div className="card-body">

                                <h4 className="card-title">📌 {project.title}</h4>

                                <div className="pt-4">


                                    <div className="">
                                        <p><strong>🙍‍♂️ Submitted By :</strong> {project.manager} </p>
                                    </div>

                                    <div className="">
                                        <p><strong>👩‍💻 Project Team :</strong> {project.AssignedMembers.map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                                    </div>



                                </div>

                            </div>

                        </div>
                    </div>)}



                </div>










                <div className="col-md-6">
                    <h6 className="page-header">On Going</h6>

                    <div className="row">

                        {onGoingProjects.map(work => <div key={work._id}>

                            <div className="col-md-12  mt-2">
                                <div className="card">

                                    <div className="card-body">

                                        <h4 className="card-title">📌 {work.title}</h4>

                                        <div className="pt-4">

                                            <div className="">
                                                <p><strong>🙍‍♂️ Project Manager :</strong> {work.manager} </p>
                                            </div>

                                            <div className="">
                                                <p><strong>👩‍💻 Project Team :</strong> {work.AssignedMembers.map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                                            </div>

                                            <p className="text-warning condition-text">On Going</p>


                                        </div>


                                    </div>

                                </div>
                            </div>


                        </div>)
                        }
                    </div>



                </div>







            </div>

        </div >
    );
};

export default Projects;
