import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;
const DashBoardHeader = () => {
  const { userInfor } = useAuth();
  const navigate = useNavigate();
  return (
    <DashboardHeaderStyles className="flex items-center">
      <Button
        to="/manage/add-post"
        kind="secondary2"
        className="header-button"
        height="100px"
      >
        Write new post
      </Button>
      <div
        className="header-avatar cursor-pointer"
        onClick={() => navigate(`/manage/user-update?id=${userInfor.uid}`)}
      >
        <img src={userInfor?.avatar} alt="" />
      </div>
    </DashboardHeaderStyles>
  );
};
export default DashBoardHeader;
