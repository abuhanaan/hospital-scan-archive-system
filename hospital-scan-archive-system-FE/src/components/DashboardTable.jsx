import { Link, useNavigate } from "react-router-dom";

const DashboardTable = () => {
    const navigate = useNavigate();
    const scans = [
        { id: 1, patientName: 'Zainab Salihu', specialistName: 'Halima Musa', diagnosis: 'Pregnancy', date: '12/12/2023', downloadUrl: 'zainab-salihu-pregnancy.zip' },
        { id: 2, patientName: 'Ibrahim Salis', specialistName: 'Ishola Sodiq', diagnosis: 'Chest Pain', date: '12/12/2023', downloadUrl: 'ibrahim-salis-chest.zip' },
        { id: 3, patientName: 'Ibrahim Salis', specialistName: 'Ishola Sodiq', diagnosis: 'Chest Pain', date: '12/12/2023', downloadUrl: 'ibrahim-salis-chest.zip' },
        { id: 4, patientName: 'Ibrahim Salis', specialistName: 'Ishola Sodiq', diagnosis: 'Chest Pain', date: '12/12/2023', downloadUrl: 'ibrahim-salis-chest.zip' },
    ];

    function viewScan(scanId) {
        navigate(`scans/${scanId}`);
    }

    return (
        <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="">
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">
                            Patient Name
                        </th>
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">
                            Specialist Name
                        </th>
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">
                            Diagnosis
                        </th>
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">
                            Scan Date
                        </th>
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">
                            Download Link
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {
                        scans.map(scan => (
                            <tr key={scan.id} onClick={() => viewScan(scan.id)} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <td className="table-data">{scan.patientName}</td>
                                <td className="table-data">{`Dr. ${scan.specialistName}`}</td>
                                <td className="table-data">{scan.diagnosis}</td>
                                <td className="table-data">{scan.date}</td>
                                <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                                    <Link to="#" className="text-blue-600 dark:text-blue-500 hover:underline">{scan.downloadUrl}</Link>
                                </td>
                            </tr>

                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default DashboardTable;