import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import uberlogo from "../assets/uberlogo.png";
import { CaptainContext } from "../context/captain-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [captainData, setcaptainData] = useState(null);
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { updateCaptain } = useContext(CaptainContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      updateCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleColor("");
    setVehicleCapacity("");
    setVehiclePlate("");
    setVehicleType("");
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
          <label htmlFor="vehicleColor vehiclePlate vehicleCapacity vehicleType">
            Vechile Information
          </label>
          <div className="flex flex-col">
            <div className="flex gap-4">
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 mt-2 border w-full text-lg placeholder:text-base"
                id="vehicleColor"
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value);
                }}
                type="text"
                placeholder="Vehicle Color"
                required
              />
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 mt-2 border w-full text-lg placeholder:text-base"
                id="vehiclePlate"
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value);
                }}
                type="text"
                placeholder="Vehicle Plate"
                required
              />
            </div>
            <div className="flex gap-4">
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 mt-2 mb-5 border w-full text-lg placeholder:text-base"
                id="vehicleCapacity"
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value);
                }}
                type="number"
                placeholder="Vehicle Capacity"
                required
              />
              <select
                className="bg-[#eeeeee] rounded px-4 py-2 mt-2 mb-5 border w-full text-lg placeholder:text-base"
                id="vehicleType"
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                }}
                required
              >
                <option value="" disabled>
                  Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="moto">Bike</option>
              </select>
            </div>
          </div>

          <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 mt-2 mb-4 border w-full text-lg placeholder:text-base">
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          Already have an Account?{" "}
          <Link to="/captain-login" className="text-blue-600 ">
            Login Here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[6px] leading-tight">
          This site is protected by reCAPTCHA and the
          <span className="underline ml-1">Google Privacy Policy </span>and
          <span className="underline ml-1">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
