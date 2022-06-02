import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './ReviewAction.css'

const ReviewAction = () => {
    const { projectTitle } = useParams();
    const navigate = useNavigate()

    //  getting all assigned projects

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/projectsRunning')
            .then(res => res.json())
            .then(data => setProjects(data))
    }, [])

    const thisProject = projects.find(project => project.title === projectTitle)

    // update existing projects conditions

    const updateThisProjectSubmissionStatus = (project) => {
        fetch('http://localhost:5000/updateSumissionStatus', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }


    const handleSubmitProjectToCTO = (title) => {
        const project = { title };
        updateThisProjectSubmissionStatus(project);
        if (window.confirm('Are you sure to submit ?')) {
            fetch('http://localhost:5000/projectDone', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(project)
            }).then(res => res.json())
                .then(data => console.log(data))
        }

        navigate('/dashboard/myAcceptedProjects')
    }






    return (
        <div>
            <h6 className="page-header">Review Workers Submission</h6>


            <div className="row">

                <div className="col-md-5">

                    <div className="mt-5">

                        <h2>{thisProject?.title}</h2>

                        <div className='mt-4'>

                            <h4>Done By : Mr. {thisProject?.doneBy}</h4>

                            <p><strong>Explanation from the Team Member :</strong> {thisProject?.submitText} </p>

                        </div>


                        <button onClick={() => handleSubmitProjectToCTO(thisProject?.title)} className="btn btn-info text-white mt-5">Submit Project To CTO</button>

                    </div>

                </div>

                {thisProject?.docs && <div className="col-md-7">

                    <h4>Documents About This Project</h4>

                    <div className="pdf-box">
                        <object>
                            <embed id="pdfID" type="text/html" width="600" height="400" src={`data:application/pdf;base64,${thisProject?.docs}`} download />
                        </object>

                    </div>
                </div>}


            </div>



        </div >
    );
};

export default ReviewAction;