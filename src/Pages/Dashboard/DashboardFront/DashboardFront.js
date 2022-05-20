import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';


const DashboardFront = () => {
    const { cto, manager, user } = useAuth();

    //////////////////////////////////////////////////////////////////////////// cto part

    // total project
    const [projects, setProjects] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allTask')
            .then(res => res.json())
            .then(data => setProjects(data))
    }, [])

    // projects currently running
    const [actionProjects, setActionProjects] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/actionProjects')
            .then(res => res.json())
            .then(data => setActionProjects(data))
    }, [])

    const runningProjects = actionProjects.filter(project => project.status === 'none')
    const doneProjects = actionProjects.filter(project => project.status === 'done')


    //////////////////////////////////////////////////////////////////////////// manager part
    // get all projects under manager
    const [managerProjects, setManagerProjects] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/getOwnProjects/${user.email}`)
            .then((response) => response.json())
            .then(data => setManagerProjects(data))
    }, [])
    const managerRunningProjects = managerProjects.filter(project => project.status === 'none')
    const managerDoneProjects = managerProjects.filter(project => project.status === 'done')


    ////////////////////////////////////////////////////////////////////////////////////////////////// user part 

    let worker = false;
    if (manager === false && cto === false) {
        worker = true;
    }



    return (
        <div className="container mt-4">

            {cto &&
                <div className="row">


                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">
                                <h2>Projects Posted</h2>
                                <h1>{projects.length}</h1>
                            </div>
                        </div>
                    </div>



                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">

                                <h2>Projects Running</h2>
                                <h1>{runningProjects.length}</h1>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">

                                <h2>Projects Done</h2>
                                <h1>{doneProjects.length}</h1>

                            </div>
                        </div>
                    </div>




                    <div className="row">

                        <div className="col-md-6">
                            <h6 className="page-header">My teams</h6>
                        </div>

                        <div className="col-md-6">
                            <h6 className="page-header">Meeting Announcement</h6>


                        </div>

                    </div>



                </div>
            }

            {manager &&

                <div className="row">


                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">
                                <h2>Projects Under Me</h2>
                                <h1>{managerProjects.length}</h1>
                            </div>
                        </div>
                    </div>



                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">

                                <h2>Projects Running</h2>
                                <h1>{managerDoneProjects.length}</h1>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">

                                <h2>Projects Running</h2>
                                <h1>{managerRunningProjects.length}</h1>

                            </div>
                        </div>
                    </div>

                </div>

            }



            {worker &&

                <div>

                    <div className="row">


                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h2>My Projects</h2>
                                    <h1>{managerProjects.length}</h1>
                                </div>
                            </div>
                        </div>



                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card">
                                <div className="card-body">

                                    <h2>Projects Running</h2>
                                    <h1>{managerDoneProjects.length}</h1>
                                </div>
                            </div>
                        </div>


                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card">
                                <div className="card-body">

                                    <h2>Projects Completed</h2>
                                    <h1>{managerRunningProjects.length}</h1>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            }







        </div >
    );
};

export default DashboardFront;