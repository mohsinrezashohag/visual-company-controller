import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import './DashboardFront.css'
import { NavLink } from 'react-router-dom';
import { Table } from 'react-bootstrap';


const DashboardFront = () => {
    const { cto, manager, user } = useAuth();
    const [isDeleted, setIsDeleted] = useState(false)


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


    //meeting announcements and get meetings from database
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const meeting = data;

        fetch('http://localhost:5000/announceMeeting', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(meeting)
        })
        reset();
        window.location.reload();
    }

    const [meetings, setMeetings] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/meetings`)
            .then(res => res.json())
            .then(data => setMeetings(data))
    }, [isDeleted])



    const handleMeetingDelete = (id) => {
        const isConfirm = window.confirm("⛔⛔ Are You Sure About Delete This Order ?")
        if (isConfirm) {
            fetch(`http://localhost:5000/meetingsDelete/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        setIsDeleted(!isDeleted)
                    }
                })
        }


    }


    /// getting all employee

    const [employees, setEmployees] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/employees')
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])

    ////////////////////////////////////////////////////////// manager part

    // get all projects under manager
    const [managerProjects, setManagerProjects] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/getOwnProjects/${user.email}`)
            .then((response) => response.json())
            .then(data => setManagerProjects(data))
    }, [])
    const managerRunningProjects = managerProjects.filter(project => project.status === 'none')
    const managerDoneProjects = managerProjects.filter(project => project.status === 'done')



    const [allProjects, setAllProjects] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/assignedProjectsCollection')
            .then(res => res.json())
            .then(data => setAllProjects(data))
    }, [])

    const myRunningProjects = allProjects.filter(project => project.manager === user.displayName)
    const stillRunning = myRunningProjects.filter(project => project.isComplete !== true)
    const completedProject = myRunningProjects.filter(project => project.isComplete === true && project.submission !== "done")






    ////////////////////////////////////////////////////////////////////////////////////////////////// workers part 
    let worker = false;
    if (manager === false && cto === false) {
        worker = true;
    }

    // getting all project in which worker included
    const [works, setWorks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/works')
            .then(res => res.json())
            .then(data => setWorks(data))
    }, [])

    const userName = user.displayName;

    const myWorks = works.filter(work => work.AssignedMembers.includes(userName))
    const myCompletedWorks = myWorks.filter(work => work.isComplete === true)
    const myRunningWorks = myWorks.filter(work => work.isComplete !== true)



    return (
        <div className="container mt-4">

            {cto &&
                <div className="row">


                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="up-case">Projects Posted</h2>
                                <h1>{projects.length}</h1>
                            </div>
                        </div>
                    </div>



                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">

                                <h2 className="up-case">Projects Running</h2>
                                <h1>{runningProjects.length}</h1>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">

                                <h2 className="up-case">Projects Done</h2>
                                <h1>{doneProjects.length}</h1>

                            </div>
                        </div>
                    </div>




                    <div className="row">

                        <div className="col-md-6">
                            <h6 className="page-header">Last Completed Projects</h6>

                            {doneProjects.map(project => <div key={project._id} className="col-md-12  mt-3">

                                <div className="card">

                                    <div className="card-body">

                                        <h4 className="card-title">📌 {project.title}</h4>

                                        <div className="pt-4">


                                            <div className="">
                                                <p><strong>🙍‍♂️ Submitted By :</strong> {project.manager} </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>)}

                        </div>







                        <div className="col-md-5 m-3">

                            <h6 className="page-header mb-2">Meeting Announcement</h6>

                            <div className="mt-2">
                                <form onSubmit={handleSubmit(onSubmit)}>


                                    <input className='input-group ' {...register("meetingTitle")} placeholder="meeting title" />
                                    <br />
                                    <input className='input-field input-group' {...register("meetingLink")} placeholder="Meeting Link" />
                                    <br />

                                    <button className="btn btn-info" type="submit">Post Link</button>

                                </form>
                            </div>



                            <div>
                                <h6 className="page-header">Join Meeting</h6>
                                {meetings.length === 0 ? "No meetings Available to join" : <div>

                                    {meetings.map(meeting => <div key={meeting._id} className='text-btn-container' >
                                        <h6 className="meeting-title">📌 {meeting.meetingTitle}</h6>
                                        <a href={meeting.meetingLink} target="_blank" ><button className="btn btn-info me-2" >Join Meeting</button></a>
                                        <button onClick={() => handleMeetingDelete(meeting?._id)} className="btn btn-danger">Delete Meeting</button>
                                    </div>)}
                                </div>}



                            </div>

                        </div>

                    </div>



                </div>
            }



            {manager &&
                <div className="row">

                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="up-case">Projects Under Me</h2>
                                <h1>{managerProjects.length}</h1>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">

                                <h2 className="up-case">Projects Done</h2>
                                <h1>{managerDoneProjects.length}</h1>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-4 col-sm-4 col-12">
                        <div className="card">
                            <div className="card-body">

                                <h2 className="up-case">Projects Running</h2>
                                <h1>{managerRunningProjects.length}</h1>

                            </div>
                        </div>
                    </div>



                    <div className="row">

                        <div className="col-md-6">

                            <h6 className="page-header">My Last Projects </h6>


                            {stillRunning.slice(0, 2).map(project => <div key={project._id}>

                                <div className="col-md-12  mt-3">
                                    <div className="card">
                                        {/* <img className="card-img" src="" alt="Bologna" /> */}

                                        <div className="card-body">

                                            <h4 className="card-title">📌 {project.title}</h4>


                                            <small className="text-muted cat">
                                                ⏱ project deadline : <span className="text-primary">{project.deadline}</span>
                                            </small>



                                            <div className="">
                                                <p>👩‍💻 Project Team :  {project.AssignedMembers.map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                                            </div>

                                            <p>projecting Process : {project.instruction} </p>


                                            {project?.isComplete ? <p className="text-success condition-text">Complete</p> : <p className="text-warning condition-text">On Going</p>}



                                        </div>

                                    </div>
                                </div>


                            </div>)

                            }


                            <button button className="btn btn-info mb-3 m-2"><NavLink className="card-nav-link" to={`/dashboard/projectUnderMe`}>See All Projects</NavLink></button>

                        </div>




                        <div className="col-md-6">
                            <h6 className="page-header">Meeting Announcement</h6>

                            <div>
                                <form onSubmit={handleSubmit(onSubmit)}>


                                    <input className='input-group' {...register("meetingTitle")} placeholder="meeting title" />
                                    <br />
                                    <input className='input-field input-group' {...register("meetingLink")} placeholder="Meeting Link" />
                                    <br />

                                    <button className="btn btn-info" type="submit">Post Link</button>

                                </form>
                            </div>



                            <div>
                                <h6 className="page-header">Join Meeting</h6>
                                {meetings.length === 0 ? "No meetings Available to join" : <div>

                                    {meetings.map(meeting => <div key={meeting._id} className='text-btn-container' >
                                        <h6 className="meeting-title">📌 {meeting.meetingTitle}</h6>
                                        <a href={meeting.meetingLink} target="_blank" ><button className="btn btn-info me-2" >Join Meeting</button></a>
                                        <button onClick={() => handleMeetingDelete(meeting?._id)} className="btn btn-danger">Delete Meeting</button>
                                    </div>)}
                                </div>}
                            </div>

                        </div>

                    </div>



                </div>

            }



            {
                worker &&

                <div>

                    <div className="row">


                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="up-case">Total Projects</h2>
                                    <h1>{myWorks.length}</h1>
                                </div>
                            </div>
                        </div>



                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card">
                                <div className="card-body">

                                    <h2 className="up-case">Projects Need To Work</h2>
                                    <h1>{myRunningWorks.length}</h1>
                                </div>
                            </div>
                        </div>


                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card">
                                <div className="card-body">

                                    <h2 className="up-case">Projects Completed</h2>
                                    <h1>{myCompletedWorks.length}</h1>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-md-6">
                            {myRunningWorks.slice(0, 2).map(project => <div key={project._id}>

                                <div className="col-md-12  mt-3">
                                    <div className="card">

                                        <div className="card-body">

                                            <h4 className="card-title">📌 {project.title}</h4>


                                            <small className="text-muted cat">
                                                <i className="far fa-clock text-info"></i> project deadline : <span className="text-primary">{project.deadline}</span>
                                            </small>



                                            <div className="">
                                                <p><strong>👩‍💻 Project Team :</strong> {project.AssignedMembers.map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                                            </div>

                                            <p><strong>⚙ Working Process : </strong>{project.instruction} </p>



                                            <button className="btn btn-info"><NavLink className="card-nav-link" to={`/dashboard/workDetails/${project._id}`}> ▶ See Details & Take Action </NavLink></button>

                                        </div>

                                    </div>
                                </div>


                            </div>)}
                        </div>


                        <div className="col-md-6">

                            <div>
                                <h6 className="page-header">Join Meeting</h6>
                                {meetings.length === 0 ? "No meetings Available to join" : <div>

                                    {meetings.map(meeting => <div key={meeting._id} className='text-btn-container mt-3' >
                                        <h6 className="meeting-title">📌 {meeting.meetingTitle}</h6>
                                        <a href={meeting.meetingLink} target="_blank" ><button className="btn btn-info me-2" >Join Meeting</button></a>
                                    </div>)}
                                </div>}
                            </div>
                        </div>
                    </div>


                </div>

            }







        </div >
    );
};

export default DashboardFront;