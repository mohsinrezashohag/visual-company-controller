import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SingleService from '../SingleService/SingleService';

const ServiceSection = () => {


    const [services, setServices] = useState([])

    useEffect(() => {

        fetch('./serviceData.json')
            .then(res => res.json())
            .then(data => setServices(data))

    }, [])



    return (
        <div className='d-flex'>

            {
                services.map(service => <SingleService key={service.id} service={service}></SingleService>)
            }

        </div >
    );
};

export default ServiceSection;