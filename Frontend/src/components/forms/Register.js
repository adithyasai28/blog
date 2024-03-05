import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [user, setUser] = useState([]);

    useEffect(() => {
        const userAuthThroughServer = () => {
            let serverdomain = "http://localhost:5000/userapi/register"
            console.log(serverdomain)

            axios.post(serverdomain, user)
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => {
                    console.error('Error posting data:', error);
                });

        }
        userAuthThroughServer()
    }, [user])
    const handleFormSubmit = (userobj) => {
        setUser(prevUsers => [...prevUsers, userobj]);
        console.log(user)
    }
    return (
        <div className="flex flex-col justify-center items-center mt-6 h-cover">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-gray-200 p-4 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
                <div className="mb-4 flex flex-col">
                    <label className="block font-bold text-lg mb-2" htmlFor="Username">UserName</label>
                    <input className="p-2 rounded-lg bg-yellow-200 text-slate-800" type="text" id="Username"
                        {...register('Username', { required: true, minLength: 6, maxLength: 20 })}
                    />
                    {errors.Username?.type === 'minLength' && <p className="error-message">*min length should be 6 letters</p>}
                    {errors.Username?.type === 'maxLength' && <p className="error-message">*max length should be 20 letters</p>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label className="block font-bold text-lg mb-2" htmlFor="Email">Email</label>
                    <input className="p-2 rounded-lg bg-yellow-200 text-slate-800" type="text" id="Email"
                        {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
                    />
                    {errors.Email?.type === 'required' && <p className="error-message">*required</p>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label className="block font-bold text-lg mb-2" htmlFor="Password">Password</label>
                    <input className="p-2 rounded-lg bg-yellow-200 text-slate-800" type="password" id="Password"
                        {...register('Password', { required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/ })}
                    />
                    {errors.Password?.type === 'required' && <p className="error-message">*password must consist of at least 1 uppercase, 1 lowercase, 1 number, 1 special character and minimum length should be 6</p>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label className="block font-bold text-lg mb-2" htmlFor="UserType">UserType</label>
                    <select className="p-2 rounded-lg bg-yellow-200 text-slate-800" name="UserType" id="UserType"
                        {...register('UserType', { required: true })}
                    >
                        <option value="">Select UserType</option>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                    </select>
                    {errors.UserType && <p className="error-message">User Type is required.</p>}
                </div>
                <div className="flex justify-center">
                    <button className="bg-amber-300 hover:bg-amber-500 rounded-full py-2 px-6 font-bold text-black"
                        type="submit"
                    >Register</button>
                </div>
            </form>
            <div className="w-full flex justify-center my-10 border-black font-black">
                <hr className="w-1/4 border-black opacity-10 m-2" />
                <p>OR</p>
                <hr className="w-1/4 border-black opacity-10 m-2" />
            </div>
            <div className='flex flex-col'>
                <div className='flex justify-center'>
                    <button className="flex items-center justify-center px-6 rounded-full bg-black font-bold text-white py-4 gap-6">
                        <i className="w-5" class="fab fa-google"></i>
                        Continue With Google</button>
                </div>
                <div className='mt-6 text-dark-gray text-center mb-10'>
                    <p>Already a member ?
                        <Link className="underline textblack ml-2" to='/signin'>
                            Signin Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
