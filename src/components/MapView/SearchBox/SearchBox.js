import { useRef, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarkerAlt,
	faSearch,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { useAppStore } from "../../../hooks/useAppStore";
import { useOnClickOutside } from "../../../hooks/useClickOutside";

import { setProvidersByLocation } from "../../../actions/appActions";
import { SET_ERRORS } from "../../../actions/appActions/actionTypes";

import { debounce } from "../../../utils/debounce";
import getDistanceFromLatLngInMiles from "../../../utils/distance";

import {
	DEFAULT_DEBOUNCE_TIMEOUT,
	SEARCH_LOCATIONS_API_BASE_URL,
	SEARCH_LOCATIONS_API_DEFAULT_PARAMS,
	Z_INDEX_ELEVATION,
} from "../../../constants";

import providersDataset from "../../../mocks/providers_with_specialties.json";

const SearchBox = () => {
	const { dispatch } = useAppStore();
	const [locations, setLocations] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const searchRef = useRef();
	const searchBoxRef = useRef();

	useOnClickOutside(searchBoxRef, () => setShowDropdown(false));

	const handleFetchLocations = debounce(
		(e) => fetchLocationData(e.target.value),
		DEFAULT_DEBOUNCE_TIMEOUT
	);

	const fetchLocationData = async (query = "") => {
		if (!query) return;

		const response = await fetch(
			`${SEARCH_LOCATIONS_API_BASE_URL}q=${encodeURIComponent(
				query
			)}${SEARCH_LOCATIONS_API_DEFAULT_PARAMS}`
		);
		const locationsResults = await response.json();

		dispatch({
			type: SET_ERRORS,
			payload: {},
		});

		setLocations(locationsResults);
		setShowDropdown(true);
	};

	const getNearestProvidersFromLocation = (_lat, _lng, name) => {
		const segmentedProvidersIds = providersDataset.reduce(
			(acc, provider) => {
				const { lat, lng } = provider?.location?.latLng || {};

				return getDistanceFromLatLngInMiles(_lat, _lng, lat, lng) <= 100
					? [...acc, provider.id]
					: acc;
			},
			[]
		);

		dispatch(setProvidersByLocation(segmentedProvidersIds));
		setShowDropdown(false);

		if (segmentedProvidersIds.length === 0)
			dispatch({
				type: SET_ERRORS,
				payload: {
					search: "Sorry, we couldn't find providers in that area.",
				},
			});

		// Updating manually uncontrolled component
		searchRef.current.value = name;
	};

	const handleDeleteSearchClick = () => {
		dispatch(setProvidersByLocation(null));
		setShowDropdown(false);
		setLocations([]);
		searchRef.current.value = "";
	};

	const locationsOptions =
		locations?.length > 0 &&
		locations.map(({ place_id, lat, lon, display_name }) => (
			<div
				key={place_id}
				className="truncate p-2 text-sm hover:bg-gray-100 transition cursor-pointer flex items-baseline text-gray-700 gap-2"
				onClick={() =>
					getNearestProvidersFromLocation(lat, lon, display_name)
				}
			>
				<FontAwesomeIcon icon={faMapMarkerAlt} size="sm" />
				<span className="flex-auto truncate">{display_name}</span>
			</div>
		));

	return (
		<div
			className="w-9/12 md:w-96 sm:max-w-sm fixed top-2 left-2"
			style={{ zIndex: Z_INDEX_ELEVATION.UPFRONT }}
			ref={searchBoxRef}
		>
			<form
				className={classNames(
					"bg-white shadow-md flex px-4 py-2 gap-4",
					{
						"rounded-md": locations.length === 0 || !showDropdown,
						"rounded-tl-md rounded-tr-md":
							locations.length > 0 && showDropdown,
					}
				)}
				onSubmit={(e) => e.preventDefault()}
			>
				<div
					className={classNames("text-gray-600", {
						"cursor-pointer": locations.length > 0,
						"opacity-30 cursor-not-allowed": locations.length === 0,
					})}
					onClick={handleDeleteSearchClick}
				>
					<FontAwesomeIcon icon={faTimes} />
				</div>
				<input
					type="text"
					className="flex-auto outline-none text-sm"
					placeholder="Enter address"
					onChange={handleFetchLocations}
					onFocus={handleFetchLocations}
					ref={searchRef}
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
				{locationsOptions}
			</div>
		</div>
	);
};

export default SearchBox;
