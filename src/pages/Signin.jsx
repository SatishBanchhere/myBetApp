import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post("https://mybetappbackend.onrender.com/user/signin", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.username);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Incorrect username or password. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-blue-50 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-6 shadow-lg">
          <Heading label={"Sign in"} className="text-blue-600" />
          <SubHeading
            label={"Enter your credentials to access your account"}
            className="text-gray-500"
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="satish@gmail.com"
            label={"Email"}
            className="mt-4"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
            type="password"
            className="mt-4"
          />
          <div className="pt-4">
            <button
              onClick={handleSignIn}
              className="w-full h-10 px-4 py-2 flex justify-center items-center rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              Sign in
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
};
