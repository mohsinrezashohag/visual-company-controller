import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './SingleTask.css'

const SingleTask = (props) => {

    const { title, deadline, summery, _id } = props.task;

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


                    <button className="btn btn-info"><NavLink className="card-nav-link" to={`/dashboard/taskDetails/${_id}`}>See Details & Take Action</NavLink></button>

                </div>


            </div>
        </div>
    );
};

export default SingleTask;