import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { scans, patients } from '../../constants';
import { EmptySearch } from '../../components/EmptySearch';

import { IoSearch } from 'react-icons/io5';
import Table from '../../components/Table';

export async function loader({ params }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const patient = patients.filter(patient => patient.id === Number(params.id));
    const patientScans = scans.filter(scan => scan.patientId === Number(params.id) && scan.userId === user.id);
    // console.log(scans);
    const data = {
        ...patient[0],
        patientName: `${patient[0].firstName} ${patient[0].lastName}`,
        scans: patientScans
    };
    // const data = user.role === 'doctor' ?
    //     {
    //         ...patient[0],
    //         scans: patientScans
    //     } :
    //     {
    //         ...patient[0]
    //     };

    // console.log(data);
    return data;
}

const ActionButtons = ({ scan }) => {
    const navigate = useNavigate();

    function viewScan(e) {
        e.preventDefault();

        const scanId = e.currentTarget.getAttribute('data-scan-id');
        navigate(`/user/scans/${scanId}`);
    }

    return (
        <div className="py-2 px-6 flex items-center justify-center gap-1">
            <button onClick={viewScan} data-scan-id={scan.scanId} className='bg-purple-500 hover:bg-purple-600 p-1 rounded-md'>
                <IoEyeOutline size={20} color='white' />
            </button>

            <Link to={scan.scanUrl} className='bg-blue-500 hover:bg-blue-600 p-1 rounded-md'>
                <MdOutlineFileDownload size={20} color='white' />
            </Link>
        </div>
    )
}

const PatientView = () => {
    const navigate = useNavigate();
    // const patient = useLoaderData();
    const patient = {
        id: 1,
        firstName: 'Sandra',
        lastName: 'Grace',
        phoneNumber: '08078903425',
        address: '18, Ajanlekoko street, Lagos.',
        dob: '12/11/1998',
        gender: 'female',
        nextOfKinName: 'Aliyu Rasheed',
        nextOfKinRelationship: 'husband',
        nextOfKinPhone: '08054125690',
        scans: [
            {
                scanId: '3',
                scanSymptoms: 'Chest pains',
                scanDiagnosis: 'Pregnancy',
                scanType: 'Ultrasound',
                scanDate: '8/10/2023',
                scanUrl: 'https://chest-pain-sandra.zip',
                userId: 1,
                userName: 'Sodiq Ishola',
                userEmail: 'example123@gmail.com',
                userSpecialty: 'Gynaecologist',
                userRole: 'doctor',
                userImg: 'https://p7.hiclipart.com/preview/14/65/239/ico-avatar-scalable-vector-graphics-icon-doctor-with-stethoscope.jpg',
                patientId: 1,
                patientName: 'Sandra Grace',
                patientPhoneNumber: '08078903425',
                patientNextOfKinName: 'Aliyu Rasheed',
                patientNextOfKinPhone: '08054321490',
                patientNextOfKinRelationship: 'husband',
                patientAddress: '18, Ajanlekoko street, Lagos.',
                patientDob: '12/11/1990',
                patientGender: 'female'
            }
        ]
    }

    const columns = [
        { id: 'S/N', header: 'S/N' },
        { id: 'patientName', header: 'Patient' },
        { id: 'scanType', header: 'Type' },
        { id: 'scanDiagnosis', header: 'Diagnosis' },
        { id: 'scanDate', header: 'Date' },
        { id: 'actions', header: '' },
    ];

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="mb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/user" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Home</Link></li>
                        <li><Link to="/user/patients" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Patients</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Patient</li>
                    </ol>
                </nav>

                <div className="flex justify-between items-center w-full mt-6">
                    <h1 className="font-bold text-primary text-2xl leading-tight">Patient</h1>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row">
                <div className="order-2">
                    <h3 className="text-xl text-primary font-semibold">Scans</h3>
                    {
                        patient.scans.length === 0 ?
                            <EmptySearch headers={['Patient', 'Scan Type', 'Diagnosis', 'Date', 'Scan Link']} type='scans' />
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
                            {patient.dob}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Gender
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {patient.gender}
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
                            {
                                patient.scans ? patient.scans.length : 0
                            }
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
        </div>
    )
}

export default PatientView;