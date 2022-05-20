import React, { useEffect, useState } from 'react';
import SingleTask from '../SingleTask/SingleTask';
import './AllPostedTasks.css'

const AllPostedTasks = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allTask')
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [])

    const remainingTasks = tasks.filter(task => task.isAccepted === false)
    return (
        <div>


            <div className="container">

                <div className="d-flex justify-content-between">
                    <h6 className="page-header">All Posted Projects</h6>
                    <h6 className="page-header text-dark me-4">{remainingTasks.length} Projects</h6>
                </div>
                <div className="row">
                    {remainingTasks.map((task) => <SingleTask task={task} key={task._id} ></SingleTask>)}
                </div>
            </div>


        </div >
    );
};

export default AllPostedTasks;