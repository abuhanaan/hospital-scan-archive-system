import Welcome from "../components/Welcome";
import OverviewCard from "../components/OverviewCard";
import DashboardTable from "../components/DashboardTable";
import { FaUserDoctor, FaUserInjured, FaFileMedical, FaStethoscope } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const cardData = [
        { id: 'doctors', title: 'Total Doctors', count: 2, icon: <FaUserDoctor size={20} /> },
        { id: 'patients', title: 'Total Patients', count: 6, icon: <FaUserInjured size={20} /> },
        { id: 'scans', title: 'Total Scans', count: 10, icon: <FaFileMedical size={20} /> },
        { id: 'diagnosis', title: 'Total Diagnosis', count: 289, icon: <FaStethoscope size={20} /> },
    ];

    const doctors = [
        { id: 1, name: 'Sodiq Ishola', specialty: 'Gynaecologist', img: <FaUserDoctor size={32} /> },
        { id: 2, name: 'Hamzat Turawa', specialty: 'Neurologist', img: <FaUserDoctor size={32} /> },
        { id: 3, name: 'Halimah Salis', specialty: 'Opthalmologist', img: <FaUserDoctor size={32} /> },
        { id: 4, name: 'Zainab Musa', specialty: 'Dermatologist', img: <FaUserDoctor size={32} /> },
    ];

    return (
        <section className="overflow-x-auto font-poppins">
            <Welcome />

            <div className="grid grid-cols-1 gap-4 ss:grid-cols-2 lg:grid-cols-4 mt-6">
                {
                    cardData.map((data, index) => {

                        return (
                            <OverviewCard key={data.id} count={data.count} title={data.title} icon={data.icon} id={data.id} />
                        )
                    })
                }
            </div>

            <div className="flex flex-col xl:flex-row gap-8 mt-10">
                <div className="overflow-y-auto flex-1 bg-white rounded-lg shadow-sm">
                    <h1 className="text-primary text-2xl py-4 font-medium px-6 border-b-2 border-gray-200">Recent Scans</h1>
                    <DashboardTable />
                </div>

                <div className="flex flex-col flex-1 bg-white pb-4 shadow-xl rounded-md max-w-[440px]">
                    <h1 className="text-primary text-2xl py-4 font-medium px-6 border-b-2 border-gray-200">New Doctors</h1>

                    <ul className="list-none">
                        {
                            doctors.map(doctor => (
                                <li key={doctor.id} className="py-3 px-6">
                                    <Link to={`doctors/${doctor.id}`} className="flex items-center gap-4">
                                        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
                                            {doctor.img}
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-base font-medium text-primary">{`Dr. ${doctor.name}`}</h1>
                                            <p className="text-sm text-gray-800">{doctor.specialty}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard