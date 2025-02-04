import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import config from "../config"
const BASE_URL = config.BASE_URL

export const Signin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/signin`, {
        username,
        password,
      })
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("userId", response.data.userId)
      localStorage.setItem("username", response.data.username)
      navigate("/dashboard")
    } catch (error) {
      setError("Incorrect username or password. Please try again.")
    }
  }

  return (
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex justify-center items-center p-4">
        <div className="max-w-md w-full">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <Heading label="Sign in" className="text-3xl font-bold text-gray-800 mb-2" />
            <SubHeading label="Enter your credentials to access your account" className="text-gray-600 mb-6" />
            <InputBox
                onChange={(e) => setUsername(e.target.value)}
                placeholder="john@example.com"
                label="Email"
                className="mb-4"
            />
            <InputBox
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                label="Password"
                type="password"
                className="mb-6"
            />
            <button
                onClick={handleSignIn}
                className="w-full py-3 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Sign in
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" className="mt-6" />
          </div>
        </div>
      </div>
  )
}

