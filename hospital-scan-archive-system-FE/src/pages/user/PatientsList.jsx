import { useRef, useState } from 'react';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { patients, scans } from '../../constants';
import { EmptySearch } from '../../components/EmptySearch';
import AddButton from '../../components/AddButton';
import Table from '../../components/Table';

export async function loader() {
    const user = JSON.parse(localStorage.getItem('user'));
    const allPatients = user.role === 'doctor' ?
        scans.filter(scan => scan.userId === user.id)
            .map(scan => ({
                id: scan.patientId,
                patientName: scan.patientName,
                firstName: scan.patientName.split(' ')[0],
                lastName: scan.patientName.split(' ')[1],
                dob: scan.patientDob,
                address: scan.patientAddress,
                gender: scan.patientGender,
                phoneNumber: scan.patientPhoneNumber,
                nextOfKinName: scan.patientNextOfKinName,
                nextOfKinPhone: scan.patientNextOfKinPhone,
                nextOfKinRelationship: scan.patientNextOfKinRelationship
            })) :
        patients
        ;

    // console.log(allPatients);

    return allPatients;
}

const ActionButtons = ({ patient }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    function viewPatient(e) {
        e.preventDefault();

        const patientId = e.currentTarget.getAttribute('data-patient-id');
        navigate(`./${patientId}`);
    }

    return (
        <div className="py-2 px-6 flex items-center justify-center gap-1">
            <button onClick={viewPatient} data-patient-id={patient.id} className='bg-purple-500 hover:bg-purple-600 p-1 rounded-md'>
                <IoEyeOutline size={20} color='white' />
            </button>
        </div>
    )
}

const PatientsList = () => {
    const navigate = useNavigate();
    const patients = useLoaderData();

    const columns = [
        { id: 'S/N', header: 'S/N' },
        { id: 'firstName', header: 'First Name' },
        { id: 'lastName', header: 'Last Name' },
        { id: 'phoneNumber', header: 'Phone' },
        { id: 'address', header: 'Address' },
        { id: 'dob', header: 'Birth Date' },
        { id: 'nextOfKinName', header: 'Next of Kin' },
        { id: 'actions', header: '' },
    ];

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="pb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/user" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Home</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Patients</li>
                    </ol>
                </nav>

                <div className="flex justify-between items-center mb-6 w-full">
                    <h1 className="font-bold text-primary text-2xl leading-tight mt-6">Patients</h1>
                </div>
            </div>

            <div className="h-full overflow-auto w-full">
                {
                    patients.length === 0 ?
                        <EmptySearch headers={['First Name', 'Last Name', 'Age', 'Phone NUmber', 'Next of Kin', 'Address']} type='patients' />
                        :
                        <Table data={patients} columns={columns} render={patient => (
                            <ActionButtons patient={patient} />
                        )} />
                }
            </div>
        </div>
    )
}

export default PatientsList;