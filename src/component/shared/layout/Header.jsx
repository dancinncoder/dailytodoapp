import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;

  background-color: white;
  height: 64px;
  box-shadow: 0 4px 10px #e5e7eb;
  padding: 0 80px;
`;

const InnerHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  color: #1f2937;
`;

const Navigation = styled.div`
  display: flex;
  gap: 24.09px;
`;

const NavigationItem = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  color: #4b5563;
  text-decoration: none;
`;

function Header() {
  return (
    <HeaderContainer>
      <InnerHeaderContainer>
        <Logo href="/">DailyTodo</Logo>
        <Navigation>
          <NavigationItem to="/">Home</NavigationItem>
          <NavigationItem to="/dev">Dev</NavigationItem>
        </Navigation>
      </InnerHeaderContainer>
    </HeaderContainer>
  );
}

export default Header;
