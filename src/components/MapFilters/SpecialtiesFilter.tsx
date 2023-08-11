import { useMemo, useState } from "react";

import List from "../shared/List/List";
import { useProviderSearchStore } from "../../hooks/useProviderSearchStore";
import {
	setDefaultActiveSpecialtiesFilters,
	toggleSpecialtyFilterId,
} from "../../actions/appActions";
import specialtiesList from "../../mocks/specialties.json";
import { ActionType } from "../../actions/appActions/actionTypes";
import { FILTER_LABELS } from "../../constants";

export const SpecialtiesFilter = () => {
	const { dispatch, filters } = useProviderSearchStore();
	const allSpecialtiesSelected = useMemo(
		() =>
			Object.keys(specialtiesList).every((specialtyId) =>
				filters.specialties.includes(specialtyId)
			),
		[filters]
	);

	const specialtiesOptions = useMemo(
		() =>
			Object.entries(specialtiesList).map(([specialtyId, name]) => (
				<List.Item
					key={specialtyId}
					isChecked={filters.specialties.includes(specialtyId)}
					onClick={() =>
						dispatch(toggleSpecialtyFilterId(specialtyId))
					}
				>
					{name}
				</List.Item>
			)),
		[filters.specialties]
	);

	const handleAllItemsClick = () => {
		if (!allSpecialtiesSelected)
			return dispatch(setDefaultActiveSpecialtiesFilters());

		dispatch({ type: ActionType.SetActiveSpecialtyFilters, payload: [] });
	};

	return (
		<List className="text-sm">
			<h4 className="mb-1 text-xs text-gray-500 font-semibold">
				{FILTER_LABELS.SPECIALTIES}
			</h4>
			<List.Item
				isChecked={allSpecialtiesSelected}
				onClick={handleAllItemsClick}
			>
				{FILTER_LABELS.ALL_SPECIALTIES}
			</List.Item>
			<hr className="my-2" />
			<List.Scrollable>{specialtiesOptions}</List.Scrollable>
		</List>
	);
};
