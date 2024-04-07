import React from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const DemoPopup = ({ latitude, longitude, max_distance, parking_time, budget }) => {
    console.log(latitude, longitude, max_distance, parking_time, budget);

    const userFilters = {
        "longitude": longitude,
        "latitude": latitude,
        "max_distance": max_distance,
        "parking_time": parking_time,
        "budget": budget,
    }
    const fetchSpots = async () => {
        try {
            console.log("what's up bro");
            const possibleMeters = await axios.post('https://4gjkn109p8.execute-api.us-east-2.amazonaws.com/beta/getmeters', {
                "longitude": longitude,
                "latitude": latitude,
                "max_distance": max_distance,
                "parking_time": parking_time,
                "budget": budget,
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            );
            console.log(possibleMeters);

            const walkingMeters = await axios.post('https://4gjkn109p8.execute-api.us-east-2.amazonaws.com/beta/getwalking', {
                "userFilters": {
                    "longitude": longitude,
                    "latitude": latitude,
                    "max_distance": max_distance,
                    "parking_time": parking_time,
                    "budget": budget,
                },
                "meters": possibleMeters.data,
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            );

            console.log(walkingMeters);

            /*
            const preds = await axios.post('https://4gjkn109p8.execute-api.us-east-2.amazonaws.com/beta/getpredictions', {
                walkingMeters,
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            );
            */

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePopupOpen = () => {
        // Call handleClick when the popup opens
        fetchSpots();
    };

    return (
        <Popup trigger={<button className="btn-custom btn-centered bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> get my matches! </button>} onOpen={handlePopupOpen} position="right center">
            <div>matches data:</div>
        </Popup>
    );
};

export default DemoPopup;