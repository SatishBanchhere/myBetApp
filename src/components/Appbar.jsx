import React from 'react';

export const Appbar = () => {
    // Retrieve token and full name from localStorage
    const fullName = localStorage.getItem("username");
    console.log(fullName);

    const handleLogout = () => {
        localStorage.clear(); // Clear all localStorage items
    };

    return (
        <div className="shadow h-14 flex justify-between bg-gray-300">
            <div className="flex flex-col justify-center h-full ml-4">
                {fullName ? fullName : "Guest App"} {/* Display full name or fallback to "Guest" */}
            </div>
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {fullName ? fullName[0].toUpperCase() : "G"}
                    </div>
                </div>
                <button
                    className="m-3 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none flex items-center justify-center"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
        </div>
    );
};
