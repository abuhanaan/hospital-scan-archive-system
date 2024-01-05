import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineSyncLock } from "react-icons/md";

const UserForm = () => {
    const { state } = useLocation();
    const user = state && state.currentUser;
    const [formData, setFormData] = useState(user || {
        id: user?.id || '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        specialty: '',
        img: '',
    });
    const [image, setImage] = useState(null);
    const fileRef = useRef(null);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        const elementValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: elementValue
        }));
    }

    function browseImage(e) {
        e.preventDefault();

        fileRef.current?.click();
    }

    function handleImageSelect(e) {
        e.preventDefault();

        const file = e.target.files[0];

        if (file) {
            setImage(file);
        }

    }

    function generatePassword(e) {
        e.preventDefault();

        if (formData.email) {
            setFormData(prev => ({
                ...prev,
                password: formData.email.slice(0, 6)
            }));
        }
    }

    return (
        <div className="flex flex-col pt-6 font-poppins">
            <div className="pb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/admin" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Dashboard</Link></li>
                        <li><Link to="/admin/users" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Users</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">User Form</li>
                    </ol>
                </nav>

                <h1 className="font-bold text-primary text-2xl leading-tight mt-6">{state ? 'Update' : 'Create'} User</h1>
            </div>

            <div className="mx-auto w-full">
                <form>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
                        <div className="">
                            <label
                                htmlFor='email'
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Email <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                required
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="password"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Password <span className="text-red-600">*</span>
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full rounded-s-md border border-[#e0e0e0] bg-gray-200 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                    readOnly
                                />
                                <button
                                    onClick={generatePassword}
                                    className="hover:shadow-form rounded-e-md bg-[#6A64F1] hover:bg-[#5f58f1] py-3 px-4 text-center text-base font-semibold text-white outline-none"
                                >
                                    <MdOutlineSyncLock size={22} color='white' />
                                </button>
                            </div>
                        </div>
                        <div className="">
                            <label
                                htmlFor="role"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Role <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="role"
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="Role"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                required
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor='firstName'
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="lastName"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor='specialty'
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Specialty
                            </label>
                            <input
                                type="text"
                                name="specialty"
                                id="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                                placeholder="Specialty"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="profileImage"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Profile Image
                            </label>
                            <input
                                type="file"
                                name="profileImage"
                                id="profileImage"
                                accept='image/*'
                                onChange={handleImageSelect}
                                ref={fileRef}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md hidden"
                            />
                            <div className="flex items-end gap-4">
                                <button onClick={browseImage} className="hover:shadow-form rounded-md bg-[#6A64F1] hover:bg-[#5f58f1] py-3 px-8 text-center text-base font-semibold text-white outline-none">{image ? 'Change Image' : 'Browse Image'}</button>
                                <p className="font-poppins font-medium text-lg">{image ? image.name : 'No files chosen'}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        {
                            state ?
                                <button className="hover:shadow-form rounded-md bg-[#6A64F1] hover:bg-[#5f58f1] py-3 px-8 text-center text-base font-semibold text-white outline-none">Update User</button> :
                                <button className="hover:shadow-form rounded-md bg-[#6A64F1] hover:bg-[#5f58f1] py-3 px-8 text-center text-base font-semibold text-white outline-none">Create User</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserForm;