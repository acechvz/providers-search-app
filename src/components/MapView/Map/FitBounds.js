import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useAppStore } from '../../../hooks/useAppStore';

export const FitBounds = () => {
  const { mapViewBounds } = useAppStore();
  const map = useMap();

  useEffect(() => {
    if (mapViewBounds && mapViewBounds?.length > 0)
      map.fitBounds(mapViewBounds);
  }, [mapViewBounds]);

  return null;
};
