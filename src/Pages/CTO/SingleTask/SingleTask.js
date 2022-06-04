import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';






const SingleTask = (props) => {
    const { title, deadline, summery, _id } = props.task;

    const navigate = useNavigate();

    const handleDelete = (id) => {
        if (window.confirm("Are you sure ? ")) {
            fetch(`http://localhost:5000/taskDelete/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
        }

        window.location.reload();
    }


    return (
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mt-3">
            <div className="card">
                {/* <img className="card-img" src="" alt="Bologna" /> */}

                <div className="card-body">

                    <h4 className="card-title">{title}</h4>


                    <small className="text-muted cat">
                        <i className="far fa-clock text-info"></i> project deadline : <span className="text-primary">{deadline}</span>
                    </small>

                    {/* {summery.slice(0, 100)} */}
                    <div className="card-text">
                        {summery.length >= 100 ? <p>{summery.slice(0, 100)}</p> : <p>{summery}</p>}
                    </div>



                    <div>
                        <button onClick={() => handleDelete(_id)} className="btn btn-danger me-2">⛔ Delete</button>

                    </div>
                    {/* <button className="btn btn-info"><NavLink className="card-nav-link" to={`/dashboard/taskDetails/${_id}`}>See Details & Take Action</NavLink></button> */}

                </div>


            </div>
        </div>
    );
};

export default SingleTask;