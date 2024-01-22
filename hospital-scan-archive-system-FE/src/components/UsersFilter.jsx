import React from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

const UsersFilter = ({ setFilter, statusFilter }) => {
    const { pathname } = useLocation();

    const usersFilterTypes = [
        { title: 'active', isActive: true },
        { title: 'inactive', isActive: false }
    ];

    return (
        <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button onClick={() => setFilter('status', null)} className={clsx("px-5 py-2 text-xs font-medium capitalize text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100", { 'bg-gray-100': !statusFilter })}>
                All
            </button>

            {
                usersFilterTypes.map((type, index) => (
                    <button key={index} onClick={() => setFilter('status', type.title)} className={clsx("px-5 py-2 text-xs font-medium capitalize text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100", { 'bg-gray-100': statusFilter === type.title })}>
                        {type.title}
                    </button>
                ))
            }
        </div>
    )
}

export default UsersFilter