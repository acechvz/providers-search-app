import { useEffect, useRef } from 'react';
import { useAppStore } from '../../hooks/useAppStore';

import { debounce } from '../../utils/debounce';

import { SET_PROVIDER_NAME_FILTER } from '../../actions/appActions/actionTypes';

import { DEFAULT_DEBOUNCE_TIMEOUT, FILTER_LABELS } from '../../constants';

export const SearchByNameFilter = () => {
  const { dispatch, filters } = useAppStore();
  const inputRef = useRef();

  const handleNameSearch = debounce(
    (e) =>
      dispatch({ type: SET_PROVIDER_NAME_FILTER, payload: e.target.value }),
    DEFAULT_DEBOUNCE_TIMEOUT
  );

  useEffect(() => {
    inputRef.current.value = filters.name;
  }, [filters]);

  return (
    <>
      <h4 className="mb-1 text-xs text-gray-500 font-semibold">
        {FILTER_LABELS.SEARCH_BY_NAME}
      </h4>
      <input
        type="text"
        placeholder="Enter name"
        className="outline-none padding-4 text-sm border-b-2 border-gray-200 w-full mb-2"
        onChange={handleNameSearch}
        ref={inputRef}
      />
    </>
  );
};
