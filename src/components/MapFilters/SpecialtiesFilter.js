import { useState } from 'react';

import List from '../shared/List/List';

import { useAppStore } from '../../hooks/useAppStore';

import { SET_ACTIVE_SPECIALTY_FILTERS } from '../../actions/appActions/actionTypes';
import {
  setDefaultActiveSpecialtiesFilters,
  toggleSpecialtyFilterId,
} from '../../actions/appActions';

import specialtiesList from '../../mocks/specialties.json';
import { FILTER_LABELS } from '../../constants';

export const SpecialtiesFilter = (params) => {
  const { dispatch, filters } = useAppStore();
  const [allFilters, setAllFilters] = useState(true);

  const specialtiesOptions = Object.entries(specialtiesList).map(
    ([specialtyId, name]) => (
      <List.Item
        key={specialtyId}
        checked={filters.specialties.includes(specialtyId)}
        onClick={() => dispatch(toggleSpecialtyFilterId(specialtyId))}
      >
        {name}
      </List.Item>
    )
  );

  const handleAllItemsClick = () => {
    setAllFilters((reset) => !reset);

    if (!allFilters) {
      dispatch(setDefaultActiveSpecialtiesFilters());
    } else {
      dispatch({ type: SET_ACTIVE_SPECIALTY_FILTERS, payload: [] });
    }
  };

  return (
    <List className="text-sm">
      <h4 className="mb-1 text-xs text-gray-500 font-semibold">
        {FILTER_LABELS.SPECIALTIES}
      </h4>
      <List.Item checked={allFilters} onClick={handleAllItemsClick}>
        {FILTER_LABELS.ALL_SPECIALTIES}
      </List.Item>
      <hr className="my-2" />
      <List.Scrollable>{specialtiesOptions}</List.Scrollable>
    </List>
  );
};
