import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './MyWorks.css'

const MyWorks = () => {
    const { user } = useAuth();

    const [works, setWorks] = useState([]);




    useEffect(() => {
        fetch('http://localhost:5000/works')
            .then(res => res.json())
            .then(data => setWorks(data))
    }, [])



    const userName = user.displayName;

    const myWorks = works.filter(work => work.AssignedMembers.includes(userName))
    console.log("myWorks : ", myWorks);

    const existingWorks = myWorks.filter(work => work.isComplete !== true);
    console.log("existingWorks", existingWorks);





    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h6 className="page-header">My Existing Works</h6>
                <h6 className="page-header text-dark me-4">{existingWorks.length} Projects</h6>
            </div>

            <div className="mt-5">

                {existingWorks.length === 0 && <h2 className="text-danger warning-text">👨‍💻 No Work Available </h2>}

            </div>

            <div className="row">
                {existingWorks.map(work => <div key={work._id}>

                    <div className="col-md-12  mt-3">
                        <div className="card">

                            <div className="card-body">

                                <h4 className="card-title">📌 {work.title}</h4>


                                <small className="text-muted cat">
                                    <i className="far fa-clock text-info"></i> project deadline : <span className="text-primary">{work.deadline}</span>
                                </small>

                                <p><strong>Work Summery :</strong> {work.Summery} </p>


                                <div className="">
                                    <p><strong>👩‍💻 Project Team :</strong> {work.AssignedMembers.map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                                </div>

                                <p><strong>⚙ Working Process : </strong>{work.instruction} </p>



                                <button className="btn btn-info"><NavLink className="card-nav-link" to={`/dashboard/workDetails/${work._id}`}> ▶ See Details & Take Action </NavLink></button>

                            </div>

                        </div>
                    </div>


                </div>)
                }
            </div>
        </div >
    );
};

export default MyWorks;