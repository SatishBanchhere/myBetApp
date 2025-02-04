import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export function ShowHistory({ buttonText, to }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 shadow-lg rounded-lg p-6"
        >
            <Link
                to={to}
                className="block w-full text-center py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 ease-in-out"
            >
                {buttonText}
            </Link>
        </motion.div>
    )
}

