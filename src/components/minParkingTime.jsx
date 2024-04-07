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
        <div>
            <label htmlFor="distance">Min Parking Time (minutes)</label>
            <input
                type="number"
                id="minParkingTime"
                value={minParkingTime}
                onChange={handleInputChange}
            />
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </div>
    );
};

export default MinParkingTime;