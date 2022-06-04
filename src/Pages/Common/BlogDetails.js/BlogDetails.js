import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {

    const { id } = useParams();

    const [blog, setBlog] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/blogs/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data))
    }, [])




    return (
        <div>
            <h6 className="page-header mb-5">Blogs Details</h6>
            <div className="mt-5">

                <img src={`data:application/pdf;base64,${blog.img}`} className="img-fluid w-25 rounded-3 my-4" alt="" />

                <h2>{blog.postTitle}</h2>
                <p>Posted By : <span className="text-info">{blog.postedBy}</span> </p>

                <p>{blog.postBody}</p>

            </div>

        </div>
    );
};

export default BlogDetails;