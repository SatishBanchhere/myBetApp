import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import config from "../config"
import {Appbar} from "../components/Appbar.jsx";
const BASE_URL = config.BASE_URL

export const BetMoney = () => {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")

    const initiateBet = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/account/bet`,
                {
                    to: id,
                    amount,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                },
            )
            console.log(response.data) // Handle response if needed
            navigate("/dashboard")
        } catch (error) {
            console.error("Error initiating bet:", error)
            setErrorMessage("Insufficient balance or incorrect amount value.")
        }
    }

    return (
        <>
            <Appbar/>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-green-200 p-4">
                <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="bg-green-600 p-6 text-white">
                        <h2 className="text-3xl font-bold text-center">Bet Money</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-3xl font-bold text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => {
                                        setAmount(Number(e.target.value))
                                        setErrorMessage("")
                                    }}
                                    type="number"
                                    id="amount"
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Enter amount"
                                />
                                {errorMessage && <p className="text-sm text-red-600 mt-1">{errorMessage}</p>}
                            </div>
                            <button
                                onClick={initiateBet}
                                className="w-full px-4 py-3 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                            >
                                Initiate Bet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

