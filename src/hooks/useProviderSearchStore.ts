import { useContext } from "react";
import { ProviderSearchContext } from "../providers/AppProvider";

export const useProviderSearchStore = () => {
	const context = useContext(ProviderSearchContext);

	if (!context)
		throw Error(
			"useProviderSearchStore must be used within a AppProvider."
		);

	return context;
};
