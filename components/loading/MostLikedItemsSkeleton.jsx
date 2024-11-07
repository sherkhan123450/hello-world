'use client'
import React from 'react';

const MostLikedItemsSkeleton = () => {
    return (
        <div className="relative p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-4 sm:text-3xl lg:text-4xl">
                <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar sm:overflow-hidden sm:gap-6 lg:gap-8 justify-between ">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-40 h-40 bg-gray-300 rounded-lg animate-pulse"></div>
                ))}
            </div>
            <div className="absolute top-0 right-0 m-4 sm:m-6 lg:m-8">
                <a href="#" className="flex items-center text-white bg-gray-400 px-4 py-2 rounded-full text-sm sm:text-base lg:text-lg cursor-not-allowed">
                    <span className="text-xl mr-2">→</span>
                    See All
                </a>
            </div>
        </div>
    );
};

export default MostLikedItemsSkeleton;
