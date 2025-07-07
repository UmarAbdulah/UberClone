import React, { useContext } from "react";
import driver from "../assets/driver.jpg";
import car from "../assets/car.png";
import { CaptainContext } from "../context/captain-context";

const CaptainDetails = (props) => {
  const { captain } = useContext(CaptainContext);
  console.log("Current Captain:", captain);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-10 w-10 rounded-full object-cover "
            src={driver}
            alt="driver"
          />
          <h4 className="text-lg font-medium capitalize">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Rs2000</h4>
          <p className="text-sm  font-medium text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 bg-gray-100 rounded-full justify-center gap-4 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2  font-thin ri-time-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2  font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-sticky-note-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
