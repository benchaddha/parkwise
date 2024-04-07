import React, { useState } from 'react';
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
                <div className="font-bold text-red-700 text-4xl">your best bets are as follows:</div>
                {preds.map((pred, index) => (
                    <div key={index}>
                        <div className="text-blue-400">
                            <p><strong>address:</strong> {pred.address}</p>
                            <p><strong>current spots:</strong> {pred.currentSpots}</p>
                            { /* <p><strong>latitude:</strong> {pred.latitude}</p>
                            <p><strong>longitude:</strong> {pred.longitude}</p> *} */}
                            <p><strong>max spots:</strong> {pred.maxAvailableSpots}</p>
                        </div>
                        <p className="text-purple-600"><strong>walking time:</strong> {pred.walkingTime.toFixed(1)}</p>
                        <p className="text-3xl text-green-600"><strong>availability scores:</strong></p>
                        <div className="text-green-500">
                            <p><strong>this hour: </strong> {pred.predictions[0].probability.toFixed(1)} </p>
                            <p><strong>next hour </strong> {pred.predictions[1].probability.toFixed(1)} </p>
                            <p><strong>in two hours: </strong> {pred.predictions[2].probability.toFixed(1)} </p>
                        </div>

                        <p></p>~{"\n"}
                    </div>
                ))}
            </div>
        );
    };    

    

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

            console.log("Set preds to: ", setPredsTo);
            console.log("Set preds to.data: ", setPredsTo.data);
            console.log("Set preds to.data.data: ", setPredsTo.data.data);


            setPreds(setPredsTo.data.data);

            console.log(preds);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePopupOpen = () => {
        // Call handleClick when the popup opens
        fetchSpots();
    };

    return (
        <Popup width="100%" trigger={<button className="btn-custom btn-centered bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> get my matches! </button>} onOpen={handlePopupOpen} position="right center" modal closeOnDocumentClick overlayStyle={{ background: 'rgba(0,0,0,0.5)' }} arrowStyle={{ color: '#000' }}>
            <div className="p-4">
                <div className="max-h-[600px] overflow-y-auto">
                    <p>awaiting matches... [give about 10 seconds for AWS]</p>
                    { renderPreds() }
                </div>
            </div>
        </Popup>
    );
};

export default DemoPopup;