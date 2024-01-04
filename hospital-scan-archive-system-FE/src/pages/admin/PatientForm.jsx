import React from 'react';
import { Link } from 'react-router-dom';

const PatientForm = () => {
    return (
        <div className="flex flex-col pt-6 font-poppins">
            <div className="pb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/admin" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Dashboard</Link></li>
                        <li><Link to="/admin/users" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Patients</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Patient Form</li>
                    </ol>
                </nav>

                <h1 className="font-bold text-primary text-2xl leading-tight mt-6">Create Patient</h1>
            </div>

            <div className="mx-auto w-full">
                <form>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <div className="mb-5">
                                <label
                                    htmlFor='fName'
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="fName"
                                    id="fName"
                                    placeholder="First Name"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <div className="mb-5">
                                <label
                                    htmlFor="lName"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lName"
                                    id="lName"
                                    placeholder="Last Name"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <div className="mb-5">
                                <label
                                    htmlFor='phoneNumber'
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="08064590912"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <div className="mb-5">
                                <label
                                    htmlFor='dob'
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    id="dob"
                                    placeholder="Date"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />

                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <div className="mb-5">
                                <label
                                    htmlFor="gender"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Gender
                                </label>
                                <select name="gender" id="gender" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                    <option value="">--Select an option--</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <div className="mb-5">
                                <label
                                    htmlFor="address"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Address
                                </label>
                                <textarea name="address" id="address" placeholder='Address' className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md h-[56px]"></textarea>
                            </div>
                        </div>
                    </div>
                    <fieldset className='border-2 border-gray-300 rounded-md px-6 py-4 mb-4'>
                        <legend className='font-semibold text-primary px-1'>Next of Kin</legend>

                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <div className="mb-5">
                                    <label
                                        htmlFor="nextOfKin"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="nextOfKin"
                                        id="nextOfKin"
                                        placeholder="Next of Kin"
                                        className="w-full rounded-s-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <div className="mb-5">
                                    <label
                                        htmlFor="nextOfKinRelationship"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        Relationship
                                    </label>
                                    <input
                                        type="text"
                                        name="nextOfKinRelationship"
                                        id="nextOfKinRelationship"
                                        placeholder="Next of Kin Relationship"
                                        className="w-full rounded-s-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <div className="mb-5">
                                    <label
                                        htmlFor="nextOfKinPhone"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="nextOfKinPhone"
                                        id="nextOfKinPhone"
                                        placeholder="Next of Kin Phone Number"
                                        className="w-full rounded-s-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>

                        </div>
                    </fieldset>

                    <div className='flex justify-end'>
                        <button
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Create Patient
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PatientForm;