import React from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const DemoPopup = ({ latitude, longitude, max_distance, parking_time, budget }) => {
    const fetchSpots = async () => {
        try {
            console.log("what's up bro");
            const possibleMeters = await axios.post('https://4gjkn109p8.execute-api.us-east-2.amazonaws.com/beta/getmeters', {
                latitude,
                longitude,
                max_distance,
                parking_time,
                budget
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(possibleMeters);
            // Render the popup with the response data
            // You can use a library like react-popup for this

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePopupOpen = () => {
        // Call handleClick when the popup opens
        fetchSpots();
    };

    return (
        <Popup trigger={<button> Trigger </button>} onOpen={handlePopupOpen} position="right center">
            <div>Popup content here !!</div>
        </Popup>
    );
};

export default DemoPopup;