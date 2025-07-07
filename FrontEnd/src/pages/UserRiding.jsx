import React from "react";
import mapimage from "../assets/mapimage.avif";
import car from "../assets/car.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

const UserRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;
  const navigate = useNavigate();
  const { sendMessage, receiveMessage } = React.useContext(SocketContext);

  receiveMessage("ride-ended", () => {
    navigate("/user-home");
  });

  return (
    <div className="h-screen flex flex-col justify-between">
      <Link
        to="/user-home"
        className="fixed block right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-line"></i>
      </Link>
      <div>
        <div className="h-1/2">
          <img
            className="h-full w-full object-cover"
            src={mapimage}
            alt="Map Image"
          />
        </div>

        {/* Ride Details */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <img className="h-24" src={car} alt="car image" />
            <div className="text-right">
              <h2 className="text-lg font-medium">
                {rideData.captain.fullname.firstname}
              </h2>
              <h4 className="text-xl font-semibold">MP045-AB-104</h4>
              <p className="text-sm text-gray-600">Suzuki Alto</p>
            </div>
          </div>

          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
              <i className="text-lg ri-map-pin-5-fill"></i>
              <div>
                <h3 className="text-lg font-medium">{rideData.destination}</h3>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Rs{rideData.fare}</h3>
                <p className="text-sm text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <button className="w-full bg-green-600 text-white font-semibold p-4 rounded-none">
        Make Payment
      </button>
    </div>
  );
};

export default UserRiding;
