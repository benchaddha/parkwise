import React, { useState } from 'react';

const PriceButtonComponent = ({ setPrice }) => {
    const [selectedPrice, setSelectedPrice] = useState(null);

    const handlePriceClick = (price) => {
        setSelectedPrice(price);
        setPrice(price);
    };

    return (
        <div>
            <button
                onClick={() => handlePriceClick(4.75)}
                disabled={selectedPrice === 4.75}
            >
                $4.75
            </button>
            <button
                onClick={() => handlePriceClick(11)}
                disabled={selectedPrice === 11}
            >
                $11
            </button>
            <button
                onClick={() => handlePriceClick(14)}
                disabled={selectedPrice === 14}
            >
                $14
            </button>
        </div>
    );
};

export default PriceButtonComponent;