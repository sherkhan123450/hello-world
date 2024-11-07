'use client'
import React, {useEffect , useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast , ToastContainer } from 'react-toastify';
import {addItemToCart} from "@/app/store/slices/cartSlice";


const AddToCartButton = ({item }) => {
    const dispatch = useDispatch();
    const { isAuthenticated  } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.profile);
    console.log(profile , 'profile')

    const isVerified = true
    const [userData , setUserData] = useState(null);

    const handleAddToCart = () => {
        console.log("isAuthenticated:", isAuthenticated);
        console.log("userdata:", userData);

        if (!isAuthenticated) {
            toast.error('Log in first');
            alert('Log in first')
            return;
        }

        if (!isVerified) {
            toast.error('Verify phone number');
            alert('Verify phone number')
            return;
        }

        if (userData && userData.userId) {
            try {
                dispatch(addItemToCart({ userId: profile._id, item }));
                toast.success('Item added to cart');
                alert('Item added to cart')
            } catch (error) {
                alert('Failed to add item to cart')
                toast.error('Failed to add item to cart');
            }
        }
    };
    useEffect(() => {
        setUserData(profile)
        console.log(profile , 'user')
    }, [isAuthenticated ,  profile]);

    return (
        <>

            <ToastContainer />
            <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
            >
                Add to Cart
            </button></>

    );
};

export default AddToCartButton;