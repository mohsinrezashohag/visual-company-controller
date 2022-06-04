import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const NoticeOrBlogs = () => {

    const { user } = useAuth();


    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState(null);
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const userName = user.displayName;





    const handleSubmitProject = (e) => {
        e.preventDefault();


        if (!image) {
            setError("Please select a file first 🙂")
            return;
        }
        else {

            const formData = new FormData();
            formData.append('postedBy', userName);
            formData.append('postTitle', title);
            formData.append('postBody', body);
            formData.append('image', image);

            if (window.confirm("Are You sure ?")) {


                fetch(`http://localhost:5000/addBlogOrNotice`, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log('Success:', result);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }

            navigate('/dashboard/blogs');
            window.location.reload();

        }

    }




    return (
        <div>

            <h6 className="page-header">Add New Blog / Notice</h6>

            <div className="mt-5 w-75">


                <form action="">


                    <br />
                    <p className="text-info">Write blog Title</p>
                    <input className="input-field" type="text" name="blogTitle" id="blogTitle" onChange={e => setTitle(e.target.value)} />


                    <br />
                    <p className="text-info">Write blog</p>
                    <textarea id="blogBody" name="blogBody" rows="4" cols="50" onChange={e => setBody(e.target.value)} >
                    </textarea>

                    <br />
                    <p className="text-info">Attach image</p>
                    <input type="file" onChange={e => setImage(e.target.files[0])} />

                    <br />
                    <br />
                    <button type="submit" onClick={handleSubmitProject} className="btn btn-info text-white">Submit Project</button>

                </form>



            </div>


        </div >
    );
};

export default NoticeOrBlogs;