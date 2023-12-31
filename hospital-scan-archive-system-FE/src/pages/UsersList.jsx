import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import { IoSearch } from "react-icons/io5";

import AddButton from '../components/AddButton';

const UsersList = () => {
    const navigate = useNavigate();
    const users = [
        { id: 1, firstName: 'Sodiq', lastName: 'Ishola', email: 'example123@gmail.com', specialty: 'Gynaecologist', role: 'doctor', img: 'https://p7.hiclipart.com/preview/14/65/239/ico-avatar-scalable-vector-graphics-icon-doctor-with-stethoscope.jpg' },
        { id: 2, firstName: 'Hamzat', lastName: 'Turawa', email: 'example123@gmail.com', specialty: 'Neurologist', role: 'doctor', img: 'https://cdn.imgbin.com/2/21/3/imgbin-computer-icons-doctor-of-medicine-health-care-physician-health-f0nPVnd5XSZmZra6C8BRi8kU4.jpg' },
        { id: 3, firstName: 'Halimah', lastName: 'Salis', email: 'example123@gmail.com', specialty: 'Opthalmologist', role: 'doctor', img: 'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7525866/hijab-doctor-clipart-md.png' },
        { id: 4, firstName: 'Zainab', lastName: 'Musa', email: 'example123@gmail.com', specialty: 'Dermatologist', role: 'nurse', img: 'https://www.clipartmax.com/png/middle/244-2445799_doctor-female-doctor-icon.png' },
    ];

    function viewUser(userId) {
        navigate(`users/${userId}`);
    }

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="flex justify-between items-center mb-6 w-full">
                <h1 className="text-[#15254C] text-2xl font-bold">Specialists</h1>
                <AddButton>Add New</AddButton>
            </div>

            <div className="h-full overflow-auto w-full">
                {
                    users?.length === 0 ?
                        <EmptySearch headers={['Posts', 'Published']} />
                        :
                        <div className="flex flex-col">
                            <div className="mt-6 mb-4 md:flex md:items-center md:justify-between">
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
                                                Profile Image
                                            </th>
                                            <th scope="col" className="th">
                                                First Name
                                            </th>
                                            <th scope="col" className="th">
                                                Last Name
                                            </th>
                                            <th scope="col" className="th">
                                                Email
                                            </th>
                                            <th scope="col" className="th">
                                                Specialty
                                            </th>
                                            <th scope="col" className="th">
                                                Role
                                            </th>
                                            <th scope="col" className="th">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {
                                            users.map(user => (
                                                <tr key={user.id} onClick={() => viewUser(user.id)} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                                    <td className="table-data">
                                                        <img src={user.img} className='w-10 h-10 rounded-full' alt={`${user.firstName} ${user.lastName}`} />
                                                    </td>
                                                    <td className="table-data">{user.firstName}</td>
                                                    <td className="table-data">{user.lastName}</td>
                                                    <td className="table-data">{user.email}</td>
                                                    <td className="table-data">{user.specialty}</td>
                                                    <td className="table-data">{user.role}</td>
                                                    <td className="py-4 px-6 whitespace-nowrap flex items-center justify-center gap-1">
                                                        <a href="#" className="text-grey-lighter py-1 px-1 rounded-md bg-blue-600 hover:bg-blue-700"><MdOutlineEdit size={20} color='white' /></a>
                                                        <a href="#" className="text-grey-lighter py-1 px-1 rounded-md bg-red-600 hover:bg-red-700"><MdDeleteOutline size={20} color='white' /></a>
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
                                        <span>
                                            previous
                                        </span>
                                    </a>

                                    <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                        <span>
                                            Next
                                        </span>
                                        <FaArrowRightLong size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default UsersList;