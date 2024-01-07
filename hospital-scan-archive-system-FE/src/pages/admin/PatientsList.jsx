import { useRef, useState } from 'react';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { patients } from '../../constants';

import AddButton from '../../components/AddButton';
import Table from '../../components/Table';

export async function loader() {
    return patients;
}

const ActionButtons = ({ patient }) => {
    const navigate = useNavigate();
    
    function viewPatient(patientId) {
        navigate(`./${patientId}`);
    }

    function deletePatient(e) {
        e.preventDefault();

        const patientId = e.currentTarget.getAttribute('data-patient-id');
        console.log('PatientId:', patientId);
    }

    return (
        <div className="py-2 px-6 flex items-center justify-center gap-1">
            <button onClick={viewPatient} data-patient-id={patient.id} className='bg-purple-500 hover:bg-purple-600 p-1 rounded-md'><IoEyeOutline size={20} color='white' /></button>

            <Link to={`create-patient`} state={{ currentPatient: patient }} className="text-grey-lighter py-1 px-1 rounded-md bg-blue-600 hover:bg-blue-700"><MdOutlineEdit size={20} color='white' /></Link>

            <button onClick={deletePatient} data-patient-id={patient.id} className="text-grey-lighter py-1 px-1 rounded-md bg-red-600 hover:bg-red-700"><MdDeleteOutline size={20} color='white' /></button>
        </div>
    )
}

const PatientsList = () => {
    const patients = useLoaderData();

    const columns = [
        { id: 'S/N', header: 'S/N' },
        { id: 'firstName', header: 'firstName' },
        { id: 'lastName', header: 'lastName' },
        { id: 'phoneNumber', header: 'Phone Number' },
        { id: 'dob', header: 'Birth Date' },
        { id: 'address', header: 'Address' },
        { id: 'actions', header: '' },
    ];

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="pb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/admin" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Dashboard</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Patients</li>
                    </ol>
                </nav>

                <div className="flex justify-between items-center mb-6 w-full">
                    <h1 className="font-bold text-primary text-2xl leading-tight mt-6">Patients</h1>
                    <AddButton navigateTo={`create-patient`}>Add New</AddButton>
                </div>
            </div>

            <div className="h-full overflow-auto w-full">
                {
                    patients.length === 0 ?
                        <EmptySearch headers={['First Name', 'Last Name', 'Age', 'Phone NUmber', 'Next of Kin', 'Address']} type='patients' />
                        :
                        <Table data={patients} columns={columns} render={(patient) => (
                            <ActionButtons patient={patient} />
                        )} />
                }
            </div>
        </div>
    )
}

export default PatientsList;