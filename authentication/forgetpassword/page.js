"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EmailVerification() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState(localStorage.getItem("showForm"));

  useEffect(() => {
    setShowForm(step === "1");
  }, []);

  const handleSubmit = async (e) => {
    setStatus("loading");

    try {
      const response = await axios.post("/api/auth/forgot-password", { email });

      if (response?.data) {
        toast.success("Verification link sent to your email!");
        setStatus("succeeded");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
      setStatus("failed");
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      localStorage.setItem("showForm", "2");
      router.push("/authentication/set-password");
    }
  }, [status, router]);

  if (step !== "1") {
    router.push("/page-not-found");
  }

  return (
    showForm && (
      <StyledContainer>
        <StyledBox>
          <StyledTitle>Email Verification</StyledTitle>
          <Instructions>
            Please enter your email address. A verification link will be sent to
            your email.
          </Instructions>
          <div>
            <StyledInput
              required
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ErrorText>{status === "failed" && error}</ErrorText>
            <StyledButton
              type="submit"
              disabled={status === "loading"}
              onClick={handleSubmit}
            >
              {status === "loading" ? "Sending..." : "Send Verification Link"}
            </StyledButton>
          </div>
        </StyledBox>
      </StyledContainer>
    )
  );
}

// Styled components
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const StyledTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 16px;
  color: #333;
  text-align: center;
`;

const Instructions = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 24px;
  text-align: center;
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

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#1976d2")};
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#1565c0")};
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 8px;
  text-align: center;
`;

const StyledLink = styled.span`
  color: #1976d2;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: underline;
`;
