import React from 'react';
import { useForm } from 'react-hook-form';
import './PostTask.css'

const PostTask = () => {

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        // const { title, summery, normal, medium, high, deadline } = data;
        fetch('http://localhost:5000/addTask',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => console.log(data))

        reset();
    };



    return (
        <div>

            <h6 className="page-header">Add New Task</h6>

            <div className="mt-5 w-75">
                <form onSubmit={handleSubmit(onSubmit)}>


                    <br />

                    <input className='input-field input-group' {...register("title")} placeholder="project title" type='text' />
                    <input className='input-field input-group' {...register("summery")} placeholder="project summery shortly" type='text' />

                    <br />




                    <div className='priority-level d-flex '>
                        <p className='d-block me-3'>Chose project Priority</p>

                        <div>
                            <input name="normal" type="checkbox" {...register('normal')} id="normal" />
                            <label htmlFor="normal" className="form-check-label me-2">Normal</label>

                            <input name="medium" type="checkbox" {...register('medium')} id="medium" />
                            <label htmlFor="medium" className="form-check-label me-2">Medium</label>

                            <input name="high" type="checkbox" {...register('high')} id="high" />
                            <label htmlFor="high" className="form-check-label me-2">High</label>
                        </div>


                    </div>


                    <p className='d-block me-3'>Set project deadline</p>
                    <input name="deadline" id="deadline" className='input-field input-group' {...register("deadline")} type='Date' />
                    <br />




                    <input type="submit" />
                </form>
            </div>


        </div>
    );
};

export default PostTask;