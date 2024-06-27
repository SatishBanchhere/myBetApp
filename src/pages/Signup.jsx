import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post("https://mybetappbackend.onrender.com/user/signup", {
        username,
        firstName,
        lastName,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.username);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Invalid input. Please check your details and try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-blue-50 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-6 shadow-lg">
          <Heading label={"Sign up"} className="text-blue-600" />
          <SubHeading
            label={"Enter your information to create an account"}
            className="text-gray-500"
          />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Satish"
            label={"First Name"}
            className="mt-4"
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Banchhere"
            label={"Last Name"}
            className="mt-4"
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
              onClick={handleSignUp}
              className="w-full h-10 px-4 py-2 flex justify-center items-center rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              Sign up
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
};
