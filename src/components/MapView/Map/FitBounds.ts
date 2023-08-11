import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngBoundsLiteral } from "leaflet";
import { useProviderSearchStore } from "../../../hooks/useProviderSearchStore";

export const FitBounds = () => {
	const { mapViewBounds } = useProviderSearchStore();
	const map = useMap();

	useEffect(() => {
		if (mapViewBounds && mapViewBounds?.length > 0)
			map.fitBounds(mapViewBounds as LatLngBoundsLiteral);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mapViewBounds]);

	return null;
};
