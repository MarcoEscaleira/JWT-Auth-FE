import styled from "styled-components";

export const activeNavLink = {
  borderBottom: "1px solid chocolate",
  color: "#000"
};

export const Container = styled.header`
  max-width: 100%;
  margin-bottom: 10px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
`;

export const LogoWrapper = styled.div`
  width: 55px;
  height: 45px;
  display: flex;
  justify-content: flex-start;
`;

export const MenuWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 16px;
  align-items: center;
  flex: 1;

  a {
    color: chocolate;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-right: 16px;

    &:hover {
      color: #000;
      border-bottom: 1px solid chocolate;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 30px;
`;
