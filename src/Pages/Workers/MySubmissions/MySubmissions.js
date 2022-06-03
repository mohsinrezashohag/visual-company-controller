import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const MySubmission = () => {

    const { user } = useAuth();
    const [works, setWorks] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/works')
            .then(res => res.json())
            .then(data => setWorks(data))
    }, [])

    console.log(works);
    const userName = user.displayName;

    const myWorks = works.filter(work => work?.doneBy?.includes(userName))

    const SubmittedWorks = myWorks.filter(work => work.isComplete === true)

    console.log("myWorks", myWorks);

    return (
        <div>
            <h6 className="page-header">My Submissions</h6>

            <div className="mt-5">

                {SubmittedWorks.length === 0 && <h2 className="text-danger warning-text">🙂 No Submission Yet  </h2>}

            </div>


            <div>

                <div className="row">
                    {SubmittedWorks.map(work => <div key={work._id}>

                        <div className="col-md-12  mt-3">
                            <div className="card">

                                <div className="card-body">

                                    <h4 className="card-title">{work.title}</h4>


                                    <small className="text-muted cat">
                                        <i className="far fa-clock text-info"></i> project deadline : <span className="text-primary">{work.deadline}</span>
                                    </small>



                                    <div className="">
                                        <p>Project Team : {work.AssignedMembers.map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                                    </div>

                                    <p>Working Process : {work.instruction} </p>

                                    {work?.isComplete && <p className="text-success condition-text">✅ Submitted</p>}



                                </div>

                            </div>
                        </div>


                    </div>)
                    }
                </div>
            </div>


        </div>
    );
};

export default MySubmission;