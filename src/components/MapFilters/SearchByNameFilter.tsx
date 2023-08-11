import { useEffect, useState } from "react";
import { useProviderSearchStore } from "../../hooks/useProviderSearchStore";

import { useDebounce } from "../../hooks/useDebounce";
import { ActionType } from "../../actions/appActions/actionTypes";

import { DEFAULT_DEBOUNCE_TIMEOUT, FILTER_LABELS } from "../../constants";

export const SearchByNameFilter = () => {
	const { dispatch, filters } = useProviderSearchStore();
	const [providerNameTerm, setProviderNameTerm] = useState(filters.name);
	const debouncedTerm = useDebounce(
		providerNameTerm,
		DEFAULT_DEBOUNCE_TIMEOUT
	);

	useEffect(() => {
		setProviderNameTerm(filters.name);
	}, [filters]);

	useEffect(() => {
		dispatch({
			type: ActionType.SetProviderNameFilter,
			payload: debouncedTerm,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedTerm]);

	return (
		<>
			<h4 className="mb-1 text-xs text-gray-500 font-semibold">
				{FILTER_LABELS.SEARCH_BY_NAME}
			</h4>
			<input
				type="text"
				placeholder="Enter name"
				className="outline-none padding-4 text-sm border-b-2 border-gray-200 w-full mb-2"
				onChange={(event) => setProviderNameTerm(event?.target.value)}
				value={providerNameTerm}
			/>
		</>
	);
};
