import L from 'leaflet';
import 'leaflet.markercluster';
import { useEffect, useState } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useAppStore } from '../../../hooks/useAppStore';

const Markers = () => {
  const { providers } = useAppStore();
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

  const getPopupContent = (name, address, city, state) => `
  <h4 style="color: #090909; font-weight: 500; font-size: 12px; margin-bottom: 5px">${
    name || 'Unnamed Provider'
  }</h4>
  <div style="font-size: #999;">
    ${address ?? ''}
    <div>${city ?? ''}, ${state ?? ''}</div>
  </div>`;

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
      const { location, name } = provider;
      const {
        address: {
          line: [lineAddress],
          city,
          state,
        },
        latLng,
      } = location;

      const marker = L.marker([latLng.lat, latLng.lng]);
      marker.bindPopup(getPopupContent(name, lineAddress, city, state));
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

  return null;
};

export default Markers;
