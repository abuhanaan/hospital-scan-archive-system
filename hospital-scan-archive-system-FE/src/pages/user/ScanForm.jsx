import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

export async function loader() {
    const user = JSON.parse(localStorage.getItem('user'));

    return user;
}

const ScanForm = () => {
    const user = useLoaderData();
    
    return (
        <div className="flex flex-col pt-6 font-poppins">
            <div className="pb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/admin" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Home</Link></li>
                        <li><Link to="/admin/users" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Patients</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Scan Form</li>
                    </ol>
                </nav>

                <h1 className="font-bold text-primary text-2xl leading-tight mt-6">Upload Scan</h1>
            </div>

            <div className="mx-auto w-full">
                <form>
                    <div className="grid grid-cols-1 xs:grid-cols-2  gap-x-3 gap-y-6">
                        <div className="">
                            <label
                                htmlFor='patientId'
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Patient ID
                            </label>
                            <input
                                type="text"
                                name="patientId"
                                id="patientId"
                                placeholder="Patient ID"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        {
                            user.role !== 'doctor' &&
                            <div className="">
                                <label
                                    htmlFor="userId"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Doctor ID
                                </label>
                                <input
                                    type="text"
                                    name="userId"
                                    id="userId"
                                    placeholder="Doctor ID"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        }
                        <div className="">
                            <label
                                htmlFor='symptoms'
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Symptoms
                            </label>
                            <input
                                type="text"
                                name="symptoms"
                                id="symptoms"
                                placeholder="Symptoms"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor='diagnosis'
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Diagnosis
                            </label>
                            <input
                                type="text"
                                name="diagnosis"
                                id="diagnosis"
                                placeholder="Diagnosis"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="file"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Scan <small>Compressed files only (.zip)</small>
                            </label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                placeholder="Next of Kin"
                                className="w-full rounded-s-md h-[50px] border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mt-3'>
                        <button
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Upload Scan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ScanForm;