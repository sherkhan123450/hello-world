"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../store/slices/authSlice";
import { fetchProfile, updateProfile } from "../store/slices/profileSlice";
import styled from "styled-components";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profileStatus = useSelector((state) => state.profile.status);
  const profileError = useSelector((state) => state.profile.error);

  const [editable, setEditable] = useState(false);
  const [localProfile, setLocalProfile] = useState(
    profile || {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
    }
  );

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchProfile(user.email));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (profile) {
      setLocalProfile(profile);
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/authentication/login");
  };

  const handleSave = () => {
    dispatch(updateProfile(localProfile));
    setEditable(false);
  };

  if (!isAuthenticated) {
    return <div>You need to be logged in to view this page.</div>;
  }

  if (profileStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (profileStatus === "failed") {
    return <div>Failed to load profile.</div>;
  }

  return (
    <ProfileContainer>
      <Card>
        <Title>Profile</Title>

        {profileError && <ErrorMessage>{profileError}</ErrorMessage>}

        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            value={localProfile.firstName || ""}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, firstName: e.target.value })
            }
            disabled={!editable}
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            value={localProfile.lastName || ""}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, lastName: e.target.value })
            }
            disabled={!editable}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={localProfile.email || ""}
            disabled
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            value={localProfile.address || ""}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, address: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="tel"
            id="phoneNumber"
            value={localProfile.phoneNumber || ""}
            onChange={(e) =>
              setLocalProfile({
                ...localProfile,
                phoneNumber: e.target.value,
              })
            }
            disabled={!editable}
          />
        </div>

        <div className="flex justify-between">
          <Button
            primary
            onClick={editable ? handleSave : () => setEditable(true)}
          >
            {editable ? "Save" : "Edit"}
          </Button>
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>
    </ProfileContainer>
  );
};

export default Profile;

// Styled components
const ProfileContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;

  @media (max-width: 425px) {
    display: block;
    height: auto;
    width: 100%;
    margin: 0 auto;
    padding: 0.8rem;
  }

  @media (max-width: 375px) {
    margin: 0 auto;
    padding: 0.8rem 0.4rem;
  }
`;

const Card = styled.div`
  width: 50vw;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: 425px) {
    width: 100%;
    padding: 25px;
  }

  @media (max-width: 375px) {
    padding: 18px;
  }
  @media (max-width: 320px) {
    padding: 8px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 375px) {
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
  &:disabled {
    background-color: #e5e7eb;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  background-color: ${(props) =>
    props.primary ? "#3b82f6" : props.danger ? "#ef4444" : "#e5e7eb"};
  color: white;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#2563eb" : props.danger ? "#dc2626" : "#d1d5db"};
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  margin-bottom: 1rem;
`;
