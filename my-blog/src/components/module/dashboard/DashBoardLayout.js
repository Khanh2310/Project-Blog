import { useAuth } from "contexts/auth-context";
import HomePages from "pages/HomePages";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashBoardHeader from "./DashBoardHeader";
import Siderbar from "./Siderbar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
    }
    @media screen and (max-width: 1023.98px) {
      .dashboard {
        &-main {
          padding: 40px;
        }
      }
      @media screen and (max-width: 1023.98px) {
        &-heading {
          font-size: 20px;
        }
        &-main {
          grid-template-columns: 100%;
          padding: 20px;
        }
      }
    }
  }
`;
const DashBoardLayout = ({ children }) => {
  // nếu chưa đăng nhập thì nó quay qua trang notfound
  const { userInfor } = useAuth();
  if (!userInfor) return <HomePages></HomePages>;
  return (
    <DashboardStyles>
      <DashBoardHeader></DashBoardHeader>
      <div className="dashboard-main">
        <Siderbar></Siderbar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};
export default DashBoardLayout;
