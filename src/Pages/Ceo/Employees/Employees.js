import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Employees = () => {

    const [employees, setEmployees] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/employees')
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])

    const handleActions = () => {
    }

    return (
        <div>
            <h6 className="page-header">All Employees</h6>
            <h1>Total Employee : {employees.length}</h1>

            <div className="container">




                <Table className="table " style={{ textAlign: 'left' }}>
                    <thead>
                        <tr>

                            <th>Employee Name</th>
                            <th>Employee Email</th>
                            <th>Position</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>


                        {employees.map(employee =>
                            <tr key={employee?._id}>
                                <td>{employee?.name}</td>
                                <td>{employee?.email}</td>
                                <td><p className="text-primary">Approved</p></td>
                                <td>

                                    <td className='d-flex'>

                                        <div className='me-3' >
                                            <button onClick={() => handleActions(employee?._id)} className="btn btn-danger"><i className="fas fa-trash-alt"></i> Cancel employee</button>
                                        </div>

                                    </td>

                                </td>
                            </tr>)
                        }

                    </tbody>
                </Table>

            </div>

        </div>
    );
};

export default Employees;