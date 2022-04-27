import React from 'react';
import { useForm } from 'react-hook-form';

const MakeManager = () => {
    const { register, handleSubmit } = useForm();






    const onSubmit = data => {
        console.log(data);

    }



    return (
        <div>
            <h6 className="page-header">Make Manager</h6>


            <div >


                <div className="mt-5 w-75">

                    <form onSubmit={handleSubmit(onSubmit)}>


                        <input className='input-field input-group' {...register("email")} placeholder="Email" type='email' />
                        <br />


                        <br />
                        <input className='mt-4' type="submit" />
                    </form>

                </div>


            </div>

        </div>
    );
};

export default MakeManager;