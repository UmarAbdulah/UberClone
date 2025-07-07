import React from "react";
import car from "../assets/car.png";
import bike from "../assets/bike.png";

const VechiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center absolute top-0 w-[90%] "
        onClick={() => {
          props.setVechiclePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3">Choose a vechicle</h3>
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
          props.selectVechile("car");
        }}
        className="flex items-center justify-between w-full p-3 border-2 border-gray-100 active:border-black rounded-xl mb-3"
      >
        <img className="h-15" src={car} alt="Car Image" />
        <div className="w-1/2">
          <h4 className="font-medium text-sm">
            UberGO
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-sm">Affordable rides </p>
        </div>
        <h2 className="text-xl font-semibold">Rs{props.fare.fareCar}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
          props.selectVechile("bike");
        }}
        className="flex items-center justify-between w-full p-3 border-2 border-gray-100 active:border-black rounded-xl mb-2 "
      >
        <img className="h-10 ml-4" src={bike} alt="Bike Image" />
        <div className="w-1/2">
          <h4 className="font-medium text-sm">
            Moto
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-sm">Affordable moto ride </p>
        </div>
        <h2 className="text-xl font-semibold">Rs{props.fare.fareMotorcycle}</h2>
      </div>
    </div>
  );
};

export default VechiclePanel;
