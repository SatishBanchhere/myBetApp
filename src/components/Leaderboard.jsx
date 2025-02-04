import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import config from "../config"

const BASE_URL = config.BASE_URL;

export const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/account/leaderboard`)
                setLeaderboard(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching leaderboard:", error)
                setError("Failed to fetch leaderboard")
                setLoading(false)
            }
        }

        fetchLeaderboard()
    }, [])

    if (loading) {
        return <p className="text-center text-blue-400">Loading leaderboard...</p>
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
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Leaderboard</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                        <th className="pb-2">Rank</th>
                        <th className="pb-2">Username</th>
                        <th className="pb-2 text-right">Total Money Won</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leaderboard.map((entry, index) => (
                        <motion.tr
                            key={entry.username}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="border-b border-gray-700 last:border-b-0"
                        >
                            <td className="py-3 text-gray-300">{index + 1}</td>
                            <td className="py-3 text-gray-300">{entry.username}</td>
                            <td className="py-3 text-right text-green-400">₹{entry.totalMoneyWon.toFixed(2)}</td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
}

