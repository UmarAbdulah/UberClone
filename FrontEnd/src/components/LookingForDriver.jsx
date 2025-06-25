import React from "react";
import car from "../assets/car.png";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center absolute top-0 w-[90%] "
        onClick={() => {
          props.setVechicelFound(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3">Looking For a Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img className="h-25" src={car} alt="car image" />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-5-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">
                Sector 11, Isalamabad, Pakistan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2  border-gray-200 ">
            <i className="text-lg ri-map-pin-5-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">
                Sector 11, Isalamabad, Pakistan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Rs190.30</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
