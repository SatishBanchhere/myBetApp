import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import config from "../config"

const BASE_URL = config.BASE_URL

export const BetsMade = () => {
    const [bets, setBets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBets = async () => {
            try {
                const response = await axios.get(BASE_URL + "/account/betsMade", {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                setBets(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching bets:", error)
                setError("Failed to fetch bets")
                setLoading(false)
            }
        }

        fetchBets()
        const interval = setInterval(fetchBets, 3000)

        return () => clearInterval(interval)
    }, [])

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
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Bets Made</h2>
            {bets.length === 0 ? (
                <p className="text-gray-400 text-center">No bets made yet.</p>
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
                            <p className="text-lg">
                                <span className="font-semibold text-blue-400">Amount:</span>{" "}
                                <span className="text-gray-200">₹{bet.amount}</span>
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold text-blue-400">Bet made to:</span>{" "}
                                <span className="text-gray-200">{bet.toUser}</span>
                            </p>
                            <p className="text-sm text-gray-400 mt-2">{new Date(bet.createdAt).toLocaleString()}</p>
                        </motion.li>
                    ))}
                </ul>
            )}
        </motion.div>
    )
}

