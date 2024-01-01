import { Link, useNavigate } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";

const DashboardTable = ({ data }) => {
    const navigate = useNavigate();

    function viewScan(scanId) {
        navigate(`scans/${scanId}`);
    }

    return (
        <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="">
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">
                            Patient
                        </th>
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">
                            Specialist
                        </th>
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">
                            Scan Type
                        </th>
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">
                            Diagnosis
                        </th>
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">
                            Scan Date
                        </th>
                        <th scope="col" className="py-3 px-6 text-base font-medium tracking-wider text-left text-gray-700 capitalize dark:text-gray-400">

                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {
                        data.map(scan => (
                            <tr key={scan.scanId} onClick={() => viewScan(scan.scanId)} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <td className="table-data">{scan.patientName}</td>
                                <td className="table-data">{`Dr. ${scan.userName}`}</td>
                                <td className="table-data">{scan.scanType}</td>
                                <td className="table-data">{scan.scanDiagnosis}</td>
                                <td className="table-data">{scan.scanDate}</td>
                                <td className="py-4 px-6 font-medium flex items-center">
                                    <Link to={scan.scanUrl} className='bg-blue-500 hover:bg-blue-600 p-1 rounded-md'>
                                        <MdOutlineFileDownload size={20} color='white' />
                                    </Link>
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