import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import './AssignTeam.css'

const AssignTeam = () => {


    const { id } = useParams();
    const [project, setProject] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/taskDetails/${id}`)
            .then((response) => response.json())
            .then(data => setProject(data))
    }, [])



    const [employees, setEmployees] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/employees')
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])

    const workers = employees.filter(employee => employee.role !== "cto" && employee.role !== "manager")






    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {

        const { title, deadline, summery } = project;
        data.title = title;
        data.deadline = deadline;
        data.Summery = summery;
        data.isComplete = false;

        console.log(data);

        if (window.confirm("Are you sure about this ? ")) {

            fetch('http://localhost:5000/assignWorkers', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)

            })

        }

        navigate('/dashboard/myRunningTasks')

        reset();
    };



    return (
        <div>
            <h6 className="page-header">Assign User To Project</h6>


            <div className="row">

                <div className="col-md-12">

                    <div className="mt-3">
                        <h2>{project.title}</h2>
                        <p>Description : {project.summery}</p>


                    </div>


                </div>

            </div>


            <div className="row pt-3">

                <div className="">

                    <div>


                        <h3>Assign workers & give instruction for this project</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className='priority-level d-flex '>

                                <div>


                                    <div className='mt-4'>
                                        <p className="strong-text">Write instructions & working Procedure</p>
                                        <input className="instruction" name={"instruction"} type="textarea" {...register(`instruction}`)} id="instruction" placeholder="Write introduction about this project & working method" />
                                    </div>


                                    <div className="pt-5">
                                        <p className="strong-text">Select Uses  for this project</p>
                                        {workers.map(worker =>
                                            <div key={worker.name}>

                                                <input name={worker.name} type="checkbox" {...register(`${worker.name}`)} id={worker.name} />
                                                <label htmlFor={worker.name} className="form-check-label me-2 checkbox-input">{worker.name}</label>

                                                <br />


                                            </div>)}
                                    </div>

                                </div>


                            </div>


                            <button type="submit" className="btn btn-info mt-4">Assign As this Project Team</button>
                        </form>

                    </div>


                </div>


            </div>


















        </div>
    );
};

export default AssignTeam;


// {/* <div>

//                 {workers.map((employee) => <div>

//                     <input type="checkbox" name={employee.name} value={employee.name} id={employee.name} />
//                     <label for={employee.name}>{employee.name}</label><br></br>

//                 </div>)

//                 }

//             </div> */}
