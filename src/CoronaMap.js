import React, { useState, useEffect } from "react";
import { HeatMap } from "@ant-design/maps";
import countryData from "./geoData/countriesData.json";

const DemoHeatMap = React.memo(({ covidData }) => {

  const { country_codes } = countryData;

  const objArray = [];

  country_codes.map(
    (item) =>
      covidData &&
      covidData
        .filter((a) => a.country === item.country)
        .map((x) => 
          objArray.push({
            ...x,
            properties: {
              cases: x.cases
            },
            lat: item.latitude,
            lng: item.longitude,
            t: item.numeric,
            n: item.country,
          })
        )
  );

  console.log(objArray);

  const config = {
    map: {
      type: "mapbox",
      style: "light",
      zoom: 3.8,
      center: [78.3, 22],
      pitch: 0,
    },
    source: {
      data: objArray,
      parser: { type: "json", x: "lng", y: "lat" },
    },
    size: {
      field: "cases",
      value: [0, 100],
    },
    style: {
      intensity: 2,
      radius: 15,
      opacity: 1,
      colorsRamp: [
        {
          color: "rgba(33,102,172,0.0)",
          position: 0,
        },
        {
          color: "rgb(103,169,207)",
          position: 0.2,
        },
        {
          color: "rgb(209,229,240)",
          position: 0.4,
        },
        {
          color: "rgb(253,219,199)",
          position: 0.6,
        },
        {
          color: "rgb(239,138,98)",
          position: 0.8,
        },
        {
          color: "rgb(178,24,43,1.0)",
          position: 1,
        },
      ],
    },
    zoom: {
      position: "bottomright",
    },
    legend: {
      position: "bottomleft",
    },
  };

  return <HeatMap {...config} />;
});

export default DemoHeatMap;
