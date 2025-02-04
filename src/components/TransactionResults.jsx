import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import config from "../config";
import { Appbar } from "./Appbar.jsx";

const BASE_URL = config.BASE_URL;

export const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const response = await axios.get(BASE_URL + "/transactions/transactions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTransactions(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setError("Failed to fetch transactions");
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading && transactions.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center h-64"
            >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-red-400 p-4 bg-gray-800 rounded-lg"
            >
                Error: {error}
            </motion.p>
        );
    }

    const userId = localStorage.getItem("userId");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-900"
        >
            <Appbar />
            <div className="max-w-6xl mx-auto p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-lg shadow-lg p-6"
                >
                    <h2 className="text-2xl font-bold mb-6 text-blue-400">Transaction History</h2>
                    <div className="space-y-4">
                        {transactions.map((transaction, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className={`p-4 rounded-lg ${
                                    transaction.from === userId
                                        ? "bg-red-900 bg-opacity-40"
                                        : "bg-green-900 bg-opacity-40"
                                }`}
                            >
                                <p className="text-lg">
                                    {transaction.from === userId ? (
                                        <>
                                            <span className="font-semibold text-red-400">Sent</span>
                                            <span className="font-bold text-xl ml-2 text-gray-300">₹{transaction.amount}</span>
                                            <span className="ml-2 text-gray-300">to</span>
                                            <span className="font-medium ml-2 text-blue-400">{transaction.toFullName}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-semibold text-green-400">Received</span>
                                            <span className="font-bold text-xl ml-2 text-gray-300">₹{transaction.amount}</span>
                                            <span className="ml-2 text-gray-300">from</span>
                                            <span className="font-medium ml-2 text-blue-400">{transaction.fromFullName}</span>
                                        </>
                                    )}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
