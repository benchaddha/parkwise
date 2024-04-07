import React, { useState } from 'react';

const MaxDistance = ({ setDistance }) => {
    const [distance, setDistanceState] = useState(0);

    const handleInputChange = (event) => {
        const newDistance = parseInt(event.target.value);
        setDistanceState(newDistance);
        setDistance(newDistance);
    };

    const handleIncrement = () => {
        const newDistance = distance + 1;
        setDistanceState(newDistance);
        setDistance(newDistance);
    };

    const handleDecrement = () => {
        const newDistance = distance - 1;
        setDistanceState(newDistance);
        setDistance(newDistance);
    };

    return (
        <div className="flex flex-row items-center">
            <label className="px-4 text-4xl text-white" htmlFor="distance">Max Minutes Willing to Walk:</label>
            <input
                className="text-4xl p-4"
                type="number"
                id="distance"
                value={distance}
                onChange={handleInputChange}
            />
            <button 
                className="w-10 h-10 px-2 py-1 ml-2 bg-green-500 text-white text-xl font-bold rounded-full focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleIncrement}
            >
                +
            </button>
            <button 
                className="w-10 h-10 px-2 py-1 ml-2 bg-red-500 text-white text-xl font-bold rounded-full focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleDecrement}
            >
                -
            </button>
        </div>
    );
};

export default MaxDistance;