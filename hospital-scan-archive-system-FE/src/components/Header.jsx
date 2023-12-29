import React from 'react';

const Header = () => {
    return (
        <header className="bg-white">
            <nav className="flex items-center justify-between p-6 lg:px-8 shadow-md" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="text-primary font-poppins text-2xl font-bold">Hospital Scan Archive System</span>
                    </a>
                </div>
            </nav>
        </header>

    )
}

export default Header;