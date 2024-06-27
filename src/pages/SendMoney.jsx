import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const initiateTransfer = async () => {
        try {
            const response = await axios.post("https://mybetappbackend.onrender.com/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(response.data); // Handle response if needed
            navigate("/dashboard");
        } catch (error) {
            console.error("Error initiating transfer:", error);
            setErrorMessage("Insufficient balance or incorrect amount value.");
            // if (error.response && error.response.status === 400) {
            // } else {
            //     setErrorMessage("An error occurred while processing your request.");
            // }
        }
    };

    return (
        <div className="flex justify-center h-screen bg-blue-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center text-blue-800">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-blue-800">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (in Rs)</label>
                                <input
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                        setErrorMessage(""); // Clear error message on input change
                                    }}
                                    type="number"
                                    id="amount"
                                    className="block w-full h-10 px-3 py-2 mt-1 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter amount"
                                />
                                {errorMessage && (
                                    <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
                                )}
                            </div>
                            <button
                                onClick={initiateTransfer}
                                className="w-full h-10 px-4 py-2 flex justify-center items-center rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                            >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
