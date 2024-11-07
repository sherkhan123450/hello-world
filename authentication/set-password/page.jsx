"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SetPassword = () => {
  const router = useRouter();
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showTempPassword, setShowTempPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypeNewPassword, setShowRetypeNewPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(localStorage.getItem("showForm"));

  useEffect(() => {
    setShowForm(step === "2");
  }, []);

  const handleSubmit = async (e) => {
    setError("");

    if (!tempPassword || !newPassword || !retypeNewPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 16) {
      setError("New password must be between 8 to 16 characters long.");
      return;
    }

    if (newPassword !== retypeNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    const passwordData = { tempPassword, newPassword };

    try {
      const response = await axios.post("/api/auth/set-password", passwordData);
      toast.success(response.data.message);
      setTempPassword("");
      setNewPassword("");
      setRetypeNewPassword("");
      localStorage.setItem("showForm", "0");
      router.push("/authentication/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while changing the password."
      );
      console.error(error);
    }
  };

  if (step !== "2") return router.push("/page-not-found");

  return (
    <StyledContainer>
      <StyledBox>
        <StyledTitle>Set Password</StyledTitle>
        <StyledForm>
          {error && <ErrorText>{error}</ErrorText>}
          <StyledInputContainer>
            <StyledLabel>Temporary Password</StyledLabel>
            <StyledInput
              type={showTempPassword ? "text" : "password"}
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              required
            />
            <TogglePasswordButton
              onClick={() => setShowTempPassword(!showTempPassword)}
            >
              {showTempPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </TogglePasswordButton>
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledLabel>New Password</StyledLabel>
            <StyledInput
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TogglePasswordButton
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </TogglePasswordButton>
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledLabel>Retype New Password</StyledLabel>
            <StyledInput
              type={showRetypeNewPassword ? "text" : "password"}
              value={retypeNewPassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
              required
            />
            <TogglePasswordButton
              onClick={() => setShowRetypeNewPassword(!showRetypeNewPassword)}
            >
              {showRetypeNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </TogglePasswordButton>
          </StyledInputContainer>
          <StyledButton onClick={handleSubmit}>Change Password</StyledButton>
        </StyledForm>
      </StyledBox>
    </StyledContainer>
  );
};

export default SetPassword;

// Styled components
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 50%;
  margin: 0 auto;
`;

const StyledTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 16px;
  color: #333;
  text-align: center;
`;

const StyledInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledLabel = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #1976d2;
  font-size: 1.2rem;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1976d2;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 8px;
  text-align: center;
`;

const StyledForm = styled.div`
  width: 100%;
`;
