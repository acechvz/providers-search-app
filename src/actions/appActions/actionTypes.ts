export enum ActionType {
	SetMapCenter = "SET_MAP_CENTER",
	SetActiveSpecialtyFilters = "SET_ACTIVE_SPECIALTY_FILTERS",
	ToggleSpecialtyFilter = "TOGGLE_SPECIALTY_FILTER",
	SetProvidersByLocationFilter = "SET_PROVIDERS_BY_LOCATION_FILTER",
	SetErrors = "SET_ERRORS",
	SetProviderNameFilter = "SET_PROVIDER_NAME_FILTER",
	ToggleFavoriteProvider = "TOGGLE_FAVORITE_PROVIDER",
}

export type ProviderSearchAction =
	| {
			type: ActionType;
			payload?: unknown;
	  }
	| {
			type: ActionType.ToggleSpecialtyFilter;
			payload: string;
	  }
	| {
			type: ActionType.ToggleFavoriteProvider;
			payload: number;
	  };
