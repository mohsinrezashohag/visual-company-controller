import React from 'react';

const SingleTask = (props) => {

    const { title, deadline, summery } = props.task;

    return (
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mt-3">
            <div className="card">
                {/* <img className="card-img" src="" alt="Bologna" /> */}

                <div className="card-body">

                    <h4 className="card-title">{title}</h4>


                    <small className="text-muted cat">
                        <i className="far fa-clock text-info"></i> project deadline : <span className="text-primary">{deadline}</span>
                    </small>

                    {/* {summery.slice(0, 100)} */}
                    <p className="card-text">
                        {summery.length >= 100 ? <p>{summery.slice(0, 100)}</p> : <p>{summery}</p>}
                    </p>



                    <a href="" className="btn btn-info">See Details & Take Action </a>
                </div>

                {/* <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                    <div className="views">Oct 20, 12:45PM
                    </div>
                    <div className="stats">
                        <i className="far fa-eye"></i> 1347
                        <i className="far fa-comment"></i> 12
                    </div>
                </div> */}



            </div>
        </div>
    );
};

export default SingleTask;