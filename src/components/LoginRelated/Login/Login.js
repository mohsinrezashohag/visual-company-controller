import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Login.css'
import image from '../../../Images/login.jpg'

const Login = () => {

    const { googleSignIn, user, emailPassSignIn, setUser, error, setError } = useAuth()
    const { register, handleSubmit } = useForm();


    const navigate = useNavigate();
    const location = useLocation();
    const redirect_url = location?.state?.from || '/'



    const googleSignIn_Page = () => {
        googleSignIn()
            .then((result) => {
                setUser(result.user)
                navigate("/dashboard/front")
            })
    }










    const onSubmit = data => {
        const { email, password } = data;
        emailPassSignIn(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                navigate("/dashboard/front")
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });

    };




    return (
        <div className="container">

            <div className="row login-user">



                <div className="col-md-6 text-right">

                    <img className="img-fluid" src={image} alt="" />

                </div>


                <div className="col-md-6 login-fields">

                    <h6 className="page-header">Login Now</h6>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className='input-field' {...register("email")} placeholder="Email" type='email' />
                        <br />
                        <input className='input-field' {...register("password")} placeholder="Password" type='password' />

                        <br />

                        <p className="text-danger">{error}</p>


                        <div className="d-flex">
                            <button type="submit" className="my-button me-3">Login Now </button>

                            <NavLink to='/register' className="my-button" style={{ width: '180px', backgroundColor: 'orang', color: 'white' }} >  <p className='m-2 text-danger'>Not Registered yet ?</p>  </NavLink>

                        </div>
                    </form>



                </div>






            </div >







            {/* <br /> */}

            {/* <button onClick={googleSignIn_Page} className='btn btn-danger'> Google Login</button> */}

        </div >
    );
};

export default Login;