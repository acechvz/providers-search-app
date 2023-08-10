import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import { useMap, useMapEvents } from "react-leaflet";
import { useAppStore } from "../../../hooks/useAppStore";

const Markers = () => {
	const { providers, favorites } = useAppStore();
	const map = useMap();
	const mapBounds = map.getBounds();
	const [markersGroup, setMarkersGroup] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [currentMapBounds, setCurrentMapBounds] = useState(mapBounds);

	useMapEvents({
		moveend() {
			setCurrentMapBounds(mapBounds);
		},
	});

	const getPopupContent = ({ name, address, city, state }) => {
		return `
		    <h4 class="text-neutral-800 font-medium text-xs mb-2">${
				name || "Unnamed Provider"
			}</h4>
		    <div>
		      ${address ?? ""}
		      <div>${city ?? ""}, ${state ?? ""}</div>
		    </div>
		`;
	};

	const displayMarkersInBounds = () => {
		Object.entries(markers).forEach(([markerId, m]) => {
			const shouldBeVisible = mapBounds.contains(m.getLatLng());
			if (m._icon && !shouldBeVisible) {
				markersGroup.removeLayer(m);
			} else if (!m._icon && shouldBeVisible) {
				markersGroup.addLayer(m);
			}
		});
	};

	const renderMarkers = () => {
		const clusterGroup = L.markerClusterGroup();
		let markersCollection = {};

		if (markersGroup) markersGroup.clearLayers();

		providers.forEach((provider) => {
			const { location, name, id } = provider;
			const {
				address: {
					line: [lineAddress],
					city,
					state,
				},
				latLng,
			} = location;

			const isFavorite = favorites.includes(id);

			const marker = L.marker([latLng.lat, latLng.lng]);
			marker.bindPopup(
				getPopupContent({ name, lineAddress, city, state, isFavorite })
			);
			clusterGroup.addLayer(marker);
			markersCollection[provider.id] = marker;
		});

		map.addLayer(clusterGroup);
		setMarkers(markersCollection);
		setMarkersGroup(clusterGroup);
	};

	useEffect(() => {
		renderMarkers();
	}, [providers]);

	useEffect(() => {
		displayMarkersInBounds();
	}, [currentMapBounds]);

	// Returning null as this component shouldn't render
	return null;
};

export default Markers;
