// src/pages/auth/verify-email.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;  // Get the token from query string
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`, {
        method: "GET",
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Email verified successfully!");
        // Optionally redirect to login page
        router.push("/auth/login");
      } else {
        toast.error(data.error || "Failed to verify email.");
      }
    } catch (error) {
      toast.error("An error occurred while verifying your email.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Verifying your email...</p>;
  }

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{loading ? "Processing..." : "Your email has been verified!"}</p>
    </div>
  );
};

export default VerifyEmail;
