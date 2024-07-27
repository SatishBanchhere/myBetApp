import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";
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
                    page: 1, // Assuming you fetch all results at once
                    pageSize: 10 // Adjust page size as needed
                }, {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                });

                // Reverse the results fetched and update state
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
        return <p className="text-center text-blue-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Bet History</h2>
            <div className="space-y-4">
                {results.map((result, index) => (
                    <div key={index} className={`p-4 rounded-lg shadow-md ${result.status === 'won' ? 'bg-green-100' : 'bg-red-100'}`}>
                        <p className="text-lg">
                            <span className="font-semibold">{result.status === 'won' ? 'You won' : 'You lost'}:</span> ₹{result.amount}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold">Against:</span> 
                            {/* <AgainstName userId={result.against}></AgainstName> */}
                            {result.against}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

function AgainstName({ userId }) {
    const [fullName, setFullName] = useState(" Loading...");

    useEffect(() => {
        const fetchUserNames = async () => {
            try {
                const response = await axios.get(BASE_URL + `/bets/name`, {
                    params: { userId }, // Pass userId as a query parameter
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setFullName(" " + response.data.fullName);
            } catch (error) {
                console.error('Error fetching user name:', error);
                setFullName("Unknown");
            }
        };

        fetchUserNames();
    }, [userId]);

    return <span>{fullName}</span>;
}
