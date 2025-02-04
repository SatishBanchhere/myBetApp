import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Appbar } from "../components/Appbar"
import { BetsMade } from "../components/BetsMade"
import { BetsCame } from "../components/BetsCame"
import { Users } from "../components/Users"
import { ShowHistory } from "../components/ShowHistory"
import { Statistics } from "../components/Statistics"
import { Leaderboard } from "../components/Leaderboard"
import { RecentBets } from "../components/RecentBets"
import { TransactionSummary } from "../components/TransactionSummary"
import config from "../config"

const BASE_URL = config.BASE_URL

export const Dashboard = () => {
    const [balance, setBalance] = useState(null)
    const [previousBalance, setPreviousBalance] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    navigate("/signup")
                    return
                }

                const response = await axios.get(`${BASE_URL}/account/balance`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setBalance((prevBalance) => {
                    setPreviousBalance(prevBalance)
                    return response.data.balance
                })
            } catch (error) {
                console.error("Error fetching balance:", error)
            }
        }

        fetchBalance()
        const interval = setInterval(fetchBalance, 3000)

        return () => clearInterval(interval)
    }, [navigate])

    const renderBalanceChange = () => {
        if (previousBalance === null || previousBalance === balance) {
            return null
        }

        const change = balance - previousBalance
        const changeColor = change > 0 ? "text-green-400" : "text-red-400"
        const sign = change > 0 ? "+" : ""

        return (
            <span className={`text-sm ${changeColor}`}>
        {sign}
                {change.toFixed(2)}
      </span>
        )
    }

    const getBalanceTextClass = () => {
        if (previousBalance === null || previousBalance === balance) {
            return "text-gray-100"
        }

        const change = balance - previousBalance
        return change > 0 ? "text-green-400" : "text-red-400"
    }

    return (
        <div className="bg-gray-900 min-h-screen text-gray-100">
            <Appbar />
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
                >
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Your Account Balance</h2>
                    {balance !== null ? (
                        <div className={`text-4xl font-bold ${getBalanceTextClass()} flex justify-center items-center`}>
                            <div className="mr-2">₹ {Number.parseFloat(balance).toFixed(2)}</div>
                            {renderBalanceChange()}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">Loading balance...</p>
                    )}
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <Statistics />
                    <TransactionSummary />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <BetsMade />
                    <BetsCame balance={balance} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <RecentBets />
                    <Users />
                </div>
                <div className="grid grid-cols-1 gap-8 mb-8">
                    <Leaderboard />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ShowHistory buttonText="Show Bet History" to="/ShowHistory" />
                    <ShowHistory buttonText="Show Transaction History" to="/ShowTransactionHistory" />
                </div>
            </div>
        </div>
    )
}

