'use client';
import React from 'react';

const SpecialOfferSkeleton = () => {
    return (
        <div className="py-8 bg-blue-500">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    <div className="bg-gray-300 h-8 w-1/3 mx-auto rounded"></div>
                </h2>
                <div className="flex flex-col lg:flex-row items-center justify-center">
                    {/* Left Skeleton Card */}
                    <div className="relative group w-full lg:w-1/2 h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg bg-gray-300 animate-pulse">
                        <div className="w-full h-full bg-gray-400"></div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                                <div className="bg-gray-500 h-4 w-24 rounded"></div>
                            </button>
                        </div>
                    </div>

                    {/* Right Skeleton Text */}
                    <div className="mt-6 lg:mt-0 lg:ml-6 text-center lg:text-left w-full lg:w-1/2">
                        <div className="bg-gray-300 h-6 w-1/2 mx-auto lg:mx-0 rounded mb-4"></div>
                        <div className="bg-gray-300 h-4 w-1/3 mx-auto lg:mx-0 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialOfferSkeleton;
