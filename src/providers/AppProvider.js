import { createContext, useMemo } from 'react';
import { useRootReducer } from '../reducers';

export const AppContext = createContext({ state: {}, dispatch: () => {} });

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useRootReducer();

  const contextValue = useMemo(() => {
    const { providers, favorites, filters, errors } = state;

    const filteredProviders = providers.filter((provider) => {
      let hasExpectedLocation = true;
      let hasExpectedName = true;

      const hasSpecialty = provider.specialties.some((specialty) =>
        filters.specialties.includes(specialty)
      );

      if (
        filters.location?.length > 0 &&
        !filters.location.includes(provider.id)
      ) {
        hasExpectedLocation = false;
      }

      if (
        filters.name !== '' &&
        !provider.name.toLowerCase().includes(filters.name)
      )
        hasExpectedName = false;

      return hasSpecialty && hasExpectedLocation && hasExpectedName;
    });

    return {
      errors,
      filters,
      favorites,
      providers: filteredProviders,
      totalResults: filteredProviders.length,
      mapViewBounds: filteredProviders.map((item) =>
        Object.values(item.location.latLng)
      ),
    };
  }, [state]);

  return (
    <AppContext.Provider value={{ ...contextValue, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
