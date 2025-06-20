import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import uberlogo from "../assets/uberlogo.png";
import { UserContext } from "../context/user-context";
import axios from "axios";

const UserLogin = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = async (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      newUser
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/user-home");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-14 center self-start mb-5"
          src={uberlogo}
          alt="uberlogo"
        />
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <label className="text-xl" htmlFor="email">
            What's your email ?
          </label>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 mt-2 mb-7 border w-full text-lg placeholder:text-base"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="email@example.com"
            required
          />
          <label className="text-xl" htmlFor="password">
            Enter Password
          </label>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 mt-2 mb-7 border w-full text-lg placeholder:text-base"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
            required
          />
          <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 mt-2 mb-4 border w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          New Here?{" "}
          <Link to="/user-signup" className="text-blue-600 ">
            Create New Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="flex items-center justify-center bg-[#10b461] text-white font-semibold rounded px-4 py-2 mt-2 mb-7 border w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
