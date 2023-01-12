import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-img skeleton"></div>
        <div className="card-body">
          <button className="w-[100px] h-8 bg-[#e2e5e7]  rounded-lg mb-4"></button>
          <div className="card-title skeleton h-20"></div>
          <div className="mt-2 flex items-center justify-between mb-5">
            <div className="bg-[#e2e5e7] h-5  w-[60px]"></div>
            <div className="bg-[#e2e5e7] h-5  w-[90px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
