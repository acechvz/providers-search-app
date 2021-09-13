import { useEffect, useRef, useState } from 'react';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SearchByNameFilter } from './SearchByNameFilter';
import { SpecialtiesFilter } from './SpecialtiesFilter';

import { useAppStore } from '../../hooks/useAppStore';
import { useOnClickOutside } from '../../hooks/useClickOutside';

import { setDefaultActiveSpecialtiesFilters } from '../../actions/appActions';

import { Z_INDEX_ELEVATION } from '../../constants';

const MapFilters = () => {
  const { dispatch } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef();

  useOnClickOutside(filterRef, () => setShowFilters(false));

  useEffect(() => dispatch(setDefaultActiveSpecialtiesFilters()), []);

  return (
    <div
      className="fixed top-2 right-2"
      style={{ zIndex: Z_INDEX_ELEVATION.UPFRONT }}
      ref={filterRef}
    >
      <button
        className="w-10 h-10 bg-white shadow-sm hover:shadow-md rounded-full"
        onClick={() => setShowFilters((show) => !show)}
      >
        <FontAwesomeIcon icon={faSlidersH} />
      </button>
      {showFilters && (
        <div className="absolute top-100 transform translate-y-2 right-0 bg-white w-80 sm:max-w-sm max-w-xs shadow-lg py-2 px-4 rounded-md ">
          <SearchByNameFilter />
          <SpecialtiesFilter />
        </div>
      )}
    </div>
  );
};

export default MapFilters;
