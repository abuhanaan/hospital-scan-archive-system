import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoSearch, IoEyeOutline } from "react-icons/io5";
import { scans } from '../../constants';

import AddButton from '../../components/AddButton';

export async function loader() {
    const data = [...scans];
    return data;
}

const ScansList = () => {
    const navigate = useNavigate();
    const scansData = useLoaderData();

    function viewScan(e) {
        e.preventDefault();

        const scanId = e.currentTarget.getAttribute('data-scan-id');
        navigate(`./${scanId}`);
    }

    function deleteScan(e) {
        e.preventDefault();

        const scanId = e.currentTarget.getAttribute('data-scan-id');
        console.log('ScanId:', scanId);
    }

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="mb-10">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/admin" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Dashboard</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Scans</li>
                    </ol>
                </nav>

                <div className="flex justify-between items-center w-full">
                    <h1 className="font-bold text-primary text-2xl leading-tight mt-6">Scans</h1>
                    <AddButton navigateTo={`create-scan`}>Add New</AddButton>
                </div>
            </div>

            <div className="h-full overflow-auto w-full">
                {
                    scansData?.length === 0 ?
                        <EmptySearch headers={['ScanId', 'Doctor', 'Symptoms', 'Diagnosis', 'Date', 'Scan Link']} />
                        :
                        <div className="flex flex-col">
                            <div className="mb-4 md:flex md:items-center md:justify-between">
                                <div className="relative flex items-center mt-4 md:mt-0">
                                    <span className="absolute w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                                        <IoSearch size={18} />
                                    </span>

                                    <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                            </div>

                            <div className="overflow-auto">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr className="">
                                            <th scope="col" className="th">
                                                Scan Id
                                            </th>
                                            <th scope="col" className="th">
                                                Patient
                                            </th>
                                            <th scope="col" className="th">
                                                Doctor
                                            </th>
                                            <th scope="col" className="th">
                                                Type
                                            </th>
                                            <th scope="col" className="th">
                                                Diagnosis
                                            </th>
                                            <th scope="col" className="th">
                                                Date
                                            </th>
                                            <th scope="col" className="th">
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {
                                            scansData.map(scan => (
                                                <tr key={scan.scanId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <td className="table-data">{scan.scanId}</td>
                                                    <td className="table-data">{scan.patientName}</td>
                                                    <td className="table-data">{scan.userName}</td>
                                                    <td className="table-data">{scan.scanType}</td>
                                                    <td className="table-data">{scan.scanDiagnosis}</td>
                                                    <td className="table-data">{scan.scanDate}</td>
                                                    <td className="py-4 px-6 whitespace-nowrap flex items-center justify-center gap-1">
                                                        <button onClick={viewScan} data-scan-id={scan.scanId} className='bg-purple-500 hover:bg-purple-600 p-1 rounded-md'>
                                                            <IoEyeOutline size={20} color='white' />
                                                        </button>

                                                        <Link to={scan.scanUrl} className='bg-green-500 hover:bg-green-600 p-1 rounded-md'>
                                                            <MdOutlineFileDownload size={20} color='white' />
                                                        </Link>

                                                        <Link to={`create-scan`} state={{currentScan: scan}} className="py-1 px-1 rounded-md bg-blue-600 hover:bg-blue-700"><MdOutlineEdit size={20} color='white' /></Link>

                                                        <button onClick={deleteScan} data-scan-id={scan.scanId} className="py-1 px-1 rounded-md bg-red-600 hover:bg-red-700"><MdDeleteOutline size={20} color='white' /></button>
                                                    </td>
                                                </tr>

                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Page <span className="font-medium text-gray-700 dark:text-gray-100">1 of 10</span>
                                </div>

                                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                                    <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                        <FaArrowLeftLong size={18} />
                                        <span>
                                            previous
                                        </span>
                                    </a>

                                    <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                        <span>
                                            Next
                                        </span>
                                        <FaArrowRightLong size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default ScansList;