import { useRef, useState } from 'react';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoSearch, IoEyeOutline } from "react-icons/io5";
import { users } from '../../constants';
import Table from '../../components/Table';

import AddButton from '../../components/AddButton';

export async function loader() {
    return users;
}

const ActionButtons = ({ user }) => {
    function viewUser(e) {
        e.preventDefault();

        const userId = e.currentTarget.getAttribute('data-user-id');
        navigate(`./${userId}`);
    }

    function deleteUser(e) {
        e.preventDefault();

        const userId = e.currentTarget.getAttribute('data-user-id');
        console.log('UserId:', userId);
    }
    
    return (
        <div className="py-5 px-6 flex items-center justify-center gap-1">
            <button onClick={viewUser} data-user-id={user.id} className='bg-purple-500 hover:bg-purple-600 p-1 rounded-md'>
                <IoEyeOutline size={20} color='white' />
            </button>

            <Link to={`create-user`} state={{ currentUser: user }} className="text-grey-lighter py-1 px-1 rounded-md bg-blue-600 hover:bg-blue-700"><MdOutlineEdit size={20} color='white' /></Link>

            <button onClick={deleteUser} data-user-id={user.id} className="text-grey-lighter py-1 px-1 rounded-md bg-red-600 hover:bg-red-700"><MdDeleteOutline size={20} color='white' /></button>
        </div>
    )
}

const UsersList = () => {
    const navigate = useNavigate();
    const usersData = useLoaderData();

    const columns = [
        { id: 'S/N', header: 'S/N' },
        { id: 'img', header: 'Profile Image' },
        { id: 'firstName', header: 'First Name' },
        { id: 'lastName', header: 'Last Name' },
        { id: 'email', header: 'Email' },
        { id: 'role', header: 'Role' },
        { id: 'speciality', header: 'Specialty' },
        { id: 'active', header: 'Status' },
        { id: 'actions', header: '' }
    ];

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="pb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/admin" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Dashboard</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Users</li>
                    </ol>
                </nav>

                <div className="flex justify-between items-center mb-6 w-full">
                    <h1 className="font-bold text-primary text-2xl leading-tight mt-6">Users</h1>
                    <AddButton navigateTo={`create-user`}>Add New</AddButton>
                </div>
            </div>

            <div className="h-full overflow-auto w-full">
                {
                    usersData?.length === 0 ?
                        <EmptySearch headers={['Profile Image', 'First Name', 'Last Name', 'Email', 'Specialty', 'Role']} />
                        :
                        <Table data={users} columns={columns} render={(user) => (
                            <ActionButtons user={user} />
                        )} />
                }
            </div>
        </div>
    )
}

export default UsersList;