import React from "react";
import { useAuth } from "../contexts/auth-context";

const DashboardPage = () => {
  const { userInfor } = useAuth();
  console.log("DashboardPage  userInfor", userInfor);
  return <div></div>;
};

export default DashboardPage;
