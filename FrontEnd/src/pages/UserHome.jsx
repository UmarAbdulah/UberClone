import React, { useRef, useState } from "react";
import uberlogo from "../assets/uberlogo.png";
import mapimage from "../assets/mapimage.avif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

import VechiclePanel from "../components/VechiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [vechiclePanel, setVechiclePanel] = useState(false);
  const [vechicleFound, setVechicelFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelref = useRef(null);
  const vechilePanelref = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const vechicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const sumbitHandler = (event) => {
    event.preventDefault();
  };

  useGSAP(() => {
    if (!panelref.current) return;

    gsap.to(panelref.current, {
      height: panelOpen ? "70%" : "0%",
      padding: panelOpen ? "15px" : "0px",
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        if (panelOpen) {
          panelCloseRef.current.style.opacity = 1;
        } else if (!panelOpen) {
          panelCloseRef.current.style.opacity = 0;
          setPanelOpen(false);
        }
      },
    });
  }, [panelOpen]);

  useGSAP(() => {
    if (!vechilePanelref.current) return;

    gsap.to(vechilePanelref.current, {
      y: vechiclePanel ? "0%" : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [vechiclePanel]);

  useGSAP(() => {
    if (!confirmedRidePanelRef.current) return;

    gsap.to(confirmedRidePanelRef.current, {
      y: confirmedRidePanel ? "0%" : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [confirmedRidePanel]);

  useGSAP(() => {
    if (!vechicleFoundRef.current) return;

    gsap.to(vechicleFoundRef.current, {
      y: vechiclePanel ? "0%" : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [vechicleFound]);

  useGSAP(() => {
    if (!waitingForDriverRef.current) return;

    gsap.to(waitingForDriverRef.current, {
      y: waitingForDriver ? "0%" : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src={uberlogo}
        alt="uberlogo"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src={mapimage}
          alt="Map Image"
        />
        <div className=" absolute h-screen top-0 width-full flex flex-col justify-end">
          <div className="h-[30%] p-5 bg-white relative">
            <h5
              className="absolute top-4 right-4 text-2xl opacity-0 cursor-pointer"
              onClick={() => {
                setPanelOpen(false);
              }}
              ref={panelCloseRef}
            >
              <i className="ri-arrow-down-s-line"></i>
            </h5>
            <h4 className="text-2xl font-semibold">Find A Trip</h4>
            <form onSubmit={sumbitHandler}>
              <div className="line absolute h-16 w-1 top-[40%] left-8 bg-black rounded-full"></div>
              <input
                className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mb-3 mt-3"
                type="text"
                placeholder="Add a pickup location"
                value={pickup}
                onChange={(e) => {
                  setPickUp(e.target.value);
                }}
                onClick={() => {
                  setPanelOpen(true);
                }}
              />
              <input
                className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full"
                type="text"
                placeholder="Add a drop location"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
                onClick={() => {
                  setPanelOpen(true);
                }}
              />
            </form>
          </div>
          <div className="h-[0%] bg-white" ref={panelref}>
            <LocationSearchPanel
              setVechiclePanel={setVechiclePanel}
              setPanelOpen={setPanelOpen}
            />
          </div>
        </div>
      </div>

      <div
        ref={vechilePanelref}
        className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10"
      >
        <VechiclePanel
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVechiclePanel={setVechiclePanel}
        />
      </div>
      <div
        ref={confirmedRidePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10"
      >
        <ConfirmedRide
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVechicelFound={setVechicelFound}
        />
      </div>
      <div
        ref={vechicleFoundRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10"
      >
        <LookingForDriver setVechicelFound={setVechicelFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed z-10 bottom-0 bg-white w-full px-3 py-10"
      >
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
