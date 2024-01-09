import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { EmptySearch } from '../../components/EmptySearch';
import { requireAuth } from '../../utils';
import { getPatient } from '../../api';
import Table from '../../components/Table';

export async function loader({ params, request }) {
    await requireAuth(request);

    const patient = await getPatient(params.id, request);

    if (patient.error || patient.message) {
        return {
            error: patient.message ?? patient.error
        }
    }

    const data = {
        ...patient,
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

const PatientView = () => {
    const navigate = useNavigate();
    const patient = useLoaderData();

    const columns = [
        { id: 'S/N', header: 'S/N' },
        { id: 'userName', header: 'Doctor' },
        { id: 'scanType', header: 'Type' },
        { id: 'scanDiagnosis', header: 'Diagnosis' },
        { id: 'scanDate', header: 'Date' },
        { id: 'actions', header: '' },
    ];

    function deletePatient(e) {
        e.preventDefault();

        const patientId = e.currentTarget.getAttribute('data-patient-id');
        console.log('PatientId:', patientId);
    }

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="mb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/admin" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Dashboard</Link></li>
                        <li><Link to="/admin/patients" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Patients</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Patient</li>
                    </ol>
                </nav>

                <div className="flex justify-between items-center w-full mt-6">
                    <h1 className="font-bold text-primary text-2xl leading-tight">Patient</h1>
                    <div className="flex items-center gap-2">
                        <Link to={`/admin/patients/create-patient`} state={{ currentPatient: patient }} className="text-grey-lighter py-2 px-2 rounded-md bg-blue-600 hover:bg-blue-700"><MdOutlineEdit size={22} color='white' /></Link>

                        <button onClick={deletePatient} data-patient-id={patient.id} className="text-grey-lighter py-2 px-2 rounded-md bg-red-600 hover:bg-red-700"><MdDeleteOutline size={22} color='white' /></button>
                    </div>
                </div>
            </div>

            {
                patient.error ?
                    <h1>{patient.error}</h1> :
                    <div className="flex flex-col xl:flex-row">
                        <div className="order-2">
                            {
                                patient.scans?.length === 0 ?
                                    <EmptySearch headers={['Doctor', 'Type', 'Diagnosis', 'Date', 'Download']} type='scans' />
                                    :
                                    <Table data={patient.scans} columns={columns} render={scan => (
                                        <ActionButtons scan={scan} />
                                    )} />
                            }
                        </div>

                        <fieldset className="w-full border-2 border-gray-300 rounded-md px-6 py-4 mb-4 grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 gap-3">
                            <legend className='font-semibold text-primary px-1'>Patient Details</legend>
                            <div className="">
                                <h4 className="block text-base font-semibold text-[#07074D]">
                                    First Name
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {patient.firstName}
                                </p>
                            </div>
                            <div className="">
                                <h4 className="block text-base font-semibold text-[#07074D]">
                                    Last Name
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {patient.lastName}
                                </p>
                            </div>
                            <div className="">
                                <h4 className="block text-base font-semibold text-[#07074D]">
                                    Phone Number
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {patient.phoneNumber}
                                </p>
                            </div>
                            <div className="">
                                <h4 className=" block text-base font-semibold text-[#07074D]">
                                    Date of Birth
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {new Date(patient.dob).toDateString()}
                                </p>
                            </div>
                            <div className="">
                                <h4 className=" block text-base font-semibold text-[#07074D]">
                                    Age
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {
                                        new Date().getFullYear() - new Date(patient.dob).getFullYear()
                                    }
                                </p>
                            </div>
                            <div className="">
                                <h4 className=" block text-base font-semibold text-[#07074D]">
                                    Gender
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {
                                        patient.gender ?
                                            patient.gender :
                                            'N/A'
                                    }
                                </p>
                            </div>
                            <div className="">
                                <h4 className=" block text-base font-semibold text-[#07074D]">
                                    Address
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {patient.address}
                                </p>
                            </div>
                            <div className="">
                                <h4 className=" block text-base font-semibold text-[#07074D]">
                                    Total Scans
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {patient.scans?.length}
                                </p>
                            </div>
                        </fieldset>
                        <fieldset className='border-2 border-gray-300 rounded-md px-6 py-4 mb-4 grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 gap-3'>
                            <legend className='font-semibold text-primary px-1'>Next of Kin Details</legend>
                            <div className="">
                                <h4 className=" block text-base font-semibold text-[#07074D]">
                                    Name
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {patient.nextOfKinName}
                                </p>
                            </div>
                            <div className="">
                                <h4 className=" block text-base font-semibold text-[#07074D]">
                                    Relationship
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {patient.nextOfKinRelationship}
                                </p>
                            </div>
                            <div className="">
                                <h4 className=" block text-base font-semibold text-[#07074D]">
                                    Phone Number
                                </h4>
                                <p className="w-full text-base font-medium text-[#6B7280]">
                                    {patient.nextOfKinPhone}
                                </p>
                            </div>
                        </fieldset>
                    </div>
            }
        </div>
    )
}

export default PatientView;