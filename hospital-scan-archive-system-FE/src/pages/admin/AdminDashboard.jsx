import Welcome from '../../components/Welcome';
import OverviewCard from "../../components/OverviewCard";
import DashboardTable from "../../components/DashboardTable";
import { FaUserDoctor, FaUserInjured, FaFileMedical, FaStethoscope } from "react-icons/fa6";
import { dashboardCardsInfo, scans, users } from '../../constants';
import { Link } from "react-router-dom";
import { EmptySearch } from '../../components/EmptySearch';

const AdminDashboard = () => {
    return (
        <section className="overflow-x-auto font-poppins">
            <Welcome />

            <div className="grid grid-cols-1 gap-4 ss:grid-cols-2 lg:grid-cols-4 mt-6">
                {
                    dashboardCardsInfo.map((data, index) => {

                        return (
                            <OverviewCard key={data.id} count={data.count} title={data.title} icon={data.icon} id={data.id} />
                        )
                    })
                }
            </div>

            <div className="flex flex-col xl:flex-row gap-8 mt-10">
                <div className="overflow-y-auto flex-1 bg-white rounded-lg shadow-sm">
                    <h1 className="text-primary text-xl py-4 font-medium px-6 border-b-2 border-gray-200">Recent Scans</h1>
                    <DashboardTable data={scans} />
                </div>

                <div className="flex flex-col flex-1 bg-white pb-4 shadow-xl rounded-md max-w-[440px]">
                    <h1 className="text-primary text-xl py-4 font-medium px-6 border-b-2 border-gray-200">Recent Users</h1>

                    <ul className="list-none">
                        {
                            users.length === 0 ?
                                <EmptySearch headers={[]} type='users' />
                                :
                                users.map(user => {
                                    const title = user.role === 'doctor' ? 'Dr. ' : '';
                                    return (
                                        <li key={user.id} className="py-3 px-6">
                                            <Link to={`users/${user.id}`} className="flex items-center gap-4">
                                                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
                                                    <img src={user.img} className='rounded-full' alt={`${title}${user.firstName} ${user.lastName}`} />

                                                </div>
                                                <div className="flex flex-col">
                                                    <h1 className="text-base font-medium text-primary">{`${title} ${user.firstName} ${user.lastName}`}</h1>
                                                    <p className="text-sm text-gray-800">{user.specialty}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard;