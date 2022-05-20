import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const TaskDetails = (props) => {
    const { id } = useParams();
    const [task, setTask] = useState({})
    const { user } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/taskDetails/${id}`)
            .then((response) => response.json())
            .then(data => setTask(data))
    }, [])


    const modifyPostedProject = () => {
        fetch('http://localhost:5000/modifyPostedProject', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }





    const { title, deadline, summery, _id } = task;

    const handleProjectAccept = () => {
        modifyPostedProject();
        const acceptedProject = { _id: _id, manager: user.displayName, email: user.email, title: title, deadline: deadline, summery: summery }
        if (window.confirm("Are you sure about accepting the project ? ")) {
            fetch('http://localhost:5000/acceptedProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(acceptedProject)
            })
                .then(res => res.json())
                .then(data => console.log(data))
            navigate('/dashboard/front')

        }

    }




    return (
        <div>
            <h6 className="page-header">Project Details</h6>

            <div className="mt-3">
                <h2>{task.title}</h2>
                <h5>Deadline : <span className="text-info">{task.deadline}</span> </h5>
                <div className="d-flex">Priority : {task.high && <p className="text-danger">high</p>} {task.medium && <p className="text-info">medium</p>} {task.normal && <p className="text-primary">normal</p>} </div>
                <p>Description : {task.summery}</p>

                <button onClick={handleProjectAccept} className="btn btn-info text-white">Accept Project</button>

            </div>

        </div>
    );
};

export default TaskDetails;