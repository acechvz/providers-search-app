import { useReducer } from "react";

import {
	TOGGLE_SPECIALTY_FILTER,
	SET_ACTIVE_SPECIALTY_FILTERS,
	SET_PROVIDERS_BY_LOCATION_FILTER,
	SET_ERRORS,
	SET_PROVIDER_NAME_FILTER,
} from "../actions/appActions/actionTypes";

import providersDataset from "../mocks/providers_with_specialties.json";

const favoritesStorage = localStorage.getItem("favorites")
	? JSON.parse(localStorage.getItem("favorites"))
	: [];

const initialState = {
	providers: providersDataset,
	totalResults: null,
	filters: {
		specialties: [],
		location: null,
		name: "",
	},
	errors: {},
	favorites: favoritesStorage,
};

const rootReducer = (state, action) => {
	switch (action.type) {
		case TOGGLE_SPECIALTY_FILTER:
			const currentFilters = state.filters.specialties.includes(
				action.payload
			)
				? state.filters.specialties.filter(
						(code) => code !== action.payload
				  )
				: [...state.filters.specialties, action.payload];

			return {
				...state,
				filters: {
					...state.filters,
					specialties: currentFilters,
				},
			};
		case SET_ACTIVE_SPECIALTY_FILTERS:
			return {
				...state,
				filters: {
					...state.filters,
					specialties: action.payload,
				},
			};
		case SET_PROVIDERS_BY_LOCATION_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					location: action.payload,
				},
			};
		case SET_ERRORS:
			return {
				...state,
				errors: { ...action.payload },
			};
		case SET_PROVIDER_NAME_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					name: action.payload.toLowerCase(),
				},
			};
		case "TOGGLE_FAVORITE_PROVIDER":
			let newFavorites = [];
			if (state.favorites.includes(action.payload)) {
				newFavorites = state.favorites.filter(
					(providerId) => providerId !== action.payload
				);
			} else {
				newFavorites = [...state.favorites, action.payload];
			}

			localStorage.setItem("favorites", JSON.stringify(newFavorites));

			return {
				...state,
				favorites: newFavorites,
			};
		default:
			return state;
	}
};

export const useRootReducer = () => useReducer(rootReducer, initialState);
