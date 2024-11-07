"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import styled from "styled-components";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, status, message, error } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userDetails.email.trim() && userDetails.password) {
      await dispatch(login(userDetails));
    }
  };

  const handleForgot = () => {
    localStorage.setItem("showForm", "1");
  };

  // Initialize toastId outside of useEffect to persist across renders
  let loadingToastId;
  useEffect(() => {
    localStorage.setItem("showForm", "0");
    const formVisible = localStorage.getItem("showForm");
    setShowForm(formVisible === "0");

    if (status === "loading") {
      loadingToastId = toast.loading("Wait to login...");
    }

    if (status === "succeeded" && user) {
      if (loadingToastId) toast.dismiss(loadingToastId);
      toast.success(message || "Logged in successfully!");
      router.push("/");
    }

    if (status === "failed" || error) {
      if (loadingToastId) toast.dismiss(loadingToastId);
      toast.error(error || "Login failed. Please try again.");
    }
  }, [status, message, error, router]);

  return (
    <Wrapper>
      <FormWrapper>
        <StyledAvatar>
          <FaSpinner />
        </StyledAvatar>
        <Title>Sign In</Title>
        <Subtitle>
          Welcome back! Please enter your credentials to sign in.
        </Subtitle>
        <form onSubmit={handleSubmit} noValidate>
          <StyledInput
            type="email"
            name="email"
            placeholder="Email Address"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
          <StyledInput
            type="password"
            name="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={handleChange}
            required
          />

          {status === "failed" && error && <ErrorText>{error}</ErrorText>}

          {status === "loading" ? (
            <Spinner />
          ) : (
            <StyledButton type="submit">Sign In</StyledButton>
          )}
        </form>
        <LinksContainer>
          <Link
            href="/authentication/forgetpassword"
            passHref
            onClick={handleForgot}
          >
            <StyledLink>Forgot password?</StyledLink>
          </Link>
          <Link href="/authentication/registration" passHref>
            <StyledLink>{"Don't have an account? Sign Up"}</StyledLink>
          </Link>
        </LinksContainer>
      </FormWrapper>
    </Wrapper>
  );
}

// Styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const StyledAvatar = styled.div`
  background-color: #ffbc40;
  padding: 16px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #757575;
  margin-bottom: 32px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #1976d2;
  }
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
  &:hover {
    background-color: #1565c0;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  width: 100%;
`;

const StyledLink = styled.span`
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 8px;
  text-align: center;
`;

const Spinner = styled(FaSpinner)`
  font-size: 3rem;
  color: #ffbc40;
  animation: spin 1s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
