import React from "react";

const DashBoardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="mb-10">
      <div className="mb-10">
        <h1 className="dashboard-heading text-[25px] font-medium">{title}</h1>
        <p className="dashboard-short-desc text-[15px]">{desc}</p>
      </div>
    </div>
  );
};
export default DashBoardHeading;
