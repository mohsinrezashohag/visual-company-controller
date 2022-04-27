import React from 'react';
import './SingleService.css'

const SingleService = (props) => {

    const { name, service_duration, service_details, image } = props.service;

    return (
        <div>


            <div className="m-4 single-service">


                <img className="service-image" src={image} alt="" />

                <div className="service-text">
                    <h5>{name}</h5>
                    <h4>Service Duration : {service_duration} Days</h4>
                    <p>{service_details?.slice(0, 150)}</p>

                </div>

                {/* <div>
                    <Link to={`service/${_id}`}><button className="m-4 see-book-btn"> SEE & BOOK <i className="fas fa-arrow-alt-circle-right"></i></button></Link>
                </div> */}

            </div >


        </div>
    );
};

export default SingleService;