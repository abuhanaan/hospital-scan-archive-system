import { Outlet, Link } from 'react-router-dom';
import { HiUser } from 'react-icons/hi';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from 'react';
import SideNav from '../SideNav';

const AdminLayout = () => {
    const [showMenu, setShowMenu] = useState(false);

    function toggleMenu(e) {
        e.preventDefault();

        setShowMenu(prev => !prev);
    }

    return (
        <div className='flex flex-col min-h-screen md:flex-row md:overflow-hidden'>
            <div className='w-full flex-none md:w-64'>
                <SideNav />
            </div>

            <div className='flex-grow flex flex-col min-h-screen'>
                <div className="hidden md:flex md:justify-end items-center h-[64px]">
                    <div className="flex justify-end gap-6 w-full pr-5">
                        <div className='relative'>
                            <button onClick={toggleMenu} className="border border-blue-300 p-[2px] text-blue-500 rounded-full">
                                <HiUser size={24} />
                            </button>
                            <ul className={`${showMenu ? 'block' : 'hidden'} absolute right-0 top-10 mt-3 z-[1] shadow w-52 rounded-sm`}>
                                <li className='flex items-center gap-2 hover:bg-slate-400 hover:text-white px-2 py-1.5'>
                                    <BiSolidEdit size={20} />
                                    <Link href='#'>Change Password</Link>
                                </li>
                                <li className='flex items-center gap-2 hover:bg-slate-400 hover:text-white px-2 py-1.5'>
                                    <RiLogoutCircleRLine color='red' size={20} />
                                    <Link onClick={() => signOut()} href='#'>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='flex-1 overflow-y-auto p-6 md:pb-8 md:pt-4 bg-[#EDF2FF]'>
                    {Outlet}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;