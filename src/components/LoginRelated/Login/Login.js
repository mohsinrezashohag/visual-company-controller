import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Login.css'

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
                navigate(redirect_url)
            })
    }










    const onSubmit = data => {
        const { email, password } = data;
        emailPassSignIn(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                navigate(redirect_url)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });

    };




    return (
        <div>

            <h2>Login Now</h2>

            <div >

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='input-field' {...register("email")} placeholder="Email" type='email' />
                    <br />
                    <input className='input-field' {...register("password")} placeholder="Password" type='password' />


                    {/* <br />
                <select className='input-field' {...register("gender")}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>
                <br /> */}




                    <br />
                    <input className='mt-4' type="submit" />
                </form>

                <Link to='/register'>  <p className='m-2 text-danger'>Not Registered yet ?</p>  </Link>

            </div>





            <br />





            <button onClick={googleSignIn_Page} className='btn btn-danger'> Google Login</button>

        </div>
    );
};

export default Login;