import React from 'react';
import { Link, useLoaderData, useActionData, useNavigate } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong, FaUserCheck, FaUserXmark } from "react-icons/fa6";
import { HiUserCircle } from 'react-icons/hi';
import { IoEyeOutline } from "react-icons/io5";
import { users, scans } from '../../constants';
import { EmptySearch } from '../../components/EmptySearch';
import { IoSearch } from 'react-icons/io5';
import { getUser } from '../../api';
import { requireAuth } from '../../utils';
import Table from '../../components/Table';

export async function loader({ params, request }) {
    await requireAuth(request);

    const user = await getUser(params.id, request);

    if (user.error || data.message) {
        return {
            error: user.message ?? user.error
        }
    }

    const data = {
        ...user,
        scans: [
            {
                scanId: '6',
                scanSymptoms: 'Chest pains',
                scanDiagnosis: 'Chest pain',
                scanType: 'Chest Scan',
                scanDate: '8/10/2023',
                scanUrl: 'https://chest-pain-sandra.zip',
                userId: 3,
                userName: 'Halimah Salis',
                userEmail: 'doctor2@g.com',
                userSpecialty: 'Opthalmologist',
                userRole: 'doctor',
                userImg: 'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7525866/hijab-doctor-clipart-md.png',
                patientId: 2,
                patientName: 'Yusuf Tajudeen',
                patientPhoneNumber: '07054908745',
                patientNextOfKinName: 'Zainab Tiamiyu',
                patientNextOfKinPhone: '08054125690',
                patientNextOfKinRelationship: 'wife',
                patientAddress: '18, Ajanlekoko street, Lagos.',
                patientDob: '12/11/1998',
                patientGender: 'male'
            },
        ]
    };

    return data;
}

const ActionButtons = ({ scan }) => {
    const navigate = useNavigate();

    function viewScan(e) {
        e.preventDefault();

        const scanId = e.currentTarget.getAttribute('data-scan-id');
        navigate(`/admin/scans/${scanId}`);
    }

    return (
        <div className="py-2 px-6 flex items-center justify-center gap-1">
            <button onClick={viewScan} data-scan-id={scan.scanId} className='bg-purple-500 hover:bg-purple-600 p-1 rounded-md'>
                <IoEyeOutline size={20} color='white' />
            </button>

            <Link to={scan.scanUrl} className='bg-green-500 hover:bg-green-600 p-1 rounded-md'>
                <MdOutlineFileDownload size={20} color='white' />
            </Link>
        </div>
    )
}

const UserView = () => {
    const user = useLoaderData();
    const navigate = useNavigate();

    const columns = [
        { id: 'S/N', header: 'S/N' },
        { id: 'patientName', header: 'Patient' },
        { id: 'userName', header: 'Doctor' },
        { id: 'scanType', header: 'Type' },
        { id: 'scanDiagnosis', header: 'Diagnosis' },
        { id: 'scanDate', header: 'Date' },
        { id: 'actions', header: '' },
    ];

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

            {
                user.error ?
                    <h1>{user.error}</h1> :

                    <div className="flex flex-col">
                        <div className="mb-4 flex justify-center sm:justify-start">
                            {
                                user.img ?
                                    <img src={user.img} className='w-32 rounded-full' alt={`${user.firstName} ${user.lastName}`} />
                                    :
                                    <HiUserCircle className='rounded-full text-primary' size={150} />
                            }
                        </div>

                        <div className="flex flex-col xl:flex-row xl:gap-6">
                            <div className="order-2">
                                {
                                    user.scans?.length === 0 ?
                                        <EmptySearch headers={['Patient', 'Type', 'Diagnosis', 'Date', 'Download']} type='scans' />
                                        :
                                        <Table data={user.scans} columns={columns} render={scan => (
                                            <ActionButtons scan={scan} />
                                        )} />
                                }
                            </div>

                            <fieldset className="w-full border-2 border-gray-300 rounded-md px-6 py-4 mb-4 grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 gap-3">
                                <legend className='font-semibold text-primary px-1'>User Details</legend>

                                <div className="">
                                    <h4 className="block text-base font-semibold text-[#07074D]">
                                        First Name
                                    </h4>
                                    <p className="w-full text-base font-medium text-[#6B7280]">
                                        {
                                            user.firstName ? user.firstName : 'N/A'
                                        }
                                    </p>
                                </div>
                                <div className="">
                                    <h4 className="block text-base font-semibold text-[#07074D]">
                                        Last Name
                                    </h4>
                                    <p className="w-full text-base font-medium text-[#6B7280]">
                                        {
                                            user.lastName ? user.lastName : 'N/A'
                                        }
                                    </p>
                                </div>
                                <div className="">
                                    <h4 className="block text-base font-semibold text-[#07074D]">
                                        Email
                                    </h4>
                                    <p className="w-full text-base font-medium text-[#6B7280]">
                                        {
                                            user.email ? user.email : 'N/A'
                                        }
                                    </p>
                                </div>
                                <div className="">
                                    <h4 className=" block text-base font-semibold text-[#07074D]">
                                        Specialty
                                    </h4>
                                    <p className="w-full text-base font-medium text-[#6B7280]">
                                        {
                                            user.speciality ? user.speciality : 'N/A'
                                        }
                                    </p>
                                </div>
                                <div className="">
                                    <h4 className=" block text-base font-semibold text-[#07074D]">
                                        Role
                                    </h4>
                                    <p className="w-full text-base font-medium text-[#6B7280]">
                                        {
                                            user.role ? user.role : 'N/A'
                                        }
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
            }
        </div>
    )
}

export default UserView;