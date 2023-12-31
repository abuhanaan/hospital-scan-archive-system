import { HiOutlinePlus } from "react-icons/hi";

function AddButton({children}) {
    return (
        <button className=" flex items-center gap-1 py-3 px-4 rounded-md bg-[#477BFF] text-white">
            <HiOutlinePlus size={20} className="stroke-2" />
            {children}
        </button>
    )
}

export default AddButton;