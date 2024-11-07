"use client";
import React from "react";
import styled from "styled-components";

const AdminSidebar = ({ currentPage, onPageChange }) => {
  return (
    <SidebarContainer>
      <Sidebar>
        <SidebarHeader>Admin Panel</SidebarHeader>
        <Nav>
          <NavList>
            <NavItem
              style={{ fontWeight: "bolder" }}
              active={currentPage === "dashboard"}
              onClick={() => onPageChange("dashboard")}
            >
              Dashboard
            </NavItem>

            <SectionTitle>Orders</SectionTitle>
            <NavList>
              <NavItem
                active={currentPage === "orders/current"}
                onClick={() => onPageChange("orders/current")}
              >
                Current Orders
              </NavItem>
              <NavItem
                active={currentPage === "orders/previous"}
                onClick={() => onPageChange("orders/previous")}
              >
                Previous Orders
              </NavItem>
            </NavList>
            <SectionTitle>Reservation</SectionTitle>
            <NavList>
              <NavItem
                active={currentPage === "menu/reservations"}
                onClick={() => onPageChange("menu/reservations")}
              >
                Reservations Details
              </NavItem>
            </NavList>
            <SectionTitle>Menu</SectionTitle>
            <NavList>
              <NavItem
                active={currentPage === "menu/create-category"}
                onClick={() => onPageChange("menu/create-category")}
              >
                Create Category
              </NavItem>
              <NavItem
                active={currentPage === "menu/create-food-item"}
                onClick={() => onPageChange("menu/create-food-item")}
              >
                Create Food Item
              </NavItem>
              <NavItem
                active={currentPage === "menu/create-offer"}
                onClick={() => onPageChange("menu/create-offer")}
              >
                Create Offer
              </NavItem>
              <NavItem
                active={currentPage === "menu/create-package"}
                onClick={() => onPageChange("menu/create-package")}
              >
                Create Package
              </NavItem>
              <NavItem
                active={currentPage === "menu/manage-package"}
                onClick={() => onPageChange("menu/manage-package")}
              >
                Manage Package
              </NavItem>
            </NavList>

            <SectionTitle>Users</SectionTitle>
            <NavItem
              active={currentPage === "users"}
              onClick={() => onPageChange("users")}
            >
              Users
            </NavItem>
          </NavList>
        </Nav>
      </Sidebar>
    </SidebarContainer>
  );
};

export default AdminSidebar;

const SidebarContainer = styled.div`
  width: 20%;
  display: flex;
  min-height: 100vh;
  background-color: #f7fafc;

  @media (max-width: 768px) {
    width: 25%;
    min-height: auto;
  }
  @media (max-width: 425px) {
    width: 190px;
  }
`;

const Sidebar = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 250px;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
  background-color: #3b82f6;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  margin-top: 1.5rem;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NavItem = styled.li.attrs({ active: undefined })`
  padding: 0.5rem 1rem 0;
  color: #4a5568;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#edf2f7" : "transparent")};

  &:hover {
    background-color: #edf2f7;
  }
`;

const SectionTitle = styled.div`
  font-weight: bold;
  color: #4a5568;
  padding: 0.5rem 1rem;
  text-decoration: underline;
`;
