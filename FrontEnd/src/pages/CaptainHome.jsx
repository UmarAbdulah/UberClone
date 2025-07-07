import React, { useRef, useState, useEffect, useContext } from "react";
import mapimage from "../assets/mapimage.avif";
import uberlogo from "../assets/uberlogo.png";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainContext } from "../context/captain-context";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  const { captain } = useContext(CaptainContext);
  const { sendMessage, receiveMessage } = React.useContext(SocketContext);

  useEffect(() => {
    if (!captain || !captain._id) return;

    sendMessage("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(
            "Sending captain location",
            captain._id,
            position.coords.latitude,
            position.coords.longitude
          );

          sendMessage("update-location-captain", {
            captainId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    updateLocation(); // send immediately
    const interval = setInterval(updateLocation, 60 * 1000); // every 1 minute
    return () => clearInterval(interval);
  }, [captain]);

  receiveMessage("new-ride", (data) => {
    console.log("New ride request received:", data);
    setRide(data);
    setRidePopUpPanel(true);
  });

  async function confirmRide() {
    if (!ride?._id || !captain?._id) {
      console.error("Missing ride or captain ID");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/confirm-ride`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Ride confirmed:", response.data);
      setRidePopUpPanel(false);
      setConfirmRidePopUpPanel(true);
    } catch (err) {
      console.error("Error confirming ride:", err);
    }
  }

  useGSAP(() => {
    if (!ridePopUpPanelRef.current) return;

    gsap.to(ridePopUpPanelRef.current, {
      y: ridePopUpPanel ? "0%" : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (!confirmRidePopUpPanelRef.current) return;

    gsap.to(confirmRidePopUpPanelRef.current, {
      y: confirmRidePopUpPanel ? "0%" : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [confirmRidePopUpPanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center w-screen ">
        <img className="w-16" src={uberlogo} alt="uberlogo" />
        <Link
          to="/captain-login"
          className="fixed block right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-line"></i>
        </Link>
      </div>

      <div className="h-screen w-screen">
        <img className="h-full w-full object-cover" src={mapimage} alt="Map" />
      </div>

      <div className="fixed z-10 bottom-50 translate-y-full bg-white w-full h-full px-3 py-3">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopUpPanelRef}
        className="fixed z-10 bottom-0 bg-white w-full px-3 py-10 translate-y-full"
      >
        {ridePopUpPanel && (
          <RidePopUp
            setRidePopUpPanel={setRidePopUpPanel}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            ride={ride}
            confirmRide={confirmRide}
          />
        )}
      </div>

      <div
        ref={confirmRidePopUpPanelRef}
        className="fixed z-10 bottom-0 bg-white w-full h-full px-3 py-10 translate-y-full"
      >
        <ConfirmRidePopUp
          ride={ride}
          setRide={setRide}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
