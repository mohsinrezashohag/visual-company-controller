import React from 'react';
import { NavLink } from 'react-router-dom';

const SingleBlog = (props) => {




    const { _id, img, postTitle, postedBy, postBody } = props.blog;
    return (
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mt-3">
            <div className="card">
                <img className="card-img" src={`data:application/pdf;base64,${img}`} alt="" />

                <div className="card-body">

                    <h4 className="card-title">{postTitle}</h4>

                    <p>Posted By : <span className="text-info">{postedBy}</span> </p>

                    <div className="card-text">
                        {postBody.length >= 100 ? <p>{postBody.slice(0, 100)}</p> : <p>{postBody}</p>}
                    </div>



                    <button className="btn btn-info"><NavLink className="card-nav-link" to={`/dashboard/bolgDetails/${_id}`}> Read More...</NavLink></button>



                </div>


            </div>
        </div>
    );
};

export default SingleBlog;