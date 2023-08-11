import { ElementRef, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarkerAlt,
	faSearch,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { useProviderSearchStore } from "../../../hooks/useProviderSearchStore";
import { useDebounce } from "../../../hooks/useDebounce";
import { useOnClickOutside } from "../../../hooks/useClickOutside";

import {
	clearErrors,
	setProvidersByLocation,
} from "../../../actions/appActions";
import { ActionType } from "../../../actions/appActions/actionTypes";

import { getDistanceFromLatLngInMiles } from "../../../utils";
import providersDataset from "../../../mocks/providers_with_specialties.json";
import type { Provider } from "../../../reducers";

import {
	DEFAULT_DEBOUNCE_TIMEOUT,
	DEFAULT_PROVIDER_LOCATION_RADIUS,
	SEARCH_LOCATIONS_API,
	Z_INDEX_ELEVATION,
} from "../../../constants";

export const SearchBox = () => {
	const { dispatch } = useProviderSearchStore();
	const [locations, setLocations] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const searchBoxRef = useRef<ElementRef<"div">>(null);
	const prevSearchTermRef = useRef("");
	const debouncedQuery = useDebounce(searchTerm, DEFAULT_DEBOUNCE_TIMEOUT);

	useOnClickOutside(searchBoxRef, () => setShowDropdown(false));

	const handleClearErrors = () => dispatch(clearErrors());

	const fetchLocationData = async (query = "") => {
		if (!query) return;

		const response = await fetch(
			`${SEARCH_LOCATIONS_API.BASE_URL}q=${encodeURIComponent(query)}${
				SEARCH_LOCATIONS_API.URL_PARAMS
			}`
		);

		const locationsResults = await response.json();

		handleClearErrors();

		setLocations(locationsResults);
		setShowDropdown(true);
	};

	const getNearestProvidersFromLocation = ({
		latLng,
		name,
	}: {
		latLng: number[];
		name: string;
	}) => {
		const [latitude, longitude] = latLng;
		const segmentedProvidersIds = providersDataset.reduce(
			(acc, provider: Provider) => {
				const { lat, lng } = provider?.location?.latLng || {};
				const providerDistance = getDistanceFromLatLngInMiles(
					latitude,
					longitude,
					lat,
					lng
				);

				if (providerDistance <= DEFAULT_PROVIDER_LOCATION_RADIUS)
					return [...acc, provider.id];

				return acc;
			},
			[] as number[]
		);

		dispatch(setProvidersByLocation(segmentedProvidersIds));

		if (segmentedProvidersIds.length === 0)
			dispatch({
				type: ActionType.SetErrors,
				payload: {
					search: "Sorry, we couldn't find providers in that area.",
				},
			});

		setSearchTerm(name);
		setShowDropdown(false);
	};

	const handleCleanSearchClick = () => {
		dispatch(setProvidersByLocation(null));
		setShowDropdown(false);
		setLocations([]);
		setSearchTerm("");
		handleClearErrors();
	};

	const renderLocationOptionsContent = () => {
		if (locations?.length === 0 && searchTerm)
			return (
				<div className="text-center font-medium">No results found</div>
			);

		return locations.map(({ place_id, lat, lon, display_name }) => (
			<div
				key={place_id}
				className="truncate p-2 text-sm hover:bg-gray-100 transition cursor-pointer flex items-baseline text-gray-700 gap-2"
				onClick={() =>
					getNearestProvidersFromLocation({
						latLng: [lat, lon],
						name: display_name,
					})
				}
			>
				<FontAwesomeIcon icon={faMapMarkerAlt} size="sm" />
				<span className="flex-auto truncate">{display_name}</span>
			</div>
		));
	};

	useEffect(() => {
		if (prevSearchTermRef.current === debouncedQuery) return;
		fetchLocationData(debouncedQuery);
		prevSearchTermRef.current = debouncedQuery;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedQuery]);

	return (
		<div
			ref={searchBoxRef}
			className="w-9/12 md:w-96 sm:max-w-sm fixed top-2 left-2"
			style={{ zIndex: Z_INDEX_ELEVATION.UPFRONT }}
		>
			<form
				className={classNames(
					"bg-white shadow-md flex px-4 py-2 gap-4",
					{
						"rounded-md": !showDropdown,
						"rounded-tl-md rounded-tr-md": showDropdown,
					}
				)}
				onSubmit={(e) => e.preventDefault()}
			>
				<div
					onClick={handleCleanSearchClick}
					className={classNames("text-gray-600", {
						"cursor-pointer": searchTerm,
						"opacity-30 cursor-not-allowed": !searchTerm,
					})}
				>
					<FontAwesomeIcon icon={faTimes} />
				</div>
				<input
					type="text"
					className="flex-auto outline-none text-sm"
					placeholder="Enter address"
					onChange={(event) => setSearchTerm(event.target.value)}
					value={searchTerm}
				/>
				<div className="text-gray-300">
					<FontAwesomeIcon icon={faSearch} />
				</div>
			</form>

			<div
				className={classNames(
					"bg-white rounded-sm absolute top-full transform w-full shadow-md transition rounded-br-md rounded-bl-md overflow-hidden py-2",
					{
						"-translate-y-8 opacity-0 pointer-events-none":
							!showDropdown,
						"translate-y-0 opacity-100 -mt-1": showDropdown,
					}
				)}
				style={{ zIndex: Z_INDEX_ELEVATION.BACK }}
			>
				{renderLocationOptionsContent()}
			</div>
		</div>
	);
};
