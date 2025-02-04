import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import config from "../config"

const BASE_URL = config.BASE_URL

export const Statistics = () => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/account/statistics`, {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                setStats(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching statistics:", error)
                setError("Failed to fetch statistics")
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) {
        return <p className="text-center text-blue-400">Loading statistics...</p>
    }

    if (error) {
        return <p className="text-center text-red-400">Error: {error}</p>
    }

    const statItems = [
        { title: "Total Bets", value: (stats.totalBets || 0), color: "bg-blue-500" },
        { title: "Bets Won", value: (stats.betsWon || 0), color: "bg-green-500" },
        { title: "Bets Lost", value: (stats.betsLost || 0), color: "bg-red-500" },
        { title: "Win Rate", value: `${(stats.winRate || 0)}%`, color: "bg-yellow-500" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 shadow-lg rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Your Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
                {statItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`${item.color} bg-opacity-20 p-4 rounded-lg`}
                    >
                        <p className="text-lg font-semibold text-gray-300">{item.title}</p>
                        <p className="text-3xl font-bold text-white">{item.value}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

