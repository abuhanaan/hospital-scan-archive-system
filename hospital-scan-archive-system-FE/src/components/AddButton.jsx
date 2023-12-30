import { HiOutlinePlus } from "react-icons/hi";

function AddButton({children}) {
    return (
        <button className="bg-[#477BFF] text-white">
            <HiOutlinePlus size={20} className="stroke-2" />
            {children}
        </button>
    )
}

export default AddButton;