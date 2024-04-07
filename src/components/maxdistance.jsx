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
        <div>
            <label htmlFor="distance">Max Distance:</label>
            <input
                type="number"
                id="distance"
                value={distance}
                onChange={handleInputChange}
            />
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </div>
    );
};

export default MaxDistance;