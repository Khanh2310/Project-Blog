import React from "react";
import { useAuth } from "../contexts/auth-context";

const DashboardPage = () => {
  const { userInfor } = useAuth();
  console.log("DashboardPage  userInfor", userInfor);
  return (
    <div>
      <h1>Dashboard page</h1>
    </div>
  );
};

export default DashboardPage;
