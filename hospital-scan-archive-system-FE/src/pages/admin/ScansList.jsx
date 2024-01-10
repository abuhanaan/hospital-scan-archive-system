import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoSearch, IoEyeOutline } from "react-icons/io5";
import { scans } from '../../constants';

import AddButton from '../../components/AddButton';
import Table from '../../components/Table';
import { requireAuth } from '../../utils';
import { getScans } from '../../api';

export async function loader({ request }) {
    await requireAuth(request);

    const data = await getScans(request);

    if (data.message || data.error) {
        return {
            error: data.error ?? data.message
        };
    }

    return data;
}

const ActionButtons = ({ scan }) => {
    const navigate = useNavigate();

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
        <div className="py-2 px-6 flex items-center justify-center gap-1">
            <button onClick={viewScan} data-scan-id={scan.id} className='bg-purple-500 hover:bg-purple-600 p-1 rounded-md'>
                <IoEyeOutline size={20} color='white' />
            </button>

            <Link to={scan.url} className='bg-green-500 hover:bg-green-600 p-1 rounded-md'>
                <MdOutlineFileDownload size={20} color='white' />
            </Link>

            <Link to={`create-scan`} state={{ currentScan: scan }} className="py-1 px-1 rounded-md bg-blue-600 hover:bg-blue-700"><MdOutlineEdit size={20} color='white' /></Link>

            <button onClick={deleteScan} data-scan-id={scan.id} className="py-1 px-1 rounded-md bg-red-600 hover:bg-red-700"><MdDeleteOutline size={20} color='white' /></button>
        </div>
    )
}

const ScansList = () => {
    const navigate = useNavigate();
    const scans = useLoaderData();
    console.log(scans);

    const columns = [
        { id: 'S/N', header: 'S/N' },
        { id: 'patientId', header: 'Patient' },
        { id: 'doctorId', header: 'Doctor' },
        { id: 'type', header: 'Type' },
        { id: 'diagnosis', header: 'Diagnosis' },
        { id: 'createdAt', header: 'Date' },
        { id: 'actions', header: '' },
    ];

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

            {
                scans.error ?
                    <h1>{scans.error}</h1> :
                    <div className="h-full overflow-auto w-full">
                        {
                            scans?.length === 0 ?
                                <EmptySearch headers={['Patient', 'Doctor', 'Symptoms', 'Diagnosis', 'Date', 'Scan Link']} />
                                :
                                <Table data={scans} columns={columns} render={scan => (
                                    <ActionButtons scan={scan} />
                                )} />
                        }
                    </div>
            }
        </div>
    )
}

export default ScansList;