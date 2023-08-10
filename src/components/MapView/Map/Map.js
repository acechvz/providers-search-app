import React from "react";
import {
	MapContainer,
	Marker,
	ZoomControl,
	Popup,
	TileLayer,
} from "react-leaflet";

import { FitBounds } from "./FitBounds";

import { DEFAULT_MAP_CENTER_COORDINATES } from "../../../constants";
// import { useAppStore } from "../../../hooks/useAppStore";
import Markers from "./Markers";

const Map = () => {
	// const { providers, favorites, dispatch } = useAppStore();

	// const handleFavoriteClick = (id) => {
	// 	dispatch({ type: "TOGGLE_FAVORITE_PROVIDER", payload: id });
	// };

	return (
		<MapContainer
			center={DEFAULT_MAP_CENTER_COORDINATES}
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
};

export default Map;
