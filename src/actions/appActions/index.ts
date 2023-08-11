import { ActionType } from "./actionTypes";
import specialtiesList from "../../mocks/specialties.json";

export const toggleSpecialtyFilterId = (specialtyId: string) => ({
	type: ActionType.ToggleSpecialtyFilter,
	payload: specialtyId,
});

export const setDefaultActiveSpecialtiesFilters = () => ({
	type: ActionType.SetActiveSpecialtyFilters,
	payload: Object.keys(specialtiesList),
});

export const setProvidersByLocation = (providersIds: number[] | null) => ({
	type: ActionType.SetProvidersByLocationFilter,
	payload: providersIds,
});

export const clearErrors = () => ({
	type: ActionType.SetErrors,
	payload: {},
});
