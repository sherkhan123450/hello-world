import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="relative w-full overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out">
                {Array(3).fill(0).map((_, index) => (
                    <div key={index} className="min-w-full h-[60vh] relative bg-gray-200 animate-pulse">
                        <div className="absolute inset-0 bg-gray-300"></div>
                        <div className="absolute inset-0 bg-gray-400 bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
                            <div className="h-6 bg-gray-500 w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-500 w-2/3"></div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10">
                &lt;
            </button>
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10">
                &gt;
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {Array(3).fill(0).map((_, index) => (
                    <div key={index} className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-white' : 'bg-gray-500'}`}></div>
                ))}
            </div>
        </div>
    );
};

export default SkeletonLoader;