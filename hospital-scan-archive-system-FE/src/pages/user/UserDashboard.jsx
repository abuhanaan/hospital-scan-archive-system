import Welcome from '../../components/Welcome';
import OverviewCard from "../../components/OverviewCard";
import DashboardTable from "../../components/DashboardTable";
import { doctorCardsInfo, scans } from '../../constants';
import { Link, useLoaderData } from "react-router-dom";
import { HiUser } from 'react-icons/hi';
import { MdOutlineEdit } from 'react-icons/md';

export async function loader() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userScans = scans.filter(scan => scan.userId === user.id);
    const cardsInfo = doctorCardsInfo;
    const data = [cardsInfo, userScans, user];

    return data;
}

const UserDashboard = () => {
    const [cardsData, scansData, user] = useLoaderData();

    const title = user.role === 'doctor' ? 'Dr.' : '';

    return (
        <section className="overflow-x-auto font-poppins">
            <Welcome person={`${title} ${user.firstName}`} />

            {
                user.role === 'doctor' ?
                    <>
                        <div className="grid grid-cols-1 gap-4 ss:grid-cols-2 sm:grid-cols-3 mt-6">
                            {
                                cardsData.map((data, index) => {

                                    return (
                                        <OverviewCard key={data.id} count={data.count} title={data.title} icon={data.icon} id={data.id} />
                                    )
                                })
                            }
                        </div>

                        <div className="flex flex-col xl:flex-row gap-8 mt-10">
                            <div className="overflow-y-auto flex-1 bg-white rounded-lg shadow-sm">
                                <h1 className="text-primary text-xl py-4 font-medium px-6 border-b-2 border-gray-200">Recent Scans</h1>
                                <DashboardTable data={scansData} />
                            </div>
                        </div>
                    </> :
                    <>
                        <div className="mb-10">
                            <div className="flex justify-between items-center w-full mt-6">
                                <h1 className="font-bold text-primary text-2xl leading-tight">Profile</h1>
                                <div className="flex items-center gap-2">
                                    <Link to={`/user/profile/update`} state={{ user }} className="text-grey-lighter py-2 px-2 rounded-md bg-blue-600 hover:bg-blue-700">
                                        <MdOutlineEdit size={22} color='white' />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-10">
                            <div className="flex justify-center">
                                {
                                    user.img ?
                                        <div className="w-40 h-40 border-primary border-2 rounded-full p-1">
                                            <img src={user.img} className='rounded-full' alt={`${user.firstName} ${user.lastName}`} />
                                        </div> :
                                        <HiUser size={200} color='#07074D' className='rounded-full border-primary border-2 p-3' />
                                }
                            </div>

                            <fieldset className="w-full border-2 border-gray-300 rounded-md px-6 py-4 grid grid-cols-1 ss:grid-cols-2 md:grid-cols-3 gap-3">
                                <legend className='font-semibold text-primary px-1'>User Details</legend>

                                <div className="">
                                    <h4 className="block text-base font-semibold text-[#07074D]">
                                        First Name
                                    </h4>
                                    <p className="w-full text-base font-medium text-[#6B7280]">
                                        {user.firstName}
                                    </p>
                                </div>
                                <div className="">
                                    <h4 className="block text-base font-semibold text-[#07074D]">
                                        Last Name
                                    </h4>
                                    <p className="w-full text-base font-medium text-[#6B7280]">
                                        {user.lastName}
                                    </p>
                                </div>
                                <div className="">
                                    <h4 className="block text-base font-semibold text-[#07074D]">
                                        Email
                                    </h4>
                                    <p className="w-full text-base font-medium text-[#6B7280]">
                                        {user.email}
                                    </p>
                                </div>
                                <div className="">
                                    <h4 className=" block text-base font-semibold text-[#07074D]">
                                        Specialty
                                    </h4>
                                    <p className="w-full text-base font-medium text-[#6B7280]">
                                        {user.specialty}
                                    </p>
                                </div>
                                <div className="">
                                    <h4 className=" block text-base font-semibold text-[#07074D]">
                                        Role
                                    </h4>
                                    <p className="w-full text-base font-medium text-[#6B7280] capitalize">
                                        {user.role}
                                    </p>
                                </div>
                            </fieldset>
                        </div>
                    </>
            }



        </section>
    )
}

export default UserDashboard;