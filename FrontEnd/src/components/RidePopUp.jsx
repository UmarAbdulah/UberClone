import React from "react";
import passenger from "../assets/passenger.jpg";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center absolute top-0 w-[90%] "
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3">New Ride Available!</h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-200 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={passenger}
            alt="passenger"
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 Km away</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-5-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2  border-gray-200 ">
            <i className="text-lg ri-map-pin-5-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.destination}</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Rs{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setConfirmRidePopUpPanel(true);
            props.confirmRide();
          }}
          className="mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Accept Ride
        </button>
        <button
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
          className="mt-1 w-full bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
