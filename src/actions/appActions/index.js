import {
  SET_ACTIVE_SPECIALTY_FILTERS,
  SET_ERRORS,
  SET_PROVIDERS_BY_LOCATION_FILTER,
  TOGGLE_SPECIALTY_FILTER,
} from './actionTypes';

import specialtiesList from '../../mocks/specialties.json';

export const toggleSpecialtyFilterId = (specialtyId) => ({
  type: TOGGLE_SPECIALTY_FILTER,
  payload: specialtyId,
});

export const setDefaultActiveSpecialtiesFilters = (specialties) => ({
  type: SET_ACTIVE_SPECIALTY_FILTERS,
  payload: Object.keys(specialtiesList),
});

export const setProvidersByLocation = (providersIds) => ({
  type: SET_PROVIDERS_BY_LOCATION_FILTER,
  payload: providersIds,
});

export const clearErrors = () => ({
  type: SET_ERRORS,
  payload: {},
});
