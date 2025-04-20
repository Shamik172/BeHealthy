import React from "react";

const ManualLocationInput = ({
  locationDenied,
  manualLocationText,
  handleManualLocationSearch,
  manualLocationResults,
  selectManualLocation,
  setManualLocationText,
}) => {
  if (!locationDenied) return null;

  return (
    <div>
      <p className="text-red-600 font-medium">
        You didn't allow location. Please enter your location manually:
      </p>
      <input
        type="text"
        value={manualLocationText}
        onChange={(e) => {
          setManualLocationText(e.target.value);
          handleManualLocationSearch(e.target.value);
        }}
        placeholder="Enter your location..."
        className="border p-2 w-full max-w-md mt-2"
      />
      {manualLocationResults.length > 0 && (
        <ul className="mt-2 bg-white shadow rounded max-w-md">
          {manualLocationResults.map((res) => (
            <li
              key={res.place_id}
              onClick={() => selectManualLocation(res)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {res.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManualLocationInput;
