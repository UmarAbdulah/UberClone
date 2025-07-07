import React from "react";

const LocationSearchPanel = ({ locations, onLocationSelect }) => {
  return (
    <div>
      {locations.map((location, idx) => {
        return (
          <div
            key={idx}
            onClick={() => onLocationSelect(location)} // 👈 Handle click
            className="flex items-center justify-start my-2 border-gray-100 active:border-black border-2 p-3 rounded-xl mt-3 cursor-pointer"
          >
            <h2 className="p-2 rounded-full h-10 w-10 flex item-center justify-center bg-[#eee]">
              {/* icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="..." />
              </svg>
            </h2>
            <h4 className="text-lg font-medium ml-2">{location.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
