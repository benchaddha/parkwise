import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const DemoPopup = ({ latitude, longitude, max_distance, parking_time, budget }) => {
    console.log(latitude, longitude, max_distance, parking_time, budget);
    const [preds, setPreds] = useState([]);

    const userFilters = {
        "longitude": longitude,
        "latitude": latitude,
        "max_distance": max_distance,
        "parking_time": parking_time,
        "budget": budget,
    }

    const renderPreds = () => {
        return (
            <div>
                {preds.map((pred) => (
                    <div>
                        <p>{pred}</p>
                    </div>
                ))}
            </div>
        )
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

            console.log("possible meters: ", possibleMeters.data.data);

            const walkingMeters = await axios.post('https://4gjkn109p8.execute-api.us-east-2.amazonaws.com/beta/getwalking', {
                "userFilters": userFilters,
                "meters": possibleMeters.data.data,
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            );

            console.log(walkingMeters);


            var setPredsTo = await axios.post('https://4gjkn109p8.execute-api.us-east-2.amazonaws.com/beta/preds', {
                "meters": walkingMeters.data.data,
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            );

            setPreds(setPredsTo)

            console.log(preds);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        renderPreds();
    }, [preds]);

    const handlePopupOpen = () => {
        // Call handleClick when the popup opens
        fetchSpots();
    };

    return (
        <Popup trigger={<button className="btn-custom btn-centered bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> get my matches! </button>} onOpen={handlePopupOpen} position="right center">
            <div>
                popup
                { renderPreds() }
            </div>
        </Popup>
    );
};

export default DemoPopup;