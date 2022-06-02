import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './AssignTeam.css'

const AssignTeam = () => {

    const { user } = useAuth();
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


    const [datas, setdatas] = useState([]);
    const getvalue = (e) => {
        const value = e.target.value;
        if (datas.filter(data => data == value).length == 0) {
            setdatas([...datas, value]);
        } else {
            const newdata = datas.filter(data => data != value);
            setdatas(newdata);
        }
    }

    console.log(datas);


    const { title, deadline, summery } = project;

    // update managers accepted project
    const updateManagersAcceptedProjects = () => {
        const projectTitle = { title }
        fetch(`http://localhost:5000/updateManagerProject`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectTitle)
        })
    }







    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {

        const { title, deadline, summery } = project;
        data.AssignedMembers = datas;
        data.title = title;
        data.deadline = deadline;
        data.Summery = summery;
        data.isComplete = false;
        data.manager = user.displayName;

        console.log(data);


        if (window.confirm("Are you sure about this ? ")) {
            updateManagersAcceptedProjects();
            fetch('http://localhost:5000/assignWorkers', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)

            })

        }

        navigate('/dashboard/myAcceptedProjects')
        window.location.reload();

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
                                        <input className="instruction" name={"instruction"} type="textarea" {...register(`instruction`)} id="instruction" placeholder="Write introduction about this project & working method" />
                                    </div>


                                    <div className="pt-5">
                                        <p className="strong-text">Select Uses  for this project</p>


                                        <div >
                                            {/* {
                                                datas.map(display => <li key={display}>{display}</li>)
                                            } */}

                                            {
                                                workers.map(worker => (
                                                    <div key={worker._id} >
                                                        <input type="checkbox" value={worker.name}
                                                            onClick={(e) => getvalue(e)} />
                                                        <label className="worker-label">{worker.name}</label>
                                                    </div>
                                                ))
                                            }
                                        </div>


                                    </div>

                                </div>


                            </div>


                            <button type="submit" className="btn btn-info mt-4">Assign As this Project Team</button>
                        </form>

                    </div>











                    {/* checking multiple select ways */}













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
