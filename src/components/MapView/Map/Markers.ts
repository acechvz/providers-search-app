import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import { useMap, useMapEvents } from "react-leaflet";
import { useProviderSearchStore } from "../../../hooks/useProviderSearchStore";

export const Markers = () => {
	const { providers } = useProviderSearchStore();
	const map = useMap();
	const mapBounds = map.getBounds();
	const [currentMapBounds, setCurrentMapBounds] = useState(mapBounds);
	const [markers, setMarkers] = useState<Record<string, L.Marker>>({});
	const [markersGroup, setMarkersGroup] =
		useState<L.MarkerClusterGroup | null>(null);

	useMapEvents({
		moveend() {
			setCurrentMapBounds(mapBounds);
		},
	});

	const displayMarkersInBounds = () => {
		Object.values(markers).forEach((marker: L.Marker) => {
			const shouldBeVisible = mapBounds.contains(marker.getLatLng());
			if (marker.getIcon() && !shouldBeVisible) {
				markersGroup?.removeLayer(marker);
			} else if (!marker.getIcon() && shouldBeVisible) {
				markersGroup?.addLayer(marker);
			}
		});
	};

	const renderMarkers = () => {
		const clusterGroup = L.markerClusterGroup();
		let markersCollection: Record<string, L.Marker> = {};

		if (markersGroup) markersGroup.clearLayers();

		providers.forEach((provider) => {
			const { location, name } = provider;
			const {
				address: {
					line: [address],
					city,
					state,
				},
				latLng,
			} = location;

			const marker = L.marker([latLng.lat, latLng.lng]);
			marker.bindPopup(
				generatePopupContent({
					name,
					address,
					city,
					state,
				})
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

interface ProviderPopupContentOpts {
	address: string;
	city: string;
	state: string;
	name?: string;
}

const generatePopupContent = ({
	address,
	city,
	state,
	name,
}: ProviderPopupContentOpts) => {
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
