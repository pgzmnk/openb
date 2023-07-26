import { useEffect, useContext } from "react";
import { Project } from "@/interfaces";
import { FeatureCollection } from "geojson";
var GeoJSON = require("geojson");
import RenderedMap from "@/components/RenderedMap";
import Link from "next/link";
import { LngLatLike } from "mapbox-gl";

import { MapContext, MapGeometryContext } from "@/context/context";

export default function ProjectOverview(project: Project) {
  const { mapGeometry, setMapGeometry } = useContext(MapGeometryContext);
  const { map, setMap } = useContext(MapContext);

  // this useEffect calls setMapGeometry with project.geometry
  useEffect(() => {
    try {
      const _geometry = GeoJSON.parse(JSON.parse(project.geometry || ""), {
        Polygon: "polygon",
      });
      const geometry = _geometry.properties?.features[0].geometry;
      const centroid: LngLatLike = geometry.coordinates[0][0] || [0, 0];
      setMapGeometry(geometry as FeatureCollection);


      if (map) {
        console.log("set center at", centroid)
        map.setCenter(centroid);
        map.on('load', () => {
          // Add a data source containing GeoJSON data.
          map.addSource('maine', {
            'type': 'geojson',
            'data': _geometry.properties?.features[0]
          });

          // Add a new layer to visualize the polygon.
          map.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': 'maine', // reference the data source
            'layout': {},
            'paint': {
              'fill-color': '#0080ff', // blue color fill
              'fill-opacity': 0.5
            }
          });
          // Add a black outline around the polygon.
          map.addLayer({
            'id': 'outline',
            'type': 'line',
            'source': 'maine',
            'layout': {},
            'paint': {
              'line-color': '#000',
              'line-width': 3
            }
          });
        });
      }

    } catch (error) {
      console.error(error);
      location.reload()
    }
  }, [map]);

  return (
    <div class="container mx-auto p-10">
      <div className="bg-white rounded-xl">
        <div className="pt-6">
          {/* <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            {product.breadcrumbs.map((breadcrumb) => (
                                <li key={breadcrumb.id}>
                                    <div className="flex items-center">
                                        <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                            {breadcrumb.name}
                                        </a>
                                        <svg
                                            width={16}
                                            height={20}
                                            viewBox="0 0 16 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="h-5 w-4 text-gray-300"
                                        >
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                            <li className="text-sm">
                                <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {product.name}
                                </a>
                            </li>
                        </ol>
                    </nav> */}

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 rounded-lg lg:block">
              <img
                src="https://images.unsplash.com/photo-1511497584788-876760111969"
                alt="forest picture"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="lg:grid lg:grid-cols-1 lg:gap-y-8 col-span-2">
              <RenderedMap />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {project.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Project information</h2>
              <p className="text-m tracking-tight text-gray-900">
                Score: {project.score | "n/a"}
              </p>
              <p className="text-m tracking-tight text-gray-400">
                Methodology: {project.methodology | "n/a"}
              </p>

              <form className="mt-10">
                <Link
                  href="/calculator"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Calculate Score
                </Link>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
