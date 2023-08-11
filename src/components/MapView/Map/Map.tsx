import { MapContainer, ZoomControl, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";

import { Markers } from "./Markers";
import { FitBounds } from "./FitBounds";

import { DEFAULT_MAP_CENTER_COORDINATES } from "../../../constants";

export const Map = () => (
	<MapContainer
		center={DEFAULT_MAP_CENTER_COORDINATES as LatLngTuple}
		zoom={3}
		className="h-screen"
		zoomControl={false}
		data-testid="map"
	>
		<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		<ZoomControl position="bottomright" />
		<FitBounds />
		<Markers />
	</MapContainer>
);
