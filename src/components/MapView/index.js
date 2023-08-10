import SearchBox from "./SearchBox/SearchBox";
import Map from "./Map/Map";
import MapFilters from "../MapFilters";
import TotalResults from "./TotalResults/TotalResults";

const MapView = () => {
	return (
		<>
			<Map />
			<SearchBox />
			<MapFilters />
			<TotalResults />
		</>
	);
};

export default MapView;
