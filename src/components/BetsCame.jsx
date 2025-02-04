import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import config from "../config"

const BASE_URL = config.BASE_URL

export const BetsCame = ({ balance }) => {
    const [bets, setBets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [betError, setBetError] = useState(null)
    const [wonBets, setWonBets] = useState({})

    const fetchBets = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/account/betsCame`, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            if (response.status === 400) {
                setBetError("Insufficient Money in opponent's account")
            } else {
                setBets(response.data)
            }
            setLoading(false)
        } catch (error) {
            console.error("Error fetching bets:", error)
            setError("Failed to fetch bets")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBets()
        const interval = setInterval(fetchBets, 3000)
        return () => clearInterval(interval)
    }, [balance, fetchBets]) // Added fetchBets to dependencies

    const handleAccept = async (betId) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/bets/set`,
                { betId },
                {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token"),
                    },
                },
            )
            const updatedBet = response.data
            const userId = localStorage.getItem("userId")
            const isWinner = updatedBet.Winner === userId
            setWonBets((prev) => ({ ...prev, [betId]: isWinner }))
            setBets(bets.filter((bet) => bet._id !== betId))

            try {
                await axios.post(
                    `${BASE_URL}/bets/setResults`,
                    {
                        winner: updatedBet.Winner,
                        looser: updatedBet.Looser,
                        amount: updatedBet.amount,
                    },
                    {
                        headers: {
                            authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    },
                )
            } catch (error) {
                console.error("Error updating balances:", error)
            }
        } catch (error) {
            setBetError("An error occurred while accepting the bet")
        }
    }

    if (loading) {
        return <p className="text-center text-blue-400">Loading...</p>
    }

    if (error) {
        return <p className="text-center text-red-400">Error: {error}</p>
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 shadow-lg rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Bets Received</h2>
            {bets.length === 0 ? (
                <p className="text-gray-400 text-center">No bets received yet.</p>
            ) : (
                <ul className="space-y-4">
                    {bets.map((bet, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-gray-700 rounded-lg p-4 border border-gray-600 transition duration-200 ease-in-out hover:shadow-lg hover:bg-gray-600"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg">
                                        <span className="font-semibold text-blue-400">Amount:</span>{" "}
                                        <span className="text-gray-200">₹{bet.amount}</span>
                                    </p>
                                    <p className="text-lg">
                                        <span className="font-semibold text-blue-400">Bet made by:</span>{" "}
                                        <span className="text-gray-200">{bet.fromUser}</span>
                                    </p>
                                    <p className="text-sm text-gray-400 mt-2">{new Date(bet.createdAt).toLocaleString()}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        if (bet.amount <= balance) {
                                            handleAccept(bet._id)
                                        }
                                    }}
                                    className={`font-bold py-2 px-4 rounded transition duration-200 ease-in-out ${
                                        wonBets[bet._id] === true
                                            ? "bg-green-500 text-white"
                                            : wonBets[bet._id] === false
                                                ? "bg-red-500 text-white"
                                                : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                    disabled={bet.amount > balance}
                                >
                                    {wonBets[bet._id] === true ? "Won Bet Amount" : "Accept"}
                                </button>
                            </div>
                            {bet.amount > balance && <p className="mt-2 text-red-400 font-semibold">Insufficient balance</p>}
                            {betError && (
                                <p className="mt-2 text-red-400 font-semibold">
                                    {"Insufficient balance in " + bet.fromUser + "'s account."}
                                </p>
                            )}
                        </motion.li>
                    ))}
                </ul>
            )}
        </motion.div>
    )
}

