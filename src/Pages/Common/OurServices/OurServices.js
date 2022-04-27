import React, { useEffect, useState } from 'react';
import SingleService from '../Home/SingleService/SingleService';
import './OurServices.css'

const OurServices = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/allTask')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])




    return (
        <div className="service-grid">

            {services.map(service => <SingleService key={service.id} service={service} ></SingleService>)}

        </div>
    );
};

export default OurServices;