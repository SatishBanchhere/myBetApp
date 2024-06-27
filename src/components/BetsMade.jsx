import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const BetsMade = () => {
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBets = async () => {
            try {
                const response = await axios.get("https://mybetappbackend.onrender.com/account/betsMade", {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBets(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bets:', error);
                setError('Failed to fetch bets');
                setLoading(false);
            }
        };

        fetchBets();
        const interval = setInterval(fetchBets, 3000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <p className="text-center text-blue-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Bets Made</h2>
            <ul className="space-y-4">
                {bets.map((bet, index) => (
                    <li key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                        <p className="text-lg">
                            <span className="font-semibold">Amount:</span> ₹{bet.amount}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold">Bet made to:</span> {bet.toUser}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
