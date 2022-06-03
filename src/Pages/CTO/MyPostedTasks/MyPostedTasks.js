import React, { useEffect, useState } from 'react';
import SingleTask from '../SingleTask/SingleTask';

const MyPostedTasks = () => {

    const [tasks, setTasks] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allTask')
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [])


    return (
        <div>


            <div className="container">

                <div className="d-flex justify-content-between">
                    <h6 className="page-header">All Posted Projects</h6>
                    <h6 className="page-header text-dark me-4">{tasks.length} Projects</h6>
                </div>
                <div className="row">
                    {tasks.map((task) => <SingleTask task={task} key={task._id} ></SingleTask>)}
                </div>
            </div>


        </div >
    );
};

export default MyPostedTasks;