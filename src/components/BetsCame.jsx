import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const BetsCame = ({balance}) => {
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [beterror, setBetError] = useState(null);
    const [wonBets, setWonBets] = useState({}); // New state to track won bets
    console.log(balance);
    const fetchBets = async () => {
        try {
            const response = await axios.get("https://mybetappbackend.onrender.com/account/betsCame", {
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

    useEffect(() => {
        fetchBets();
        const interval = setInterval(fetchBets, 3000);
        
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const handleAccept = async (betId) => {
        try {
            const response = await axios.put("https://mybetappbackend.onrender.com/bets/set", { betId }, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            const updatedBet = response.data;
            const userId = localStorage.getItem("userId"); // Assuming user ID is stored in local storage

            // Check if the current user is the winner
            const isWinner = updatedBet.Winner === userId;

            // Update the wonBets state
            setWonBets((prev) => ({ ...prev, [betId]: isWinner }));

            // Optionally, update the bets state to remove the accepted bet
            setBets(bets.filter(bet => bet._id !== betId));

            try {
                const response = await axios.post("https://mybetappbackend.onrender.com/bets/setResults", {
                    winner: updatedBet.Winner,
                    looser: updatedBet.Looser,
                    amount: updatedBet.amount
                }, {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error updating balances:', error);
            }

        } catch (error) {
            console.error('Error accepting bet:', error);
        }
    };

    if (loading) {
        return <p className="text-center text-blue-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Bets Came</h2>
            <ul className="space-y-4">
                {bets.map((bet, index) => (
                    <li key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                        <div>
                            <p className="text-lg">
                                <span className="font-semibold">Amount:</span> ₹{bet.amount}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold">Bet made by:</span> {" " + bet.fromUser}
                            </p>
                        </div>
                        <button 
                            onClick={() => handleAccept(bet._id)}
                            className={`font-bold py-2 px-4 rounded ${
                                wonBets[bet._id] === true ? 'bg-green-500 text-white' :
                                wonBets[bet._id] === false ? 'bg-red-500 text-white' :
                                'bg-blue-500 text-white hover:bg-blue-700'
                            }`}>
                            {wonBets[bet._id] === true ? 'Won Bet Amount' : 'Accept'}
                        </button>
                        <p>{bet.amount >= balance ? "Insufficient balance" : <></>}</p>

                    </li>
                    
                ))}
            </ul>
        </div>
    );
};
