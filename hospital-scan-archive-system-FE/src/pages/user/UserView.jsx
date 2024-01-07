import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { users } from '../../constants';
import { EmptySearch } from '../../components/EmptySearch';

export async function loader() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const data = users.filter(user => user.id === currentUser.id)[0];

    return data;
}

import { HiUser } from 'react-icons/hi';

const UserView = () => {
    const user = useLoaderData();

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="mb-10">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/user" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Home</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Profile</li>
                    </ol>
                </nav>

                <div className="flex justify-between items-center w-full mt-6">
                    <h1 className="font-bold text-primary text-2xl leading-tight">Profile</h1>
                    <div className="flex items-center gap-2">
                        <Link to={`/user/profile/update`} state={{ user }} className="text-grey-lighter py-2 px-2 rounded-md bg-blue-600 hover:bg-blue-700">
                            <MdOutlineEdit size={22} color='white' />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-10">
                <div className="flex justify-center">
                    {
                        user.img ?
                            <div className="w-40 h-40 border-primary border-2 rounded-full p-1">
                                <img src={user.img} className='rounded-full' alt={`${user.firstName} ${user.lastName}`} />
                            </div> :
                            <HiUser size={200} color='#07074D' className='rounded-full border-primary border-2 p-3' />
                    }
                </div>

                <fieldset className="w-full border-2 border-gray-300 rounded-md px-6 py-4 grid grid-cols-1 ss:grid-cols-2 md:grid-cols-3 gap-3">
                    <legend className='font-semibold text-primary px-1'>User Details</legend>

                    <div className="">
                        <h4 className="block text-base font-semibold text-[#07074D]">
                            First Name
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {user.firstName}
                        </p>
                    </div>
                    <div className="">
                        <h4 className="block text-base font-semibold text-[#07074D]">
                            Last Name
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {user.lastName}
                        </p>
                    </div>
                    <div className="">
                        <h4 className="block text-base font-semibold text-[#07074D]">
                            Email
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {user.email}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Specialty
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {user.speciality}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Role
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280] capitalize">
                            {user.role}
                        </p>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default UserView;