import React from "react";
import { Link } from "react-router-dom";
import uberlogo from "../assets/uberlogo.png";
import bgImage from "../assets/bg.jpg";

const Home = () => {
  return (
    <div>
      <div className="h-screen w-full flex items-end justify-between flex-col bg-[image:var(--bg-url)] bg-center bg-cover bg-contain backgroundSize: '50%';">
        <img
          className="w-14 ml-4 absolute pt-8 self-start"
          src={uberlogo}
          alt="uberlogo"
        />
        <img src={bgImage} alt="backgroundImage" className="h-full" />
        <div className="bg-white w-full pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started With Uber</h2>
          <Link
            to="/user-login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
