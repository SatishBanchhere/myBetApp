import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react"
import config from "../config"

const BASE_URL = config.BASE_URL;

export const TransactionSummary = () => {
    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTransactionSummary = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${BASE_URL}/account/transaction-summary`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setSummary(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching transaction summary:", error)
                setError("Failed to fetch transaction summary")
                setLoading(false)
            }
        }

        fetchTransactionSummary()
    }, [])

    if (loading) {
        return <p className="text-center text-blue-400">Loading transaction summary...</p>
    }

    if (error) {
        return <p className="text-center text-red-400">Error: {error}</p>
    }

    if (!summary) {
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 shadow-lg rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Transaction Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-red-500 bg-opacity-20 p-4 rounded-lg"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-300">Total Sent</p>
                        <ArrowUpRight className="text-red-400" />
                    </div>
                    <p className="text-3xl font-bold text-red-400">₹{summary.totalSent.toFixed(2)}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-green-500 bg-opacity-20 p-4 rounded-lg"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-300">Total Received</p>
                        <ArrowDownRight className="text-green-400" />
                    </div>
                    <p className="text-3xl font-bold text-green-400">₹{summary.totalReceived.toFixed(2)}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-blue-500 bg-opacity-20 p-4 rounded-lg"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-300">Net Change</p>
                        <TrendingUp className="text-blue-400" />
                    </div>
                    <p className={`text-3xl font-bold ${summary.netChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                        ₹{summary.netChange.toFixed(2)}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}

