"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { checkAuth } from "@/app/store/slices/authSlice";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logout } from "@/app/store/slices/authSlice";
import {
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaUtensils,
  FaShoppingCart,
  FaClipboardList,
  FaUser,
  FaUserShield,
  FaSignInAlt,
  FaUserPlus,
  FaChevronDown,
} from "react-icons/fa";
import { Button } from "@/app/components/ButtonComponent";
import styled from "styled-components";
import { fetchProfile } from "@/app/store/slices/profileSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated, checkAuthStatus, user } = useSelector(
    (state) => state.auth
  );
  const { profile, status: profileStatus } = useSelector(
    (state) => state.profile
  );

  const [loadingm, setLoadingm] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isReservationDropdownOpen, setReservationDropdownOpen] =
    useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartItemsCount(cartItems.length);
  }, [cartItems]);

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
  };

  const handleLinkClick = (path) => {
    setLoadingm(true);
    // Simulate a loading process
    setTimeout(() => {
      setLoadingm(false);
    }, 2000);

    setLoading(true);
    setActiveLink(path);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    router.push(path); // Navigate to the link
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleReservationDropdown = () => {
    setReservationDropdownOpen((prev) => !prev);
  };
  useEffect(() => {
    // Check auth status and dispatch checkAuth if conditions are met
    if (checkAuthStatus === "idle" && !isAuthenticated && !user?.email) {
      dispatch(checkAuth());
    }
  }, [checkAuthStatus, isAuthenticated, user?.email, dispatch]); // Include all dependencies

  useEffect(() => {
    // Fetch user profile if auth check succeeded and user is authenticated
    if (checkAuthStatus === "succeeded" && isAuthenticated && user?.email) {
      dispatch(fetchProfile(user.email));
    }
  }, [checkAuthStatus, isAuthenticated, user?.email, dispatch]);

  return (
    <NavbarContainer
      style={{
        cursor: loadingm ? "wait" : "pointer",
        opacity: loadingm ? 0.5 : 1,
      }}
    >
      <Container>
        <LogoSection>
          <Logo>DSK ResTurent</Logo>
        </LogoSection>

        <MenuDesktop>
          <MenuList>
            {[
              { label: "Home", icon: FaHome, path: "/" },
              { label: "About Us", icon: FaInfoCircle, path: "/about" },
              { label: "Contact", icon: FaPhone, path: "/contact" },
              { label: "Menu", icon: FaUtensils, path: "/foodItems" },
              { label: "Cart", icon: FaShoppingCart, path: "/cart" },
              { label: "Orders", icon: FaClipboardList, path: "/orderedItems" },
            ].map((menu, idx) => (
              <MenuItem key={idx}>
                <MenuLink
                  onClick={() => handleLinkClick(menu.path)}
                  active={activeLink === menu.path}
                >
                  <menu.icon className="mr-2" />
                  {menu.label}
                </MenuLink>
              </MenuItem>
            ))}

            {/* Reservation Dropdown */}
            <MenuItem>
              <Dropdown disabled={!user}>
                <DropdownToggle
                  onClick={toggleReservationDropdown}
                  disabled={!user}
                >
                  <FaUser className="mr-2" />
                  Reservation
                  <FaChevronDown className="ml-1" />
                </DropdownToggle>
                {isReservationDropdownOpen &&
                  user && ( // Show menu only if user is found
                    <DropdownMenu>
                      <DropdownItem>
                        <MenuLink
                          onClick={() =>
                            handleLinkClick("/reservation/booking")
                          }
                          active={activeLink === "/reservation/booking"}
                        >
                          Booking
                        </MenuLink>
                      </DropdownItem>
                      <DropdownItem>
                        <MenuLink
                          onClick={() =>
                            handleLinkClick("/reservation/your-reservations")
                          }
                          active={
                            activeLink === "/reservation/your-reservations"
                          }
                        >
                          Your Reservation
                        </MenuLink>
                      </DropdownItem>
                    </DropdownMenu>
                  )}
              </Dropdown>
            </MenuItem>
          </MenuList>
        </MenuDesktop>

        <UserActions>
          {isAuthenticated ? (
            <>
              <MenuItem>
                <Buttond onClick={handleLogOut}>
                  <FaUser className="mr-2" />
                  Logout
                </Buttond>
              </MenuItem>
              <MenuItem>
                <MenuLink href="/profile">
                  <ButtonAdmin>
                    <FaUserShield className="mr-2" />
                  </ButtonAdmin>
                </MenuLink>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <MenuLink
                  onClick={() => handleLinkClick("/authentication/login")}
                >
                  <Buttond>
                    <FaSignInAlt className="mr-2" />
                    Login
                  </Buttond>
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink
                  onClick={() =>
                    handleLinkClick("/authentication/registration")
                  }
                >
                  <Buttond>
                    <FaUserPlus className="mr-2" />
                    Register
                  </Buttond>
                </MenuLink>
              </MenuItem>
            </>
          )}
        </UserActions>
        <MobileMenuButton onClick={toggleMobileMenu}>
          <MenuIcon
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </MenuIcon>
        </MobileMenuButton>
      </Container>

      {isMobileMenuOpen && (
        <MobileMenu>
          <MenuList>
            {[
              { label: "Home", icon: FaHome, path: "/" },
              { label: "About Us", icon: FaInfoCircle, path: "/about" },
              { label: "Contact", icon: FaPhone, path: "/contact" },
              { label: "Menu", icon: FaUtensils, path: "/foodItems" },
              { label: "Cart", icon: FaShoppingCart, path: "/cart" },
              { label: "Orders", icon: FaClipboardList, path: "/orderedItems" },
            ].map((menu, idx) => (
              <MenuItem key={idx}>
                <MenuLink
                  onClick={() => handleLinkClick(menu.path)}
                  active={activeLink === menu.path}
                >
                  <menu.icon className="mr-2" />
                  {menu.label}
                </MenuLink>
              </MenuItem>
            ))}

            {/* Mobile Reservation Dropdown */}
            <MenuItem>
              <Dropdown>
                <DropdownToggle onClick={toggleReservationDropdown}>
                  <FaUser className="mr-2" />
                  Reservation
                  <FaChevronDown className="ml-1" />
                </DropdownToggle>
                {isReservationDropdownOpen && (
                  <DropdownMenu>
                    <DropdownItem>
                      <MenuLink
                        onClick={() => handleLinkClick("/reservation/booking")}
                        active={activeLink === "/reservation/booking"}
                      >
                        Booking
                      </MenuLink>
                    </DropdownItem>
                    <DropdownItem>
                      <MenuLink
                        onClick={() =>
                          handleLinkClick("/reservation/your-reservations")
                        }
                        active={activeLink === "/reservation/your-reservations"}
                      >
                        Your Reservation
                      </MenuLink>
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </Dropdown>
            </MenuItem>

            {isAuthenticated ? (
              <>
                <MenuItem>
                  <Buttond onClick={handleLogOut}>
                    <FaUser className="mr-2" />
                    Logout
                  </Buttond>
                </MenuItem>
                <MenuItem>
                  <MenuLink href="/profile">
                    <ButtonAdmin>
                      <FaUserShield className="mr-2" />
                    </ButtonAdmin>
                  </MenuLink>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <MenuLink
                    onClick={() => handleLinkClick("/authentication/login")}
                  >
                    <Buttond>
                      <FaSignInAlt className="mr-2" />
                      Login
                    </Buttond>
                  </MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink
                    onClick={() =>
                      handleLinkClick("/authentication/registration")
                    }
                  >
                    <Buttond>
                      <FaUserPlus className="mr-2" />
                      Register
                    </Buttond>
                  </MenuLink>
                </MenuItem>
              </>
            )}
          </MenuList>
        </MobileMenu>
      )}
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.nav`
  padding: 1rem;
  width: 100%;
  z-index: 30;
  background-color: transparent;
  color: white;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 888px) {
    justify-content: flex-start; /* Ensure the logo stays left, and children move right */
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h3`
  font-family: "Trade Winds";
  color: white;
  text-shadow: -1px -1px 0 orange, 1px -1px 0 orange, -1px 1px 0 orange,
    1px 1px 0 orange;
`;

const MobileMenuButton = styled.button`
  display: block;
  cursor: pointer;
  background: transparent;
  border: none;
  color: #ffbc40;
  font-size: 1.5rem;
  @media (min-width: 888px) {
    display: none;
  }
`;

const MenuIcon = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
`;

const MenuDesktop = styled.div`
  display: none;
  @media (min-width: 888px) {
    display: flex;
    align-items: center;
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  @media (max-width: 888px) {
    flex-direction: column;
    margin-left: auto;
    width: max-content;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 78px;
    right: 0;
    z-index: 1000;
    padding: 20px;
  }
`;

const MenuItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;

  @media (max-width: 1024px) {
    font-size: 12px;
  }

  @media (max-width: 888px) {
    font-size: 18px;
    margin-top: 7px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border-radius: 5px;
    }
  }
`;

const MenuLink = styled.span.withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop), // Prevent 'active' from being forwarded to the DOM
})`
  display: flex;
  align-items: center;
  color: ${(props) => (props.active ? "#f39d00" : "#ffc55a")};
  cursor: pointer;
  text-decoration: none; /* Remove default underline */
  position: relative; /* Create a positioning context for the pseudo-element */
  transition: color 0.3s;

  &:hover {
    color: #f39d00;
  }

  /* Add a pseudo-element for the underline */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0; /* Position it at the bottom of the text */
    height: 2px; /* Thickness of the underline */
    background-color: ${(props) =>
    props.active && "#f39d00"}; /* Match the text color */
    transform: translateY(4px); /* Adjust this value to increase/decrease gap */
    transition: background-color 0.3s; /* Smooth transition for underline color */
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  color: black;
`;

const DropdownToggle = styled.div`
  display: flex;
  align-items: center;
  color: #ffbc40;
  text-decoration: none;
  width: min-content;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  background-color: #333;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 888px) {
    margin-left: auto;
  }
`;
const Buttond = styled(Button)`
  @media (max-width: 425px) {
    transform: scale(0.8);
    margin-right: -16px;
  }
`;

const ButtonAdmin = styled(Button)`
  background-color: #ffbc40;
  color: black;
  @media (max-width: 425px) {
    transform: scale(0.8);
    margin-right: -16px;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  @media (min-width: 888px) {
    display: none;
  }
  @media (max-width: 888px) {
    padding-top: 0;
  }
`;
