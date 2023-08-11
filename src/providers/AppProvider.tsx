import { createContext, useMemo } from "react";
import { ProviderSearchState, useProviderSearchReducer } from "../reducers";
import { ProviderSearchAction } from "../actions/appActions/actionTypes";

interface ProviderSearchContext extends ProviderSearchState {
	mapViewBounds: number[][];
	dispatch: React.Dispatch<ProviderSearchAction>;
}

export const ProviderSearchContext = createContext({} as ProviderSearchContext);

interface AppProviderProps {
	children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
	const [state, dispatch] = useProviderSearchReducer();
	const { providers, favorites, filters, errors } = state;

	const filteredProviders = useMemo(
		() =>
			providers.filter((provider) => {
				let hasExpectedLocation = true;
				let hasExpectedName = true;

				const hasSpecialty = provider.specialties.some((specialty) =>
					filters.specialties.includes(specialty)
				);

				if (
					filters?.location &&
					filters?.location?.length > 0 &&
					!filters.location?.includes(provider.id)
				) {
					hasExpectedLocation = false;
				}

				if (
					filters.name !== "" &&
					!provider.name.toLowerCase().includes(filters.name)
				)
					hasExpectedName = false;

				return hasSpecialty && hasExpectedLocation && hasExpectedName;
			}),
		[providers, filters]
	);

	const contextValue = useMemo(
		() => ({
			errors,
			filters,
			favorites,
			providers: filteredProviders,
			totalResults: filteredProviders.length,
			mapViewBounds: filteredProviders.map((item) =>
				Object.values(item.location.latLng)
			),
		}),
		[providers, favorites, filters, errors, filteredProviders]
	);

	return (
		<ProviderSearchContext.Provider value={{ ...contextValue, dispatch }}>
			{children}
		</ProviderSearchContext.Provider>
	);
};
