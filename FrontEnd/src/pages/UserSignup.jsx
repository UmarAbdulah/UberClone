import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import uberlogo from "../assets/uberlogo.png";
import axios from "axios";
import { UserContext } from "../context/user-context";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/user-home");
    } else {
    }

    setEmail("");
    setFirstName("");
    setLastName("");
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
          <label htmlFor="fistname lastname" className="text-base">
            What's your name ?
          </label>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 mt-2  border w-1/2 text-lg placeholder:text-base"
              id="firstname"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First Name"
              required
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 mt-2 border w-1/2 text-lg placeholder:text-base"
              id="lastname"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last Name"
            />
          </div>
          <label className="text-base" htmlFor="email">
            What's your email ?
          </label>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 mt-2 mb-5 border w-full text-lg placeholder:text-base"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="email@example.com"
            required
          />
          <label className="text-base" htmlFor="password">
            Enter Password
          </label>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 mt-2 mb-5 border w-full text-lg placeholder:text-base"
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
            SignUp
          </button>
        </form>
        <p className="text-center">
          Already have an Account?{" "}
          <Link to="/user-login" className="text-blue-600 ">
            Login Here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[6px] leading-tight">
          By proceeding,you consent to get calls,WhatsApp or SMS messages ,
          including by automated means from Uber
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
