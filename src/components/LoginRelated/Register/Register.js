import { getAuth, updateProfile } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';

const Register = () => {

    const { emailPassSignUp, error, setError, setUser, user } = useFirebase();
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    // const redirect_url = location?.state?.from || '/'
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
        <div>
            <h2>Register Now</h2>


            <div >

                <p>{error}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='input-field' {...register("name")} placeholder="Name" type='text' />
                    <br />

                    <input className='input-field' {...register("email")} placeholder="Email" type='email' />
                    <br />

                    <input className='input-field' {...register("password")} placeholder="Password" type='password' />

                    <br />

                    <input className='input-field' {...register("confirmPassword")} placeholder="Confirm Password" type='password' />





                    <br />
                    <input className='mt-4' type="submit" />
                </form>

                <Link to='/login'>  <p className='m-2 text-danger'>Already Registered ?</p>  </Link>

            </div>

        </div>
    );
};

export default Register;