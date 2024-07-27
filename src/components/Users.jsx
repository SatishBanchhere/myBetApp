import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import config from "../config";
const BASE_URL = config.BASE_URL;

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.post(BASE_URL + "/user/bulk", {
                    filter: filter
                });
                
                console.log("API Response:", response.data); // Debug log
                const loggedInUserId = localStorage.getItem("userId");
                console.log("Logged-in User ID:", loggedInUserId); // Debug log

                const filteredUsers = response.data.user.filter(user => {
                    console.log("User ID:", user._id); // Debug log
                    return user._id !== loggedInUserId;
                });

                setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
                console.log("Error response data:", error.response ? error.response.data : "No response data");
            }
        };

        fetchUsers();
    }, [filter]);

    const navigate = useNavigate();

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users.map(user => (
                    <User key={user._id} user={user} navigate={navigate} />
                ))}
            </div>
        </>
    );
};

function User({ user, navigate }) {
    return (
        <div className="flex flex-col md:flex-row justify-between" key={user._id}>
            <div className="flex flex-col md:flex-row">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>{user.firstName} {user.lastName}</div>
                </div>
            </div>
            <div className="flex mt-2 md:mt-0">
                <div className="flex flex-col justify-center h-full px-1">
                    <Button
                        onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)}
                        label={"Send Money"}
                    />
                </div>
                <div className="flex flex-col justify-center h-full px-1">
                    <Button
                        onClick={() => navigate("/bet?id=" + user._id + "&name=" + user.firstName)}
                        label={"Bet Money"}
                    />
                </div>
            </div>
        </div>
    );
}

