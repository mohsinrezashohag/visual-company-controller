import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import demoImage from '.././../../Images/user-demo.png'
import useFirebase from '../../../hooks/useFirebase';
import './DashboardHome.css'

const DashboardHome = () => {
    const { user, logOut, manager } = useFirebase();



    return (
        <div>





            <div className="row">

                <div className="col-md-2 text-start sidebar">
                    <div className="m-3">


                        <div className="user-container">
                            <img className="img-fluid user-image mb-2" src={demoImage} alt="" />
                            <h6>{user?.displayName}</h6>
                            {manager ? <p>Position : manager</p> : <p>Position : COO</p>}
                        </div>



                        <div className="side-links">
                            {manager ?
                                <div>
                                    <NavLink className="nav-link page-link" to='/dashboard/allPostedTasks'>Remaining Tasks</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/myRunningTasks'>My Running Tasks</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/chat'>Chat Room</NavLink>

                                </div>

                                :

                                <div>
                                    <NavLink className="nav-link page-link" to='/dashboard/employees'>See All Employee</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/post_task'>Post Task</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/projects'>Projects</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/make_manager'>Make Manager</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/chat'>Chat Room</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/requestsComplaints'>Requests & Complaints</NavLink>
                                </div>
                            }


                        </div>

                        <button onClick={logOut} className="btn btn-danger ms-3">Logout</button>


                    </div>

                </div>






                <div className="col-md-10 content">

                    {/* <div className="row mb-5">

                        <div className="col-md-4 p-5 bg-success">

                            <h3>Total Workers</h3>

                            <h6>500</h6>

                        </div>

                        <div className="col-md-4 p-5 bg-warning">

                            <h3>Total Workers</h3>

                            <h6>500</h6>

                        </div>

                        <div className="col-md-4 p-5 bg-danger">

                            <h3>Total Workers</h3>

                            <h6>500</h6>

                        </div>


                    </div> */}






                    <Outlet>



                    </Outlet>
                </div>


            </div>

        </div>

    );
};

export default DashboardHome;


