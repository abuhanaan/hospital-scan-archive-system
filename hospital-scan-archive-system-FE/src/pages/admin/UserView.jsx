import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong, FaUserCheck, FaUserXmark } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { users, scans } from '../../constants';
import { EmptySearch } from '../../components/EmptySearch';

export async function loader({ params }) {
    const user = users.filter(user => user.id === Number(params.id));
    const userScans = scans.filter(scan => scan.userId === Number(params.id));

    const data = {
        ...user[0],
        scans: userScans
    };

    return data;
}

import { IoSearch } from 'react-icons/io5';

const UserView = () => {
    const user = useLoaderData();
    const navigate = useNavigate();

    function viewScan(e) {
        e.preventDefault();

        const scanId = e.currentTarget.getAttribute('data-scan-id');
        navigate(`/admin/scans/${scanId}`);
    }

    function deleteUser(e) {
        e.preventDefault();

        const userId = e.currentTarget.getAttribute('data-user-id');
        console.log('User Id:', userId);
    }

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="mb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/admin" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Dashboard</Link></li>
                        <li><Link to="/admin/users" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Users</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">User</li>
                    </ol>
                </nav>

                <div className="flex justify-between items-center w-full mt-6">
                    <h1 className="font-bold text-primary text-2xl leading-tight">User</h1>
                    <div className="flex items-center gap-4">
                        <Link to={`/admin/users/create-user`} state={{ currentUser: user }} className="text-grey-lighter py-2 px-2 rounded-md bg-blue-600 hover:bg-blue-700"><MdOutlineEdit size={22} color='white' /></Link>

                        {
                            user.active ? 
                            <button onClick={deleteUser} data-user-id={user.id} className="text-grey-lighter py-2 px-2 rounded-md bg-red-700 hover:bg-red-900"><FaUserXmark size={22} color='white' /></button>
                            :
                            <button onClick={deleteUser} data-user-id={user.id} className="text-grey-lighter py-2 px-2 rounded-md bg-green-700 hover:bg-green-900"><FaUserCheck size={22} color='white' /></button>
                        }

                        <button onClick={deleteUser} data-user-id={user.id} className="text-grey-lighter py-2 px-2 rounded-md bg-red-700 hover:bg-red-800"><MdDeleteOutline size={22} color='white' /></button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row">
                <div className="order-2">
                    {
                        user.scans?.length === 0 ?
                            <EmptySearch headers={['Patient', 'Symptoms', 'Diagnosis', 'Date', 'Scan Link']} type='scans' />
                            :
                            <div className="flex flex-col">
                                <div className="mb-2 md:flex md:items-center md:justify-between">
                                    <h3 className="text-xl text-primary font-semibold">Scans</h3>
                                    <div className="relative flex items-center mt-4 md:mt-0">
                                        <span className="absolute w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                                            <IoSearch size={18} />
                                        </span>

                                        <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                </div>

                                <div className="overflow-auto">
                                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                        <thead className="bg-gray-100 dark:bg-gray-700">
                                            <tr className="">
                                                <th scope="col" className="th">
                                                    Patient
                                                </th>
                                                <th scope="col" className="th">
                                                    Type
                                                </th>
                                                <th scope="col" className="th">
                                                    Symptoms
                                                </th>
                                                <th scope="col" className="th">
                                                    Diagnosis
                                                </th>
                                                <th scope="col" className="th">
                                                    Date
                                                </th>
                                                <th scope="col" className="th">
                                                    Download
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                            {
                                                user.scans.map(scan => (
                                                    <tr key={scan.scanId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <td className="table-data">{scan.patientName}</td>
                                                        <td className="table-data">{scan.scanType}</td>
                                                        <td className="table-data">{scan.scanSymptoms}</td>
                                                        <td className="table-data">{scan.scanDiagnosis}</td>
                                                        <td className="table-data">{scan.scanDate}</td>
                                                        <td className='table-data flex items-center justify-center gap-1'>
                                                            <button onClick={viewScan} data-scan-id={scan.scanId} className='bg-purple-500 hover:bg-purple-600 p-1 rounded-md'>
                                                                <IoEyeOutline size={20} color='white' />
                                                            </button>

                                                            <Link to={scan.scanUrl} className='bg-blue-500 hover:bg-blue-600 p-1 rounded-md'>
                                                                <MdOutlineFileDownload size={20} color='white' />
                                                            </Link>
                                                        </td>
                                                    </tr>

                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Page <span className="font-medium text-gray-700 dark:text-gray-100">1 of 10</span>
                                    </div>

                                    <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                                        <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                            <FaArrowLeftLong size={18} />
                                            <span>previous</span>
                                        </a>

                                        <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                            <span>Next</span>
                                            <FaArrowRightLong size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                    }
                </div>

                <div className="mb-4 flex justify-center sm:justify-start">
                    <img src={user.img} className='w-32 rounded-full' alt={`${user.firstName} ${user.lastName}`} />
                </div>

                <fieldset className="w-full border-2 border-gray-300 rounded-md px-6 py-4 mb-4 grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 gap-3">
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
                            {user.specialty}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Role
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {user.role}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Total Scans
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {user.scans.length}
                        </p>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default UserView;