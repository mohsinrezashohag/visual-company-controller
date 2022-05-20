import { NavLink, Outlet } from 'react-router-dom';
import demoImage from '.././../../Images/user-demo.png'
import useFirebase from '../../../hooks/useFirebase';
import './DashboardHome.css'

const DashboardHome = () => {
    const { user, logOut, manager, cto } = useFirebase();


    let worker = false;
    if (manager === false && cto === false) {
        worker = true;
    }


    return (
        <div>





            <div className="row">

                <div className="col-md-2 text-start sidebar">
                    <div className="m-3">

                        <div className="user-container">
                            <img className="img-fluid user-image mb-2" src={demoImage} alt="" />
                            <h6>{user?.displayName}</h6>
                            {manager && <p>Position : Manager</p>}
                            {cto && <p>Position : CTO</p>}
                            {worker && <p>Position : Workers</p>}
                        </div>



                        <div className="side-links">



                            {cto &&

                                <div>
                                    <NavLink className="nav-link page-link" to='/dashboard/front'>Dashboard</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/projects'>Projects</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/post_task'>Post Project</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/employees'>See All Employee</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/make_manager'>Make Manager</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/chat'>Chat Room</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/requestsComplaints'>Requests & Complaints</NavLink>
                                </div>
                            }





                            {manager &&
                                <div>
                                    <NavLink className="nav-link page-link" to='/dashboard/front'>Dashboard</NavLink>

                                    <NavLink className="nav-link page-link" to='/dashboard/allPostedTasks'>Remaining Tasks</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/myRunningTasks'>My Running Tasks</NavLink>
                                    {/* <NavLink className="nav-link page-link" to='/dashboard/chat'>Team & Projects</NavLink> */}
                                    <NavLink className="nav-link page-link" to='/dashboard/chat'>Chat Room</NavLink>

                                </div>
                            }








                            {worker &&
                                <div>
                                    <NavLink className="nav-link page-link" to='/dashboard/front'>Dashboard</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/myWorks'>My Works</NavLink>
                                    <NavLink className="nav-link page-link" to='/dashboard/myReport'>My Reports</NavLink>

                                </div>

                            }



                        </div>

                        <button onClick={logOut} className="btn btn-danger ms-3">Logout</button>


                    </div>

                </div>






                <div className="col-md-10 content">






                    <Outlet>



                    </Outlet>
                </div>


            </div>

        </div>

    );
};

export default DashboardHome;


