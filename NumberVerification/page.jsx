// 'use client'
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { sendVerificationCode, verifyOtp } from '@/app/store/slices/phoneVerificationSlice';
// import { FaUser } from 'react-icons/fa';
// import Link from 'next/link';
//
// const PhoneVerificationPopup = () => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [otp, setOtp] = useState('');
//     const [showOtpInput, setShowOtpInput] = useState(false);
//     const dispatch = useDispatch();
//     const { isVerified, error } = useSelector((state) => state.phoneVerification);
//
//     const handleSendCode = () => {
//         dispatch(sendVerificationCode(phoneNumber));
//         setShowOtpInput(true);
//     };
//
//     const handleVerifyOtp = () => {
//         dispatch(verifyOtp({ phoneNumber, otp }));
//     };
//
//     return (
//         <div className="phone-verification-popup">
//             {!showOtpInput ? (
//                 <div>
//                     <input
//                         type="text"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         placeholder="Enter phone number"
//                         className="input-class"
//                     />
//                     <button onClick={handleSendCode} className="btn-class">
//                         Send Verification Code
//                     </button>
//                 </div>
//             ) : (
//                 <div>
//                     <input
//                         type="text"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         placeholder="Enter OTP"
//                         className="input-class"
//                     />
//                     <button onClick={handleVerifyOtp} className="btn-class">
//                         Verify OTP
//                     </button>
//                 </div>
//             )}
//             {error && <p className="error-class">{error}</p>}
//             {isVerified && <p className="success-class">Phone number verified successfully!</p>}
//         </div>
//     );
// };
//
// const ProfileButton = () => {
//     const [showPopup, setShowPopup] = useState(false);
//
//     return (
//         <>
//             <Link href="#">
//                 <span className="hover:text-gray-300 flex items-center text-sm" onClick={() => setShowPopup(true)}>
//                     <FaUser className="mr-2" /> Profile
//                 </span>
//             </Link>
//             {showPopup && <PhoneVerificationPopup />}
//         </>
//     );
// };
//
// export default ProfileButton;
import React from 'react';

const Page = () => {
    return (
        <div>
            
        </div>
    );
};

export default Page;