import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Requests = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate()

    const userName = user.displayName;

    const onSubmit = data => {

        data.requestBy = userName;
        data.isApproved = false;
        data.isCancel = false;


        fetch('http://localhost:5000/addRequest',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => console.log(data))
        navigate('/dashboard/front')
        reset();
    };

    const [requests, setRequests] = useState()
    useEffect(() => {
        fetch('http://localhost:5000/requests')
            .then(res => res.json())
            .then(data => setRequests(data))
    }, [])

    return (
        <div>

            <h6 className="page-header">Make Leave Request</h6>

            <div className="row">

                <div className="col-md-6">
                    <div >
                        <form onSubmit={handleSubmit(onSubmit)}>


                            <br />

                            <p className='d-block me-3'><strong>Say Leave Reason : </strong></p>

                            <input className='input-field input-group' {...register("leaveReason")} placeholder="Leave Reason" type='text' />


                            <p className='d-block me-3'><strong>Set Leave Date : </strong></p>

                            <div className="d-flex">

                                <div className="me-3">
                                    <p className="text-info">Select Start Day</p>
                                    <input name="leaveStart" id="leaveStart" className='' {...register("leaveStart")} type='Date' />
                                </div>
                                <div>
                                    <p className="text-info">Select End Day</p>
                                    <input name="leaveEnd" id="leaveEnd" className='' {...register("leaveEnd")} type='Date' />
                                </div>

                            </div>


                            <button type="submit" className="btn btn-info mt-3">Submit Request</button>

                        </form>
                    </div>

                </div>


                <div className="col-md-6">


                    <h6 className="page-header mb-4">My Requests </h6>


                    {requests.map(req => <div key={req._id}>

                        <div className="card">

                            <div className="card-body">

                                <h6 className="card-title"><strong className="text-info">Leave Reason : </strong> {req.leaveReason}</h6>


                                <p><strong className="text-info">⚙ Leave Start : </strong>{req.leaveStart} </p>
                                <p><strong className="text-info">⚙ Leave Start : </strong>{req.leaveEnd} </p>

                                <p><strong className="text-info">⚙ Request Status : </strong> <span className="text-danger">Not Approved</span> </p>






                            </div>

                        </div>


                    </div>)}

                </div>


            </div>


        </div>
    );
};

export default Requests;