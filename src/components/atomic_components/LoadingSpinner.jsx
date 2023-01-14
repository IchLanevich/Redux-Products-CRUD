import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="animate-pulse bg-slate-800">
      <div className="w-full flex flex-col gap-2 rounded p-4">
        <div className="w-full h-12 bg-slate-700"></div>
        <div className="w-full h-12 bg-slate-700"></div>
        <div className="w-full h-12 bg-slate-700"></div>
        <div className="w-full h-12 bg-slate-700"></div>
        <div className="w-full h-12 bg-slate-700"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
