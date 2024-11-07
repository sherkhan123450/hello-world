"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Grid } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Link from "next/link";
import useAuthRedirect from "@/app/components/useAuthRedirect";
import styled from "styled-components";
import { Person, Email, Lock, Home } from "@mui/icons-material";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const SignUp = () => {
  useAuthRedirect();
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { error: signUpError, status: signUpStatus } = useSelector(
    (state) => state.auth
  );
  const [userDetails, setUserDetails] = useState({
    address: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const { status } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  const handlePhoneChange = (value) =>
    setUserDetails({ ...userDetails, phoneNumber: value });

  const handleRegister = async () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      address,
    } = userDetails;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !address
    ) {
      setError("All fields are required.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    const resultAction = await dispatch(signUp(userDetails));
    if (signUp.fulfilled.match(resultAction)) {
      setMessage("User registered successfully!");
      router.push("/");
    } else {
      setError(resultAction.error.message || "Registration failed.");
    }
  };

  useEffect(() => {
    let loadingToastId;

    if (status === "loading") {
      loadingToastId = toast.loading("Wait for Registration...");
    } else if (status === "succeeded") {
      toast.dismiss(loadingToastId);
      toast.success("Registered successfully!");
    } else if (status === "failed" || error) {
      toast.dismiss(loadingToastId);
    }
    if (status === "succeeded") {
      router.push("/");
    }
  }, [status, error]);

  return (
    <Wrapper>
      <SignUpContainer>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            {[
              { label: "First Name", name: "firstName", icon: <Person /> },
              { label: "Last Name", name: "lastName", icon: <Person /> },
              { label: "Email", name: "email", icon: <Email /> },
              { label: "Address", name: "address", icon: <Home /> },
              {
                label: "Password",
                name: "password",
                type: "password",
                icon: <Lock />,
              },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
                icon: <Lock />,
              },
            ].map(({ label, name, type = "text", icon }) => (
              <Grid item xs={12} key={name}>
                <StyledTextField
                  variant="outlined"
                  fullWidth
                  label={label}
                  name={name}
                  type={type}
                  value={userDetails[name]}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <span style={{ marginRight: 8 }}>{icon}</span>
                    ),
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <PhoneInput
                international
                defaultCountry="PK"
                value={userDetails.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
                required
                style={{
                  width: "100%",
                  padding: "5px",
                  border: "1px solid black",
                }}
              />
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {signUpStatus === "failed" && signUpError && (
              <p style={{ color: "red" }}>{signUpError}</p>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
            {/* {!signUpError ? (
              <Spinner />
            ) : ( */}
              <RegisterButton
                type="button"
                variant="contained"
                color="primary"
                onClick={handleRegister}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Registration..." : "Register"}
              </RegisterButton>
            {/* )} */}
            <Link style={{ display: "block" }} href="/authentication/login">
              {"Already have an account? Log in"}
            </Link>
          </div>
        </form>
      </SignUpContainer>
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 375px) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
const SignUpContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 400px;
  margin: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 375px) {
    padding: 1rem;
    box-shadow: none;
  }
`;

const StyledTextField = styled(TextField)`
  /* margin-bottom: 1rem; */
  @media (max-width: 375px) {
    input {
      padding: 10px;
    }
  }
`;

const RegisterButton = styled(Button)`
  margin-top: 1rem;
`;

const Spinner = styled(FaSpinner)`
  font-size: 3rem; /* Size of the spinner */
  color: #ffbc40; /* Color of the spinner */
  animation: spin 1s infinite linear; /* Spin animation */

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
