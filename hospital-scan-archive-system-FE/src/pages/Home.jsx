import React from 'react';
import { useState } from 'react';
import { useNavigate, Form, useActionData, redirect, useNavigation, useRouteError } from 'react-router-dom';
import { FaExclamationCircle } from "react-icons/fa";
import Header from '../components/Header';
import { users } from '../constants';
import { loginUser } from '../api';

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const user = await loginUser({ email, password });

        if (user.error) {
            return {
                message: user.message
            }
        }

        localStorage.setItem('user', JSON.stringify(user));
        
        if (user.role === 'admin') {
            return redirect('/admin');
        } else {
            return redirect('/user');
        }
    } catch (error) {
        return error;
    }
}

const Home = () => {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const error = useActionData();

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);

    function handleDataChange(e) {
        const { name, value } = e.target;

        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const user = users.filter(user => user.email === loginData.username && user.password === loginData.password)[0];

        if (!user) {
            console.log('User not found!');
            return;
        } else {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    return (
        <section className=''>
            <Header />
            <div className='flex flex-col items-center mt-16 w-full'>
                <div className='flex flex-col  text-primary py-5 xs:py-10 px-5 xs:px-10 w-full sm:w-[70%] max-w-lg'>
                    <h1 className='text-2xl sm:text-3xl font-extrabold'>Login</h1>

                    <Form method='post' replace className={`form-control w-full mt-6 px-5 py-7 border-2 border-primary rounded-xl`}>
                        {error?.message && (
                            <div className="flex h-8 items-end space-x-1 mb-6" aria-live="polite" aria-atomic="true" >
                                <FaExclamationCircle color='red' size={20} />
                                <p className="text-sm text-red-500 font-medium">{error.message}</p>
                            </div>
                        )}

                        <div className="w-full mb-5">
                            <label className="font-medium" htmlFor='email'>
                                <span className="label-text ">Email</span>
                            </label>
                            <input type="text" id='email' name='email' placeholder="Email" className="px-4 py-2.5 mt-1 rounded-md font-medium border-[#999999] bg-[#b0e3f3] text-primary text-sm w-full" required />
                        </div>

                        <div className="mb-5">
                            <label className="font-medium" htmlFor='password'>
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" id='password' name='password' placeholder="Password" className="px-4 py-2.5 mt-1 rounded-md font-medium border-[#999999] bg-[#b0e3f3] text-primary text-sm w-full" required />
                        </div>

                        <button type='submit' className="bg-primary text-white font-medium w-full rounded-md py-2 disabled:opacity-30" disabled={navigation.state === 'submitting'}>
                            {navigation.state === 'submitting' ? 'Logging in...' : 'Log in'}
                        </button>
                    </Form>
                </div>
            </div>
        </section>
    )
}

export default Home;