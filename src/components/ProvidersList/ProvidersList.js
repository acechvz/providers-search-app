import React from 'react';

import { useAppStore } from '../../hooks/useAppStore';

import ProviderCard from './CardItem/CardItem';

import { Z_INDEX_ELEVATION } from '../../constants';

// TODO: Ignored implementation for this component due time restrictions
const ProvidersList = () => {
  const { providers } = useAppStore();

  return (
    <div
      className="sm:none fixed bottom-2 w-full"
      style={{ zIndex: Z_INDEX_ELEVATION.UPFRONT }}
    >
      <div className="w-10/12 flex items-center flex-nowrap overflow-x-scroll mx-auto gap-6 py-6">
        <span className="absolute h-full w-6 from-transparent to-current"></span>
        {providers.slice(0, 10).map((provider) => (
          <ProviderCard key={provider.id} item={provider} />
        ))}
      </div>
    </div>
  );
};

export default ProvidersList;
