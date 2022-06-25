import { getAuth, updateProfile } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';
import './Register.css'
import image from '../../../Images/login.jpg'




const Register = () => {

    const { emailPassSignUp, error, setError, setUser, user } = useFirebase();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()



    const onSubmit = data => {
        const auth = getAuth();
        const { name, email, password, confirmPassword } = data;
        if (password === confirmPassword) {

            emailPassSignUp(name, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    putRegisterUserToDatabase(name, email);
                    setUser(user)
                    navigate('/login')
                    // update the profile
                    updateProfile(auth.currentUser, {
                        displayName: name
                    }).catch((error) => {
                        setError(error)
                    });

                    navigate('/dashboard/front')
                    window.location.reload();
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)
                });



        }
        else {
            setError("Password does not matched")
        }



    };


    //adding register user to database
    const putRegisterUserToDatabase = (name, email) => {
        const user = { name: name, email: email };
        fetch('http://localhost:5000/addUser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }




    return (


        <div className="container register-user">

            <div className="row">

                <div className="col-md-6 text-right">
                    <img className="img-fluid" src={image} alt="" />
                </div>


                <div className="col-md-6">


                    <div >
                        <h6 className="page-header">Register Now</h6>
                        <p className="text-danger">{error}</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input className='input-field' {...register("name")} placeholder="Name" type='text' />
                            <br />

                            <input className='input-field' {...register("email")} placeholder="Email" type='email' />
                            <br />


                            <input className='input-field' {...register("phone")} placeholder="Phone Number" type='number' />
                            <br />

                            <input className='input-field' {...register("password")} placeholder="Password" type='password' />

                            <br />

                            <input className='input-field' {...register("confirmPassword")} placeholder="Confirm Password" type='password' />

                            <br />



                            <div className="d-flex">

                                <button type="submit" className='my-button me-3'>Register Now</button>

                                <NavLink to='/login' className="my-button" style={{ width: '180px', backgroundColor: 'orang', color: 'white' }} >  <p className='m-2 text-danger'>Already Registered ?</p>  </NavLink>

                            </div>

                        </form>


                    </div>

                </div>






            </div >





































        </div>
    );
};

export default Register;