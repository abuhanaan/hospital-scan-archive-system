import { Outlet, Link, useNavigate } from 'react-router-dom';
import { HiUser } from 'react-icons/hi';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from 'react';
import SideNav from '../SideNav';

const AdminLayout = () => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    function toggleMenu(e) {
        e.preventDefault();

        setShowMenu(prev => !prev);
    }

    function signOut() {
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <div className='flex flex-col min-h-screen md:flex-row md:overflow-hidden'>
            <div className='w-full flex-none md:w-64'>
                <SideNav />
            </div>

            <div className='flex-grow flex flex-col min-h-screen'>
                <div className="hidden md:flex md:justify-end items-center h-[64px] w-full bg-gray-200">
                    <div className="flex justify-end gap-6 w-full pr-5">
                        <div className='relative'>
                            <button onClick={toggleMenu} className="flex items-center gap-1">
                                <div className="border border-blue-300 p-[2px]  rounded-full mr-1">
                                    <HiUser color='rgb(59, 130, 246)' size={20} />
                                </div>
                                <span className='text-primary font-medium'>Admin</span>
                                <MdKeyboardArrowDown size={24} color='#102255' />
                            </button>
                            <ul className={`${showMenu ? 'block' : 'hidden'} absolute right-0 top-10 mt-3 z-[1] shadow w-52 rounded-sm bg-dimWhite`}>
                                <li className='flex items-center gap-2 hover:bg-slate-300 text-primary px-2 py-1.5'>
                                    <BiSolidEdit size={20} />
                                    <Link href='#'>Change Password</Link>
                                </li>
                                <li className='flex items-center gap-2 hover:bg-slate-300 text-primary px-2 py-1.5'>
                                    <RiLogoutCircleRLine color='red' size={20} />
                                    <Link onClick={() => signOut()} href='#'>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='flex-1 overflow-y-auto p-6 md:pb-8 md:pt-4 bg-[#EDF2FF]'>
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;