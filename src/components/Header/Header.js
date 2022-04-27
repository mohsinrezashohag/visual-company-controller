import React from 'react';
import './Header.css'
// import logo from '../../Images/logo.png'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';

const Header = () => {

    const { user, logOut } = useFirebase();
    return (
        <div >





            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    {/* <img className='logo' src={logo} alt="" /> */}
                    <Link to="/" className="text-decoration-none text-white pe-5 ps-2 bg-danger bordered rounded-3 d-block"> VCC </Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav
                            className="me-auto">

                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/ourServices">Our Services</Link>
                            <Link className="nav-link" to="/policy">Working Policy</Link>


                        </Nav>
                        <Nav>

                            {user?.email ?

                                <div className='text-white d-flex align-items-end justify-content-evenly'>

                                    <h6 className='text-warning nav-link'>{user?.displayName}</h6>

                                    <h6 className='text-success'>

                                        <Link className='nav-link' to='/dashboard/front'>Dashboard</Link>
                                    </h6>

                                    {/* <button onClick={logOut} className='btn btn-danger ms-2'>Logout</button> */}

                                </div>

                                : <Link className="nav-link" to="/login">Login Now</Link>
                            }



                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>















            {/* 
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Link to="/policy">Policy</Link>
                    </Nav>
                </Container>
            </Navbar> */}


        </div >
    );
};

export default Header;
