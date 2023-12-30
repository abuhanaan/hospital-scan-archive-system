import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserDoctor } from "react-icons/fa6";
import AddButton from '../components/AddButton';

const DoctorsList = () => {
    const navigate = useNavigate();
    const doctors = [
        { id: 1, firstName: 'Sodiq', lastName: 'Ishola', email: 'example123@gmail.com', specialty: 'Gynaecologist', role: 'doctor', img: <FaUserDoctor size={32} /> },
        { id: 2, firstName: 'Hamzat', lastName: 'Turawa', email: 'example123@gmail.com', specialty: 'Neurologist', role: 'doctor', img: <FaUserDoctor size={32} /> },
        { id: 3, firstName: 'Halimah', lastName: 'Salis', email: 'example123@gmail.com', specialty: 'Opthalmologist', role: 'doctor', img: <FaUserDoctor size={32} /> },
        { id: 4, firstName: 'Zainab', lastName: 'Musa', email: 'example123@gmail.com', specialty: 'Dermatologist', role: 'doctor', img: <FaUserDoctor size={32} /> },
    ];

    function viewDoctor(scanId) {
        navigate(`scans/${scanId}`);
    }

    return (
        <div className="mt-6 min-h-screen w-full">
            <div className="flex justify-between items-center mb-6 w-full">
                <h1 className="text-[#15254C] text-2xl font-bold">Doctors List</h1>
                <AddButton>Add New</AddButton>
            </div>

            <div className="h-full overflow-auto w-full">
                {
                    doctors?.length === 0 ?
                        <EmptySearch headers={['Posts', 'Published']} />
                        :
                        <div className="overflow-auto">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr className="">
                                        <th scope="col" className="th">
                                            Image
                                        </th>
                                        <th scope="col" className="th">
                                            First Name
                                        </th>
                                        <th scope="col" className="th">
                                            Last Name
                                        </th>
                                        <th scope="col" className="th">
                                            Email
                                        </th>
                                        <th scope="col" className="th">
                                            Specialty
                                        </th>
                                        <th scope="col" className="th">
                                            Role
                                        </th>
                                        <th scope="col" className="th">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {
                                        doctors.map(doctor => (
                                            <tr key={doctor.id} onClick={() => viewDoctor(doctor.id)} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                                <td className="table-data">
                                                    {doctor.img}
                                                </td>
                                                <td className="table-data">{doctor.firstName}</td>
                                                <td className="table-data">{doctor.lastName}</td>
                                                <td className="table-data">{doctor.email}</td>
                                                <td className="table-data">{doctor.specialty}</td>
                                                <td className="table-data">{doctor.role}</td>
                                                <td className="py-4 px-6 text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1">
                                                    <button className="">+</button>
                                                    <button className="">-</button>
                                                    <button className="">/</button>
                                                </td>
                                            </tr>

                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                }
            </div>
        </div>
    )
}

export default DoctorsList;