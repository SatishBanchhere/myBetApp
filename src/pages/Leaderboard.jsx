import { Appbar } from "../components/Appbar"
import { Leaderboard } from "../components/Leaderboard.jsx"

export const LeaderboardPage = () => {
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col text-gray-100">
            <Appbar />
            <div className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-4xl">
                    <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">Top Players</h1>
                    <Leaderboard />
                </div>
            </div>
            <footer className="text-center py-4 text-gray-400">© 2025 My bet App. All rights reserved.</footer>
        </div>
    )
}

