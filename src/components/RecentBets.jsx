import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import config from '../config';

const BASE_URL = config.BASE_URL;

export const RecentBets = () => {
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecentBets = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/account/recent-bets`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBets(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recent bets:', error);
                setError('Failed to fetch recent bets');
                setLoading(false);
            }
        };

        fetchRecentBets();
    }, []);

    if (loading) {
        return <p className="text-center text-blue-400">Loading recent bets...</p>;
    }

    if (error) {
        return <p className="text-center text-red-400">Error: {error}</p>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 shadow-lg rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Recent Bets</h2>
            <div className="space-y-4">
                {bets.map((bet, index) => (
                    <motion.div
                        key={bet._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gray-700 rounded-lg p-4 border border-gray-600"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-300">
                                    <span className="font-semibold text-blue-400">From:</span> {bet.fromUser}
                                </p>
                                <p className="text-gray-300">
                                    <span className="font-semibold text-blue-400">To:</span> {bet.toUser}
                                </p>
                                <p className="text-gray-300">
                                    <span className="font-semibold text-blue-400">Amount:</span> ₹{bet.amount.toFixed(2)}
                                </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full ${bet.Completed ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                {bet.Completed ? 'Completed' : 'Pending'}
                            </div>
                        </div>
                        {bet.Completed && bet.Winner && (
                            <p className="mt-2 text-green-400">
                                Winner: {bet.Winner === localStorage.getItem('userId') ? 'You' : bet.Winner}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
