import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import { Button } from "../button";

const HeaderStyles = styled.div`
  padding: 20px 0;
  .logo {
    display: block;
  }
  .container {
    display: flex;
    align-items: center;
    .menu-list {
      list-style: none;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    a {
      text-decoration: none;
      color: inherit;
      font-weight: 500;
    }

    .search {
      display: flex;
      position: relative;
      margin-left: auto;
      align-items: center;
      width: 100%;
      max-width: 300px;
      border: 1px solid #eee;
      padding: 15px;
      border-radius: 8px;
    }
    .search-input {
      padding-right: 45px;
      border: none;
      outline: none;
    }
    .icon-search {
      position: absolute;
      top: 50%;
      transform: translateY(-35%);
      right: 15px;
      display: block;
    }
    .header-button {
      margin-left: 20px;
      height: 50px;
      display: flex;
      align-items: center;
    }
    .info {
      padding-left: 20px;
    }
    @media screen and (max-width: 1023.98px) {
      .logo {
        max-width: 30px;
      }
      .menu,
      .search,
      .header-button,
      .header-auth {
        display: none;
      }
    }
  }
`;
function getLastName(name) {
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}
const Header = () => {
  const { userInfor } = useAuth();

  const listMenu = [
    {
      url: "/#",
      title: "Home",
    },
    {
      url: "/blog",
      title: "Blog",
    },
    {
      url: "/contact",
      title: "Contact",
    },
  ];

  return (
    <HeaderStyles>
      <div className="container">
        <NavLink to="/">
          <img srcSet="/logo.jpg 2x" alt="Logo Header" className="logo" />
        </NavLink>
        <ul className="menu-list">
          {listMenu.map((items) => (
            <li className="menu-items" key={items.title}>
              <NavLink to={items.url}>{items.title}</NavLink>
            </li>
          ))}
        </ul>
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search posts..."
          />
          <span className="icon-search">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="7.66669"
                cy="7.05161"
                rx="6.66669"
                ry="6.05161"
                stroke="#999999"
                strokeWidth="1.5"
              />
              <path
                d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.666 12.2964C12.9666 12.1544 13.3701 11.8067 13.4438 10.6826"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        {!userInfor ? (
          <NavLink to={"/sign-in"} style={{ width: "250px" }}>
            <Button style={{ maxWidth: "200px" }} className="header-button">
              Dashboard
            </Button>
          </NavLink>
        ) : (
          <span className="info">
            {!userInfor.displayName
              ? null
              : getLastName(userInfor?.displayName)}
          </span>
        )}
      </div>
    </HeaderStyles>
  );
};

export default Header;
