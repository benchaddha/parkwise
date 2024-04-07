import React, { useState } from 'react';

const MinParkingTime = ({ setMinParkingTime }) => {
    const [minParkingTime, setMinParkingTimeState] = useState(0);

    const handleInputChange = (event) => {
        const newminParkingTime = parseInt(event.target.value);
        setMinParkingTimeState(newminParkingTime);
        setMinParkingTime(newminParkingTime);
    };

    const handleIncrement = () => {
        const newminParkingTime = minParkingTime + 1;
        setMinParkingTimeState(newminParkingTime);
        setMinParkingTime(newminParkingTime);
    };

    const handleDecrement = () => {
        const newminParkingTime = minParkingTime - 1;
        setMinParkingTimeState(newminParkingTime);
        setMinParkingTime(newminParkingTime);
    };

    return (
        <div className="flex flex-row items-center">
            <label className="px-4 text-4xl text-white" htmlFor="distance">Max Parking Time (hours)</label>
            <input
                className="text-4xl p-4"
                type="number"
                id="minParkingTime"
                value={minParkingTime}
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

export default MinParkingTime;