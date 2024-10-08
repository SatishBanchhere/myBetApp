import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import config from "../config";
const BASE_URL = config.BASE_URL;

export const BetMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Bet Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="amount"
                            >
                                Amount (in Rs)
                            </label>
                            <input
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setErrorMessage("");
                                }}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                            />
                            {errorMessage && (
                                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
                            )}
                        </div>
                        <button onClick={async () => {
                            try {
                                const response = await axios.post(`${BASE_URL}/account/bet`, {
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
                        }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Initiate Bet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
