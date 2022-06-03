import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from "react-to-print";

import { Table } from 'react-bootstrap';

const Employees = () => {

    const [employees, setEmployees] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/employees')
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])


    const handleMakeManager = (email) => {
        const user = { email }
        if (window.confirm("Are you sure ?")) {

            fetch('http://localhost:5000/makeManager', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(data => console.log(data))

        }
        window.location.reload();
    }



    // pdf related works trying
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });




    return (
        <div>

            <div className="d-flex justify-content-between">
                <h6 className="page-header">All Employees</h6>
                <h6 className="page-header text-dark me-4">{employees.length} employees</h6>
            </div>

            <div ref={componentRef}>




                <Table className="table mt-4 " >
                    <thead>
                        <tr className="border border-3 ">

                            <th>Employee Name</th>
                            <th>Employee Email</th>
                            <th>Position</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>


                        {employees.map(employee =>
                            <tr key={employee?._id} className="border border-2 ">
                                <td>{employee?.name}</td>
                                <td>{employee?.email}</td>

                                <td>{employee?.role === "manager" ? <p className="text-info">Manager</p> : <p>Workers</p>} </td>



                                <td >

                                    {employee?.role !== "manager" ?

                                        <div className='me-3' >
                                            <button button onClick={() => handleMakeManager(employee?.email)} className="btn btn-warning">🙍‍♂️ Make Manager</button>
                                        </div> : <p>No Action Needed</p>
                                    }


                                </td>

                            </tr>)
                        }

                    </tbody>
                </Table>

            </div >

            <button onClick={handlePrint} className="print__button">  Print </button>


        </div >
    );
};

export default Employees;