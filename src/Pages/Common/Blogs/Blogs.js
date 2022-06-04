import React, { useEffect, useState } from 'react';
import SingleBlog from '../SingleBlog/SingleBlog';

const Blogs = () => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])


    return (
        <div>
            <h6 className="page-header">All Of Our Blogs</h6>

            <div className="row">
                {blogs.map((blog) => <SingleBlog blog={blog} key={blog._id} ></SingleBlog>)}
            </div>
        </div>
    );
};

export default Blogs;