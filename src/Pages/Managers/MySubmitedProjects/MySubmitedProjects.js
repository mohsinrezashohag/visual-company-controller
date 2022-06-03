import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MySubmitedProjects = () => {

    const { user } = useAuth()

    const [allProjects, setAllProjects] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/assignedProjectsCollection')
            .then(res => res.json())
            .then(data => setAllProjects(data))
    }, [])

    const mySubmission = allProjects.filter(project => project.manager === user.displayName && project.submission === "done")

    console.log(mySubmission);

    return (
        <div>
            <h6 className="page-header">My Submitted Projects To CTO</h6>


            <div className="mt-5">

                {mySubmission.length === 0 && <h2 className="text-danger warning-text">🙂 No Submission Yet  </h2>}

            </div>

            <div className="row">
                {mySubmission.map(work => <div key={work._id}>

                    <div className="col-md-12  mt-3">
                        <div className="card">

                            <div className="card-body">

                                <h4 className="card-title">📌 {work.title}</h4>


                                {/* <small className="text-muted cat">
                                    <i className="far fa-clock text-info"></i> project deadline : <span className="text-primary">{work.deadline}</span>
                                </small> */}



                                <div className="pt-2">
                                    <p><strong>👩‍💻 Project Team :</strong> {work.AssignedMembers.map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                                </div>

                                <p><strong>Project Summery :</strong> {work.Summery} </p>

                                {work?.submission === 'done' && <p className="text-success condition-text">✅ Submitted TOo The CTO </p>}



                            </div>

                        </div>
                    </div>


                </div>)
                }
            </div>

        </div>




    );
};

export default MySubmitedProjects;