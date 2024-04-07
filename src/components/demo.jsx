// import { Image } from "./image";
// import React from "react";
// import PlaceComponent from './search.jsx';
// import { useState } from 'react';


// export const Demo = (props) => {
//   const [results, setResults] = useState([]);
//   return (
//     <div id="portfolio" className="text-center">
//       <div className="container">
//         <div className="section-title">
//           <h2>Demo</h2>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
//             dapibus leonec.
//           </p>
//         </div>
//         <div className="row">
//           <div className="portfolio-items">
//             {props.data
//               ? props.data.map((d, i) => (
//                   <div
//                     key={`${d.title}-${i}`}
//                     className="col-sm-6 col-md-4 col-lg-4"
//                   >
//                     <PlaceComponent setResults={setResults} />
//                   </div>
//                 ))
//               : "Loading..."}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";
import React from "react";
import PlaceComponent from './search.jsx';
import { useState } from 'react';
import PriceButtonComponent from "./pricebuttoncomponent.jsx";
import MaxDistance from "./maxdistance.jsx";
import MinParkingTime from "./minParkingTime.jsx";
import DemoPopup from "./demoPopup.jsx";

export const Demo = () => {
  const [search, setSearch] = useState({});
  const [price, setPrice] = useState(999);
  const [maxDistance, setMaxDistance] = useState(999);
  const [minParkingTime, setMinParkingTime] = useState(999);

  let searchLatitude = 0;
  let searchLongtiude = 0;

  const handlePlaceChanged = (values) => {
    // Handle the values received from PlaceComponent
    setSearch(values);
    searchLatitude = values.geometry.location.lat();
    searchLongtiude = values.geometry.location.lng();
    console.log(values, searchLatitude, searchLongtiude);
  };

  const handlePriceChanged = (values) => {
    // Handle the values received from PlaceComponent
    setPrice(values);
    console.log(values);
  };

  const handleMaxDistanceChanged = (values) => {
    // Handle the values received from PlaceComponent
    setMaxDistance(values);
    console.log(values);
  };

  const handleMinParkingTimeChanged = (values) => {
    // Handle the values received from PlaceComponent
    setMinParkingTime(values);
    console.log(values);
  };

  //TODO: longitude, latitude, max_distance, parking_time, budget ALL required

  return (
    <div id="portfolio" className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="container">
        <div className="section-title">
          <h2 style={{ color: '#FFFFFF' }} >Demo</h2>
          <p style={{ color: '#FFFFFF' }}>
            Where are you headed? Search for a place to get started.
          </p>
        </div>
        {/* PlaceComponent without mapping or iterating */}
        <PlaceComponent onPlaceChanged={ handlePlaceChanged }/>
        <PriceButtonComponent setPrice={ handlePriceChanged }/>
        <MaxDistance setDistance={ handleMaxDistanceChanged }/>
        <MinParkingTime setMinParkingTime={ handleMinParkingTimeChanged }/>
        <DemoPopup latitude={searchLatitude} longitude={searchLongtiude} max_distance={maxDistance} parking_time={minParkingTime} budget={price}/>

      </div>
    </div>
  );
};
