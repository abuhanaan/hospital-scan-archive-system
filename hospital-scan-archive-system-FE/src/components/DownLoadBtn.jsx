import { MdOutlineFileDownload } from "react-icons/md";
import { CSVLink } from 'react-csv';

const DownLoadBtn = ({ children, data = [], fileName }) => {
    return (
        <CSVLink
            data={data}
            filename={fileName}
            className="flex items-center gap-1 py-3 px-4 rounded-md bg-[#477BFF] text-white"
            target="_blank"
        >
            <MdOutlineFileDownload size={24} />
            {children}
        </CSVLink>
    )
}

export default DownLoadBtn;