import { Link, useNavigate } from "react-router-dom"

export const Appbar = () => {
    const fullName = localStorage.getItem("username") || "Guest"
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/signin")
    }

    return (
        <header className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/dashboard" className="text-xl font-bold text-blue-400">
                        BetApp
                    </Link>
                    <nav className="hidden md:flex space-x-4">
                        <Link to="/dashboard" className="hover:text-blue-300 transition duration-200">
                            Dashboard
                        </Link>
                        <Link to="/ShowHistory" className="hover:text-blue-300 transition duration-200">
                            Bet History
                        </Link>
                        <Link to="/ShowTransactionHistory" className="hover:text-blue-300 transition duration-200">
                            Transactions
                        </Link>
                        <Link to="/leaderboard" className="hover:text-blue-300 transition duration-200">
                            Leaderboard
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-sm font-medium">{fullName[0].toUpperCase()}</span>
                            </div>
                            <span className="hidden md:inline">{fullName}</span>
                        </div>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

