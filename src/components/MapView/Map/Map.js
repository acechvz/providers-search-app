import React, { useEffect, useMemo } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  ZoomControl,
  Popup,
} from 'react-leaflet';

import MarkersProviders from './Markers';
import { FitBounds } from './FitBounds';

import { DEFAULT_MAP_CENTER_COORDINATES } from '../../../constants';
import { useAppStore } from '../../../hooks/useAppStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Map = () => {
  const { providers, favorites, dispatch } = useAppStore();

  const handleFavoriteClick = (id) => {
    dispatch({ type: 'TOGGLE_FAVORITE_PROVIDER', payload: id });
  };

  console.log(favorites);

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
      {/* {providers.map((provider) => {
        if (
          !provider?.location?.latLng?.lat &&
          !provider?.location?.latLng?.lng
        )
          return null;
        return (
          <Marker
            key={provider.id}
            position={[
              provider?.location.latLng.lat,
              provider?.location.latLng.lng,
            ]}
          >
            <Popup>
              <button onClick={() => handleFavoriteClick(provider?.id)}>
                <FontAwesomeIcon
                  icon={faStar}
                  color={favorites.includes(provider?.id) ? 'yellow' : 'gray'}
                />
              </button>
              {provider?.name}
            </Popup>
          </Marker>
        );
      })} */}

      <Marker
        position={[
          providers[0]?.location.latLng.lat,
          providers[0]?.location.latLng.lng,
        ]}
      >
        <Popup>
          <button onClick={() => handleFavoriteClick(providers[0]?.id)}>
            <FontAwesomeIcon
              icon={faStar}
              color={favorites.includes(providers[0]?.id) ? 'yellow' : 'gray'}
            />
          </button>
          {providers[0]?.name}
        </Popup>
      </Marker>
      <Marker
        position={[
          providers[1]?.location.latLng.lat,
          providers[1]?.location.latLng.lng,
        ]}
      >
        <Popup>
          <button onClick={() => handleFavoriteClick(providers[1]?.id)}>
            <FontAwesomeIcon
              icon={faStar}
              color={favorites.includes(providers[1]?.id) ? 'yellow' : 'gray'}
            />
          </button>
          {providers[1]?.name}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
