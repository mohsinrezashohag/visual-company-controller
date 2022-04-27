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
    return (
        <div>

            <h6 className="page-header">All Posted Tasks & Projects</h6>
            <div className="container">
                <div className="row">
                    {tasks.map((task) => <SingleTask task={task} key={task._id} ></SingleTask>)}
                </div>
            </div>


        </div >
    );
};

export default AllPostedTasks;