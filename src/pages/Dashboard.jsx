import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BetsMade } from "../components/BetsMade";
import { BetsCame } from "../components/BetsCame";
import { Users } from "../components/Users";
import { ShowHistory } from "../components/ShowHistory";

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const [previousBalance, setPreviousBalance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/signup");
                    return;
                }

                const response = await axios.get("https://mybetappbackend.onrender.com/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBalance(prevBalance => {
                    setPreviousBalance(prevBalance);
                    return response.data.balance;
                });
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
        const interval = setInterval(fetchBalance, 3000);

        return () => clearInterval(interval);
    }, [navigate]);

    const renderBalanceChange = () => {
        if (previousBalance === null || previousBalance === balance) {
            return null;
        }

        const change = balance - previousBalance;
        const changeColor = change > 0 ? "text-green-500" : "text-red-500";
        const sign = change > 0 ? "+" : "";

        return (
            <span className={`text-sm ${changeColor}`}>
                {sign}{change}
            </span>
        );
    };

    const getBalanceTextClass = () => {
        if (previousBalance === null || previousBalance === balance) {
            return "text-gray-800"; // Default text color
        }

        const change = balance - previousBalance;
        return change > 0 ? "text-green-500" : "text-red-500";
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Appbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Your Account Balance</h2>
                    {balance !== null ? (
                        <div className={`text-4xl font-bold ${getBalanceTextClass()}`}>
                            {/* <Balance value={balance} colour={getBalanceTextClass}/> */}
                            <div className="grid grid-cols-1 sm:flex">
                                <div className="">
                                    Your Balance :
                                </div>
                                <div className="">
                                    ₹ {parseFloat(balance).toFixed(2)}
                                </div>
                                {renderBalanceChange()}
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">Loading balance...</p>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="bg-white rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4 text-center text-gray-800"></h2>
                            <BetsMade />
                        </div>
                    </div>
                    <div>
                        <div className="bg-white rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4 text-center text-gray-800"></h2>
                            <BetsCame balance={balance} />
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">User List</h2>
                        <Users />
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <ShowHistory buttonText={"Show Bet History"} to={"/ShowHistory"} />
                        </div>
                    </div>
                    <div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <ShowHistory buttonText={"Show Transaction History"} to={"/ShowTransactionHistory"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
