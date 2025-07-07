import React, { useRef, useState } from "react";
import uberlogo from "../assets/uberlogo.png";
import { Link, useLocation } from "react-router-dom";
import mapimage from "../assets/mapimage.avif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = (props) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(() => {
    if (!finishRidePanelRef.current) return;

    gsap.to(finishRidePanelRef.current, {
      y: finishRidePanel ? "0%" : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [finishRidePanel]);
  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center w-screen ">
        <img className="w-16" src={uberlogo} alt="uberlogo" />
        <Link
          to="/captain-login"
          className="fixed block right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-line"></i>{" "}
        </Link>
      </div>

      <div className="h-4/5 w-screen">
        <img
          className="h-full w-full object-cover"
          src={mapimage}
          alt="Map Image"
        />
      </div>
      <div
        className="h-1/5 p-6 bg-yellow-400  flex items-center justify-between relative"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5 className="p-3 text-center absolute top-0 w-[80%]">
          <i className="text-3xl text-gray-200 ri-arrow-down-s-line"></i>
        </h5>
        <div className="flex items-center justify-between w-screen mt-8">
          <h4 className="text-lg font-semibold">4 Km away</h4>
          <button className="px-10 bg-green-600 text-white font-semibold p-2 rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed z-10 bottom-0 bg-white w-full px-3 py-10 translate-y-full"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} ride={rideData} />
      </div>
    </div>
  );
};

export default CaptainRiding;
