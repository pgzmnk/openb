import { createContext, useRef, useState } from "react";
import { FeatureCollection } from "geojson";
import mapboxgl, { Map } from "mapbox-gl";

interface MapContextType {
  map: Map | null;
  setMap: (map: Map) => void;
}

interface MapGeometryContextType {
  mapGeometry: FeatureCollection | null;
  setMapGeometry: (mapGeometry: FeatureCollection) => void;
}

export const MapContext = createContext<MapContextType>({
  map: null,
  setMap: function (map: mapboxgl.Map): void {
    throw new Error("Function not implemented.");
  }
});

export const MapGeometryContext = createContext<MapGeometryContextType>({
  mapGeometry: null,
  setMapGeometry: () => { },
});

export default function Context({ children }: { children: React.ReactNode }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null); // Reference to the map container
  const [map, setMap] = useState<Map | null>(null);
  const [mapGeometry, setMapGeometry] = useState<FeatureCollection | null>(
    null,
  );

  return (
    <MapContext.Provider value={{ map, setMap }}>
      <MapGeometryContext.Provider value={{ mapGeometry, setMapGeometry }}>
        {children}
      </MapGeometryContext.Provider>
    </MapContext.Provider>
  );
}
