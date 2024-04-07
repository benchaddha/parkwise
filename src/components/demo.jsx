"use client";
import React from "react";
import PlaceComponent from './search.jsx';
import { useState } from 'react';
import PriceButtonComponent from "./pricebuttoncomponent.jsx";
import MaxDistance from "./maxdistance.jsx";
import MinParkingTime from "./minParkingTime.jsx";
import DemoPopup from "./demoPopup.jsx";

export const Demo = () => {
  const [price, setPrice] = useState(999);
  const [maxDistance, setMaxDistance] = useState(999);
  const [minParkingTime, setMinParkingTime] = useState(999);
  const [searchLatitude, setSearchLatitude] = useState(0);
  const [searchLongitude, setSearchLongitude] = useState(0);

  const handlePlaceChanged = (values) => {
    // Handle the values received from PlaceComponent
    setSearchLatitude(values.geometry.location.lat());
    setSearchLongitude(values.geometry.location.lng());
    console.log(values, searchLatitude, searchLongitude);
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
        <div className="text-4xl text-white section-title">
        <h2 className="text-2xl xl:text-4xl" style={{ color: '#FFFFFF' }}>Demo</h2>
          <div className="text-2xl text-white">
            Where are you headed? Search for a place to get started.
          </div>
        </div>
        <PlaceComponent onPlaceChanged={ handlePlaceChanged }/>
        <div className="pt-8 flex flex-col gap-4 justify-center align-center items-center">
          <PriceButtonComponent setPrice={ handlePriceChanged }/>
          <MaxDistance setDistance={ handleMaxDistanceChanged }/>
          <MinParkingTime setMinParkingTime={ handleMinParkingTimeChanged }/>
          <DemoPopup latitude={searchLatitude} longitude={searchLongitude} max_distance={maxDistance} parking_time={minParkingTime} budget={price}/>
        </div>
      </div>
    </div>
  );
};
