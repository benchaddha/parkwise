import React, { useState } from 'react';

const PriceButtonComponent = ({ setPrice }) => {
    const [selectedPrice, setSelectedPrice] = useState(null);

    const handlePriceClick = (price) => {
        setSelectedPrice(price);
        setPrice(price);
    };

    return (
        <div className="flex flex-row">
            <label htmlFor="price" className="text-4xl text-white px-4">Price:</label>
            <div className="flex flex-row gap-4">
                <button
                    onClick={() => handlePriceClick(4.75)}
                    disabled={selectedPrice === 4.75}
                    className="btn-custom btn-centered bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    $4.75
                </button>
                <button
                    onClick={() => handlePriceClick(11)}
                    disabled={selectedPrice === 11}
                    className="btn-custom btn-centered bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    $11
                </button>
                <button
                    onClick={() => handlePriceClick(14)}
                    disabled={selectedPrice === 14}
                    className="btn-custom btn-centered bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    $14
                </button>
            </div>
        </div>
    );
};

export default PriceButtonComponent;