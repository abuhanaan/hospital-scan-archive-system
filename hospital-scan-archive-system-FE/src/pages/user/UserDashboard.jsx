import Welcome from '../../components/Welcome';
import OverviewCard from "../../components/OverviewCard";
import DashboardTable from "../../components/DashboardTable";
import { doctorCardsInfo, scans, users } from '../../constants';
import { Link, useLoaderData } from "react-router-dom";
import { EmptySearch } from '../../components/EmptySearch';

export async function loader() {
    const userId = 1;
    const userScans = scans.filter(scan => scan.userId === userId);
    const cardsInfo = doctorCardsInfo;
    const data = [cardsInfo, userScans];

    return data;
}

const UserDashboard = () => {
    const [cardsData, scansData] = useLoaderData();

    return (
        <section className="overflow-x-auto font-poppins">
            <Welcome person={'Dr. Sodiq'} />

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
        </section>
    )
}

export default UserDashboard;