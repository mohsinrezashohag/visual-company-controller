import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './MyworkDetails.css'

const MyworkDetails = () => {

    const { user } = useAuth()
    const { id } = useParams();
    const [work, setWork] = useState({});
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [submitText, setSubmitText] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/work/${id}`)
            .then(res => res.json())
            .then(data => setWork(data))
    }, [])






    const userName = user.displayName;
    const handleSubmitProject = (e) => {
        e.preventDefault();

        // const sumbitThings = work;
        // sumbitThings.doneBY = [];
        // sumbitThings.doneBY.push(userName);
        // sumbitThings.documents = file;





        if (!file) {
            setError("Please select a file first 🙂")
            return;
        }
        else {

            const formData = new FormData();
            formData.append('doneBy', userName);
            formData.append('submitText', submitText);
            formData.append('file', file);

            fetch(`http://localhost:5000/submitWork/${id}`, {
                method: 'PUT',
                body: formData
            })
                .then(res => res.json())
                .then(result => {
                    console.log('Success:', result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            navigate("/dashboard/front")

        }

    }






    return (
        <div>
            <h1 className="page-header">Work details page</h1>



            <div>
                <div className="mt-3">
                    <h2>{work.title}</h2>
                    <h5 className="my-3">Deadline : <span className="text-info">{work.deadline}</span> </h5>
                    <h5>Description : <span className="special-text" >{work.Summery}</span> </h5>

                    <h5 className="my-3">Instruction For This Project :

                        <span className="special-text ms-2">{work.instruction}</span>
                    </h5>

                    {/* <div className="my-5">
                        <p>Project Team : {JSON.parse(work.AssignedMembers).map(member => <span key={member} className="team-member"> {member} </span>)}</p>
                    </div> */}

                    <div className="special-bg p-3 border rounded-2 me-4 h-100">

                        <h6 className="page-header">Submit Your Works</h6>

                        <form action="">

                            <input className="input-field" placeholder="Write something about your submission" type="text" name="submit-text" id="submit-text" onChange={e => setSubmitText(e.target.value)} />
                            <p>Attach file if you have any</p>
                            <input type="file" onChange={e => setFile(e.target.files[0])} />

                            <br />
                            <br />
                            <button type="submit" onClick={handleSubmitProject} className="btn btn-info text-white">Submit Project</button>

                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default MyworkDetails;