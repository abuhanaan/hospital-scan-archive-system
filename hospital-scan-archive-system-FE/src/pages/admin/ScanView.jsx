import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { scans, patients } from '../../constants';
import { EmptySearch } from '../../components/EmptySearch';

import { IoSearch } from 'react-icons/io5';

export async function loader({ params }) {
    const scan = scans.filter(scan => scan.scanId === params.id);

    const data = {
        ...scan[0]
    };

    return data;
}

const ScanView = () => {
    const navigate = useNavigate();
    const scan = useLoaderData();

    function viewScan(e) {
        e.preventDefault();

        const scanId = e.currentTarget.getAttribute('data-scan-id');
        navigate(`/admin/scans/${scanId}`);
    }

    function deleteScan(e) {
        e.preventDefault();

        // const patientId = e.currentTarget.getAttribute('data-patient-id');
        console.log('ScanId:', scan.scanId);
    }

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="mb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/admin" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Dashboard</Link></li>
                        <li><Link to="/admin/scans" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Scans</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Scan</li>
                    </ol>
                </nav>

                <div className="flex justify-between items-center w-full mt-6">
                    <h1 className="font-bold text-primary text-2xl leading-tight">Scan</h1>
                    <div className="flex items-center gap-2">
                        <Link to={scan.scanUrl} className="py-2 px-2 rounded-md bg-blue-600 hover:bg-blue-700"><MdOutlineFileDownload size={22} color='white' /></Link>

                        <Link to={`/admin/scans/create-scan`} className="py-2 px-2 rounded-md bg-blue-600 hover:bg-blue-700"><MdOutlineEdit size={22} color='white' /></Link>

                        <button onClick={deleteScan} className="py-2 px-2 rounded-md bg-red-600 hover:bg-red-700"><MdDeleteOutline size={22} color='white' /></button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <fieldset className='border-2 border-gray-300 rounded-md px-6 py-4 mb-4 grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 gap-3'>
                    <legend className='font-semibold text-primary px-1'>User Details</legend>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Name
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.userName}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Email
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.userEmail}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Specialty
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.userSpecialty}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Role
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.userRole}
                        </p>
                    </div>
                </fieldset>
                <fieldset className="w-full border-2 border-gray-300 rounded-md px-6 py-4 mb-4 grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 gap-3">
                    <legend className='font-semibold text-primary px-1'>Patient Details</legend>
                    <div className="">
                        <h4 className="block text-base font-semibold text-[#07074D]">
                            Name
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.patientName}
                        </p>
                    </div>
                    <div className="">
                        <h4 className="block text-base font-semibold text-[#07074D]">
                            Gender
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.patientGender}
                        </p>
                    </div>
                    <div className="">
                        <h4 className="block text-base font-semibold text-[#07074D]">
                            Phone Number
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.patientPhoneNumber}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Date of Birth
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.patientDob}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Address
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.patientAddress}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Next of Kin Name
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.patientNextOfKinName}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Next of Kin Phone
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.patientNextOfKinPhone}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Next of Kin Relationship
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.patientNextOfKinRelationship}
                        </p>
                    </div>
                </fieldset>
                <fieldset className='border-2 border-gray-300 rounded-md px-6 py-4 mb-4 grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 gap-3'>
                    <legend className='font-semibold text-primary px-1'>Scan Details</legend>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Type
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.scanType}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Symptoms
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.scanSymptoms}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Diagnosis
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.scanDiagnosis}
                        </p>
                    </div>
                    <div className="">
                        <h4 className=" block text-base font-semibold text-[#07074D]">
                            Date
                        </h4>
                        <p className="w-full text-base font-medium text-[#6B7280]">
                            {scan.scanDate}
                        </p>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default ScanView;