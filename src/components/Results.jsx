import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import config from "../config";
import { Appbar } from "./Appbar.jsx";

const BASE_URL = config.BASE_URL;

export const Results = ({ setValue, value }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await axios.post(BASE_URL + "/bets/results", {
                    page: 1,
                    pageSize: 10
                }, {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                });

                const reversedResults = response.data.reverse();
                setResults(reversedResults);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bet results:', error);
                setError('Failed to fetch results');
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading && !results.length) {
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
                    <h2 className="text-2xl font-bold mb-6 text-blue-400">Bet History</h2>
                    <div className="space-y-4">
                        {results.map((result, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className={`p-4 rounded-lg ${
                                    result.status === 'won'
                                        ? 'bg-green-900 bg-opacity-40'
                                        : 'bg-red-900 bg-opacity-40'
                                }`}
                            >
                                <p className="text-lg mb-2">
                                    <span className="font-semibold text-gray-300">
                                        {result.status === 'won' ? 'You won' : 'You lost'}:
                                    </span>
                                    <span className={`text-xl font-bold ml-2 ${
                                        result.status === 'won'
                                            ? 'text-green-400'
                                            : 'text-red-400'
                                    }`}>
                                        ₹{result.amount}
                                    </span>
                                </p>
                                <p className="text-lg">
                                    <span className="font-semibold text-gray-300">Against:</span>
                                    <AgainstName userId={result.against} />
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

function AgainstName({ userId }) {
    const [fullName, setFullName] = useState("Loading...");

    useEffect(() => {
        const fetchUserNames = async () => {
            try {
                const response = await axios.get(BASE_URL + `/bets/name`, {
                    params: { userId },
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setFullName(response.data.fullName);
            } catch (error) {
                console.error('Error fetching user name:', error);
                setFullName("Unknown");
            }
        };

        fetchUserNames();
    }, [userId]);

    return <span className="ml-2 font-medium text-blue-400">{fullName}</span>;
}
