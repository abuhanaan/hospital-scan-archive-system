import React from 'react';

const UserForm = () => {
    return (
        <div className="flex flex-col pt-6 font-poppins">
            <div class="pb-6">
                <nav aria-label="breadcrumb">
                    <ol class="flex space-x-2">
                        <li><a href="#" class="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Dashboard</a></li>
                        <li><a href="#" class="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Users</a></li>
                        <li class="text-purple-700 font-medium" aria-current="page">User Form</li>
                    </ol>
                </nav>

                <h1 class="font-bold text-primary text-2xl leading-tight mt-6">Create User</h1>
            </div>

            <div className="mx-auto w-full max-w-[850px]">
                <form>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
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
                        <div className="w-full px-3 sm:w-1/2">
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
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor='specialty'
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Specialty
                                </label>
                                <input
                                    type="text"
                                    name="specialty"
                                    id="specialty"
                                    placeholder="Specialty"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="role"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Role
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    id="role"
                                    placeholder="Role"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor='email'
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />

                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="password"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Password
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className="w-full rounded-s-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    <button
                                        className="hover:shadow-form rounded-e-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="profileImage"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    name="profileImage"
                                    id="profileImage"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="date"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserForm;