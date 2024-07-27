import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";
const BASE_URL = config.BASE_URL;

export const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(BASE_URL + '/transactions/transactions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTransactions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setError('Failed to fetch transactions');
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading && transactions.length === 0) {
        return <p className="text-center text-blue-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }
    const userId = localStorage.getItem("userId");

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Transaction History</h2>
            <div className="space-y-4">
                {transactions.map((transaction, index) => (
                    <div key={index} className={`p-4 rounded-lg shadow-md ${transaction.from === userId ? 'bg-red-100' : 'bg-green-100'}`}>
                        <p className="text-lg">
                            {transaction.from === userId ? `You sent ₹${transaction.amount} to ${transaction.toFullName}` : `You received ₹${transaction.amount} from ${transaction.fromFullName}`}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
