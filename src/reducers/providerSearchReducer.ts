import { useReducer } from "react";
import { produce, type Draft } from "immer";
import {
	ActionType,
	type ProviderSearchAction,
} from "../actions/appActions/actionTypes";
import providersDataset from "../mocks/providers_with_specialties.json";
import { LocalStorageKeys } from "../constants";

export type Provider = (typeof providersDataset)[0];

export type ProviderSearchState = {
	providers: Provider[];
	totalResults: null | number;
	filters: {
		specialties: string[];
		location: number[] | null;
		name: string;
	};
	errors: Record<string, unknown>;
	favorites: number[];
};

const getFavoritesFromLocalStorage = (): number[] => {
	if (localStorage.getItem(LocalStorageKeys.Favorites))
		return JSON.parse(
			localStorage.getItem(LocalStorageKeys.Favorites) as string
		);

	return [];
};

const initialState: ProviderSearchState = {
	providers: providersDataset as Provider[],
	totalResults: null,
	filters: {
		specialties: [],
		location: null,
		name: "",
	},
	errors: {},
	favorites: getFavoritesFromLocalStorage(),
};

const providerSearchReducer = produce(
	(
		state: Draft<ProviderSearchState>,
		action: Draft<ProviderSearchAction>
	) => {
		const { type, payload } = action;
		switch (type) {
			case ActionType.ToggleSpecialtyFilter: {
				const specialtyId = payload as string;
				const isSpecialtySelected =
					state.filters.specialties.includes(specialtyId);

				if (isSpecialtySelected) {
					const filteredSpecialties =
						state.filters.specialties.filter(
							(code) => code !== specialtyId
						);

					state.filters.specialties = filteredSpecialties;
					break;
				}

				state.filters.specialties.push(specialtyId);
				break;
			}
			case ActionType.SetActiveSpecialtyFilters: {
				const specialtiesIds = payload as string[];
				state.filters.specialties = specialtiesIds;
				break;
			}
			case ActionType.SetProvidersByLocationFilter: {
				const providersByLocation = payload as number[];
				state.filters.location = providersByLocation;
				break;
			}
			case ActionType.SetErrors: {
				const errors = payload as Record<string, unknown>;
				state.errors = errors;
				break;
			}
			case ActionType.SetProviderNameFilter: {
				const providerName = (payload as string).toLowerCase();
				state.filters.name = providerName;
				break;
			}
			case ActionType.ToggleFavoriteProvider: {
				const providerId = payload as number;
				const isProviderFavorited =
					state.favorites.includes(providerId);
				if (isProviderFavorited) {
					const updatedFavorites = state.favorites.filter(
						(providerId: number) => providerId !== providerId
					);

					state.favorites = updatedFavorites;
				} else {
					state.favorites.push(providerId);
				}

				localStorage.setItem(
					LocalStorageKeys.Favorites,
					JSON.stringify(state.favorites)
				);

				break;
			}
		}
	},
	initialState
);

export const useProviderSearchReducer = () =>
	useReducer(providerSearchReducer, initialState);
