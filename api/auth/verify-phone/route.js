import { NextResponse } from "next/server";
import twilio from "twilio";

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Endpoint to send OTP
export async function sendOtp(req) {
    try {
        const { phoneNumber } = await req.json();
        const verification = await client.verify.v2
            .services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: phoneNumber, channel: "sms" });
        return NextResponse.json({ status: verification.status });
    } catch (error) {
        return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
    }
}

// Endpoint to verify OTP
export async function verifyOtp(req) {
    try {
        const { phoneNumber, code } = await req.json();
        const verification_check = await client.verify.v2
            .services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks.create({ to: phoneNumber, code });

        if (verification_check.status === "approved") {
            return NextResponse.json({ message: "Phone number verified successfully" });
        } else {
            return NextResponse.json({ error: "Verification failed" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Verification error" }, { status: 500 });
    }
}
