import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import "../styles/GoogleMap.scss";
import cities from "../data/worldcities.json";
import Cluster from "./Cluster";
import CityMarker from "./CityMarker";
import { City } from "../types";

const GoogleMap: React.FC = () => {
  const [shownCities, setShownCities] = useState(Array<JSX.Element>());
  const startLocation = { lat: 40.695321, lng: -74.046293 };

  const handleApiLoaded = (map: any, maps: any) => {
    Cluster.setMarkerCluster(cities, map, maps);

    // Listen to events to show the markers
    map.addListener("bounds_changed", () => setCitiesToShow());
    map.addListener("zoom_changed", () =>
      setTimeout(() => setCitiesToShow(), 1000)
    );
    map.addListener("drag", () => setCitiesToShow());

    // Set location to user location
    navigator.geolocation.getCurrentPosition(function (position) {
      const loc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(loc);
      setCitiesToShow();
    });
  };

  const setCitiesToShow = (): void => {
    const locations = Cluster.getMarkersInView();
    let citiesToShow = new Array<City>();

    // Match locations to cities
    locations.forEach((location) => {
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].lat === location.lat && cities[i].lng === location.lng) {
          citiesToShow.push(cities[i]);
          break;
        }
      }
    });

    setShownCities(
      citiesToShow.map((city) => (
        <CityMarker lat={city.lat} lng={city.lng} city={city} key={city.id} />
      ))
    );
  };

  return (
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={startLocation}
        defaultZoom={9}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {shownCities}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
