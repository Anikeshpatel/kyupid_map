import React, { useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl";  // eslint-disable-line import/no-webpack-loader-syntax
import { AREAS_URL, USERS_URL } from "../constants";
import useQuery from "../hooks/useQuery";
import "./KyupidMap.css";
import { getNumberOfUser } from "../utils";

export default function KyupidMap({
  showRevenue
}) {
  const { res: users } = useQuery(USERS_URL);
  const { res: areas } = useQuery(AREAS_URL);

  const map = useRef();

  useEffect(() => {
    if (areas && users) {
      map.current = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/dark-v10", // style URL
        center: [77.5946, 12.9716], // starting position [lng, lat]
        zoom: 12, // starting zoom
      });

      map.current.on("load", () => {
        loadSource();
      });
    }
  }, [areas, users]);
  
  useEffect(() => {
    loadSource()
  }, [showRevenue])

  const loadSource = () => {
    if (map.current?.loaded?.() && areas) {
      const res = getNumberOfUser(areas, users.users);

      res.features.forEach((feature) => {       
        if (!map.current.getSource(feature.properties.name)) {
          map.current.addSource(feature.properties.name, {
            type: "geojson",
            data: feature,
          });
          registerPopupListener(feature)
        }

        if (map.current.getLayer(feature.properties.name)) {
          map.current.removeLayer(feature.properties.name)
        }

        map.current.addLayer({
          id: feature.properties.name,
          type: "fill",
          source: feature.properties.name,
          paint: {
            "fill-color": showRevenue ? feature.properties.color : feature.properties.fillColor,
            "fill-opacity": 0.2,
          },
          filter: ["==", "$type", "Polygon"],
        });

        if (!map.current.getLayer(`${feature.properties.name}.stroke`)) {
          map.current.addLayer({
            id: `${feature.properties.name}.stroke`,
            type: "line",
            source: feature.properties.name,
            layout: {},
            paint: {
              "line-color": "#000",
              "line-width": 2,
            },
          });
        }
      });
    }
  };

  const registerPopupListener = (feature) => {
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'apple-popup mapboxgl-popup-content'
    });

    map.current.on("mouseenter", feature.properties.name, (e) => {
      map.current.getCanvas().style.cursor = "pointer";

      const template = `<ul>
        ${Object.entries(e.features[0].properties).map(entry => 
          entry[0] !== 'color' && entry[0] !== 'fillColor' ?
          ` <li> <b> • ${entry[0]} </b> : ${entry[1]} </li> ` : '').join('')}
      </ul>`
      popup.setLngLat(e.lngLat).setHTML(template).addTo(map.current);
    });

    map.current.on("mouseleave", feature.properties.name, () => {
      map.current.getCanvas().style.cursor = "";
      popup.remove();
    });
  }

  return <div id="map"></div>;
}
