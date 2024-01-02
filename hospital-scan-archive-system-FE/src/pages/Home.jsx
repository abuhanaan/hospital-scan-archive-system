import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationCircle } from "react-icons/fa";
import Header from '../components/Header';

const Home = () => {
    const navigate = useNavigate();
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

        console.log(loginData);
        navigate('/user');
    }

    return (
        <section className=''>
            <Header />
            <div className='flex flex-col items-center mt-16 w-full'>
                <div className='flex flex-col  text-primary py-5 xs:py-10 px-5 xs:px-10 w-full sm:w-[70%] max-w-lg'>
                    <h1 className='text-2xl sm:text-3xl font-extrabold'>Login</h1>

                    <form onSubmit={handleSubmit} className={`form-control w-full mt-6 px-5 py-7 border-2 border-primary rounded-xl`}>
                        {errorMessage && (
                            <div className="flex h-8 items-end space-x-1 mb-6" aria-live="polite" aria-atomic="true" >
                                <FaExclamationCircle color='red' size={20} />
                                <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
                            </div>
                        )}

                        <div className="w-full mb-5">
                            <label className="font-medium" htmlFor='username'>
                                <span className="label-text ">Username</span>
                            </label>
                            <input type="text" id='username' name='username' placeholder="Username" className="px-4 py-2.5 mt-1 rounded-md font-medium border-[#999999] bg-[#b0e3f3] text-primary text-sm w-full" value={loginData.username} onChange={handleDataChange} required />
                        </div>

                        <div className="mb-5">
                            <label className="font-medium" htmlFor='password'>
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" id='password' name='password' placeholder="Password" className="px-4 py-2.5 mt-1 rounded-md font-medium border-[#999999] bg-[#b0e3f3] text-primary text-sm w-full" value={loginData.password} onChange={handleDataChange} required />
                        </div>

                        <button className="bg-primary text-white font-medium w-full rounded-md py-2">Log in</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Home;