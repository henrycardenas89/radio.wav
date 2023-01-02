import React, { useState, useEffect } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import filters from "../data/filters";
import defaultImg from "../assets/waves.jpg";
import RadioPlayer from "./RadioPlayer";

function Radio() {
  const [stations, setStations] = useState([]);
  const [stationFilter, setStationFilter] = useState("all");

  useEffect(() => {
    radioApi(stationFilter).then((data) => {
      setStations(data);
    });
  }, [stationFilter]);

  const radioApi = async (stationFilter) => {
    try {
      const api = new RadioBrowserApi("My Radio App");
      const stations = await api.searchStations({
        limit: 100,
        tag: stationFilter,
      });

      return stations;
    } catch (err) {
      console.log(err);
    }
  };
  radioApi();

  const setDefaultSrc = (evt) => {
    evt.target.src = defaultImg;
  };

  const station = stations[Math.floor(Math.random() * stations.length)];
  console.log(station);

  return (
    <div className="">
      <div className="flex flex-wrap justify-around space-y-2 p-10">
        {filters.map((filter, i) => {
          return (
            <button
              className="bg-white flex justify-center place-items-center text-center text-xl dark:text-black border-2 border-indigo-300/75 w-40 p-1 rounded-lg hover:bg-gradient-to-r from-blue-300 to-violet-300 hover:text-white "
              key={i}
              onClick={() => setStationFilter(filter)}
            >
              {filter}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        {stations && station ? (
          <div className="grid gap-2 place-items-center">
            <img
              className="rounded-full h-40"
              src={station.favicon}
              onError={setDefaultSrc}
            />

            <div className="text-base md:text-xl mb-3 font-medium">
              {station.country}
            </div>
            <RadioPlayer station={station} />
          </div>
        ) : (
          <div className="grid gap-20 place-items-center">
            Radio in 3...2...1...
          </div>
        )}
      </div>
    </div>
  );
}

export default Radio;
