import { Map } from "./Map/Map";
import { MapFilters } from "../MapFilters";
import { SearchBox } from "./SearchBox/SearchBox";
import { TotalResults } from "./TotalResults/TotalResults";
import { SearchErrorAlert } from "./SearchErrorAlert/SearchErrorAlert";
import { useProviderSearchStore } from "../../hooks/useProviderSearchStore";

export const MapView = () => {
	const { errors } = useProviderSearchStore();
	return (
		<>
			<Map />
			<SearchBox />
			<MapFilters />
			<TotalResults />
			<SearchErrorAlert content={errors?.search as string} />
		</>
	);
};
