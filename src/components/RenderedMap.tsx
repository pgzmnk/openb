import mapboxgl, { Map } from "mapbox-gl";
import * as turf from "@turf/turf";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Map.module.css";
import { MapContext, MapGeometryContext } from "@/context/context";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API || "";

export default function RenderedMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { map, setMap } = useContext(MapContext);
  const [lng, setLng] = useState(-102.41);
  const [lat, setLat] = useState(18.77);
  const [zoom, setZoom] = useState(4);
  const { mapGeometry, setMapGeometry } = useContext(MapGeometryContext);

  useEffect(() => {
    const getMap = (): mapboxgl.Map => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current || "",
        style: "mapbox://styles/mapbox/satellite-v9", // style URL
        center: [lng, lat],
        zoom: zoom,
      });
      setMap(newMap);
      return newMap;
    };
    var map = getMap();

    if (!map) return;
    if (!mapContainer.current) return;

    // Draw tool
    var Draw = new MapboxDraw();
    map.addControl(Draw, "top-left");
    map.on("draw.create", updateArea);
    map.on("draw.delete", updateArea);
    map.on("draw.update", updateArea);

    function updateArea(e: MouseEvent) {
      const data = Draw.getAll();
      setMapGeometry(data);
      const answer = document.getElementById("calculated-area");
      if (data.features.length > 0) {
        const area = turf.area(data);
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100 / 10000;
        if (answer) {
          answer.innerHTML = `<p><strong>${rounded_area.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> hectares </p>`;
        }
        // to-do: update this.project.geometry
      } else {
        if (answer) {
          answer.innerHTML = "";
        }
        if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
      }
    }
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!map) return;
    if (!mapContainer?.current) return;

    // mapContainer?.current.on("move", () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });
    // mapContainer?.current.once("load", () => {
    //   mapContainer?.current.resize();
    // });
    // mapContainer?.current.once("idle", () => {
    //   mapContainer?.current.resize();
    // });

    // mapContainer?.current.on("load", () => {
    //   mapContainer?.current.addLayer({
    //     id: "rpd_parks",
    //     type: "fill",
    //     source: {
    //       type: "vector",
    //       url: "mapbox://mapbox.3o7ubwm8",
    //     },
    //     "source-layer": "RPD_Parks",
    //     layout: {
    //       visibility: "visible",
    //     },
    //     paint: {
    //       "fill-color": "rgba(61,153,80,0.55)",
    //     },
    //   });
    // });
    // mapContainer?.current.on("style.load", () => {
    //   mapContainer?.current.addSource("mapbox-dem", {
    //     type: "raster-dem",
    //     url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    //     tileSize: 512,
    //     maxzoom: 14,
    //   });
    //   // add the DEM source as a terrain layer with exaggerated height
    //   mapContainer?.current.setTerrain({ source: "mapbox-dem", exaggeration: 15 });
    // });
  });

  return (
    <div>
      <div id="calculated-area"></div>
      <div
        id="map"
        ref={mapContainer}
        className={`${styles.map_container} h-80 w-full`}
      >
        <div className={styles.sidebar}>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  );
}
