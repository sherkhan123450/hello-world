"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import styled from "styled-components";
import { submitContactForm } from "@/app/store/slices/contactSlice";
import { toast } from "react-toastify";

const ContactForm = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { status, message, error } = useSelector((state) => state.contact);
  const [formData, setFormData] = useState(
    user || {
      username: "",
      email: "",
      message: "",
    }
  );

  const userId = user?.userId;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        formData.username &&
        formData.email &&
        formData.message &&
        formData.message.length > 20
      ) {
        const resultAction = await dispatch(submitContactForm(formData));
        console.log(formData, "formData");
      } else {
        toast.error("Message must be at least 20 characters long.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  useEffect(() => {
    let loadingToastId;

    if (status === "loading") {
      loadingToastId = toast.loading("Sending...");
    } else if (status === "succeeded") {
      toast.dismiss(loadingToastId);
      toast.success(message || "Message sent successfully!");
    } else if (status === "failed" || error) {
      toast.dismiss(loadingToastId);
      toast.error(error || "Something went wrong. Please try again.");
    }
  }, [status, message, error]);

  if (!user || !isAuthenticated) {
    return (
      <Form>
        <Link href="/authentication/login" style={{ color: "#0000EE" }}>
          Registration or login required
        </Link>
      </Form>
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="username"
            id="name"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            name="message"
            id="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <div>
          <Button type="submit">
            {status === "loading" ? "Loading..." : "Send Message"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ContactForm;

// Styled components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* space-y-6 */

  @media (max-width: 425px) {
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #4a5568; /* text-gray-700 */
`;

const Input = styled.input`
  margin-top: 0.25rem; /* mt-1 */
  width: 100%;
  padding: 0.5rem; /* p-2 */
  border: 1px solid #d2d6dc; /* border-gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  font-size: 0.875rem; /* sm:text-sm */
  &:focus {
    border-color: #3182ce; /* focus:border-primary */
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5); /* focus:ring-primary */
  }
`;

const TextArea = styled.textarea`
  margin-top: 0.25rem; /* mt-1 */
  width: 100%;
  padding: 0.5rem; /* p-2 */
  border: 1px solid #d2d6dc; /* border-gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  font-size: 0.875rem; /* sm:text-sm */
  resize: none; /* Disable resize */
  &:focus {
    border-color: #3182ce; /* focus:border-primary */
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5); /* focus:ring-primary */
  }
`;

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border: 1px solid transparent;
  border-radius: 0.375rem; /* rounded-md */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  background-color: #3182ce; /* bg-primary */
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #2b6cb0; /* hover:bg-primary-dark */
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.6); /* focus:ring-primary */
  }
`;

const ErrorMessage = styled.span`
  color: red;
`;
