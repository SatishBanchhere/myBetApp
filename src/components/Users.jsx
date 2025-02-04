import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "./Button"
import config from "../config"

const BASE_URL = config.BASE_URL

export const Users = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.post(BASE_URL + "/user/bulk", {
                    filter: filter,
                })

                const loggedInUserId = localStorage.getItem("userId")

                const filteredUsers = response.data.user.filter((user) => {
                    return user._id !== loggedInUserId
                })

                setUsers(filteredUsers)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching users:", error)
                setLoading(false)
            }
        }

        fetchUsers()
    }, [filter])

    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 shadow-lg rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Users</h2>
            <div className="mb-4">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 border rounded-lg border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {loading ? (
                <p className="text-center text-blue-400">Loading users...</p>
            ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {users.slice(0, 5).map((user, index) => (
                        <User key={user._id} user={user} navigate={navigate} index={index} />
                    ))}
                    {users.length > 5 && (
                        <div className="pt-2 border-t border-gray-700">
                            {users.slice(5).map((user, index) => (
                                <User key={user._id} user={user} navigate={navigate} index={index + 5} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    )
}

function User({ user, navigate, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col md:flex-row justify-between items-center bg-gray-700 p-4 rounded-lg shadow-sm mb-2"
        >
            <div className="flex items-center mb-2 md:mb-0">
                <div className="rounded-full h-12 w-12 bg-blue-500 flex justify-center items-center mr-4">
                    <div className="text-xl font-semibold text-white">{user.firstName[0].toUpperCase()}</div>
                </div>
                <div>
                    <div className="font-semibold text-lg text-gray-200">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                </div>
            </div>
            <div className="flex space-x-2">
                <Button
                    onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                    label="Send Money"
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                />
                <Button
                    onClick={() => navigate(`/bet?id=${user._id}&name=${user.firstName}`)}
                    label="Bet Money"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                />
            </div>
        </motion.div>
    )
}
