import React, { useEffect, useState } from 'react';

const RequestsComplaints = () => {

    const [requests, setRequests] = useState()
    useEffect(() => {
        fetch('http://localhost:5000/requests')
            .then(res => res.json())
            .then(data => setRequests(data))
    }, [])

    return (
        <div>

            <div className="row">

                <div className="col-md-6">
                    <h6 className="page-header">Leave Request</h6>

                    {requests.map(req => <div key={req._id}>

                        <div className="col-md-12  mt-3">
                            <div className="card">

                                <div className="card-body">

                                    <h6 className="card-title"><strong className="text-info">Leave Reason : </strong> {req.leaveReason}</h6>


                                    <p><strong className="text-info">⚙ Leave Start : </strong>{req.leaveStart} </p>
                                    <p><strong className="text-info">⚙ Leave Start : </strong>{req.leaveEnd} </p>

                                    <button className="btn btn-info me-2">Approve</button>
                                    <button className="btn btn-danger">Cancel</button>


                                    {/* <button className="btn btn-info"><NavLink className="card-nav-link" to={`/dashboard/workDetails/${project._id}`}> ▶ See Details & Take Action </NavLink></button> */}

                                </div>

                            </div>
                        </div>

                    </div>)}

                </div>

                <div className="col-md-6">

                    <h6 className="page-header">Complaints</h6>

                </div>


            </div>


        </div>
    );
};

export default RequestsComplaints;