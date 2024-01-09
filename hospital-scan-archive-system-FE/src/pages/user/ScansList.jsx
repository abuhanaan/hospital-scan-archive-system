import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoSearch, IoEyeOutline } from "react-icons/io5";
import { scans } from '../../constants';
import { EmptySearch } from '../../components/EmptySearch';
import AddButton from '../../components/AddButton';
import Table from '../../components/Table';

export async function loader() {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = scans.filter(scan => scan.userId === user.id);
    return data;
}

const ActionButtons = ({ scan }) => {
    const navigate = useNavigate();

    function viewScan(e) {
        e.preventDefault();

        const scanId = e.currentTarget.getAttribute('data-scan-id');
        navigate(`./${scanId}`);
    }

    return (
        <div className="py-2 px-6 flex items-center justify-center gap-1">
            <button onClick={viewScan} data-scan-id={scan.scanId} className='bg-purple-500 hover:bg-purple-600 p-1 rounded-md'>
                <IoEyeOutline size={20} color='white' />
            </button>

            <Link to={scan.scanUrl} className='bg-green-500 hover:bg-green-600 p-1 rounded-md'>
                <MdOutlineFileDownload size={20} color='white' />
            </Link>
        </div>
    )
}

const ScansList = () => {
    const navigate = useNavigate();
    const scansData = useLoaderData();

    const columns = [
        { id: 'S/N', header: 'S/N' },
        { id: 'patientName', header: 'Patient' },
        { id: 'userName', header: 'Doctor' },
        { id: 'scanType', header: 'Type' },
        { id: 'scanDiagnosis', header: 'Diagnosis' },
        { id: 'scanDate', header: 'Date' },
        { id: 'actions', header: '' },
    ];

    function viewScan(e) {
        e.preventDefault();

        const scanId = e.currentTarget.getAttribute('data-scan-id');
        navigate(`./${scanId}`);
    }

    return (
        <div className="mt-6 min-h-screen w-full font-poppins">
            <div className="mb-10">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/user" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Home</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Scans</li>
                    </ol>
                </nav>
            </div>

            <div className="flex justify-between items-center mb-6 w-full">
                <h1 className="font-bold text-primary text-2xl leading-tight mt-6">Scans</h1>
                <AddButton navigateTo={`create-scan`}>Add New</AddButton>
            </div>

            <div className="h-full overflow-auto w-full">
                {
                    scansData?.length === 0 ?
                        <EmptySearch headers={['ScanId', 'Patient', 'Type', 'Diagnosis', 'Date', 'Scan Link']} type='scans' />
                        :
                        <Table data={scansData} columns={columns} render={scan => (
                            <ActionButtons scan={scan} />
                        )} />
                }
            </div>
        </div>
    )
}

export default ScansList;