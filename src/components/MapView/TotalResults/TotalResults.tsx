import { NotificationBox } from "../../shared/NotificationBox/NotificationBox";
import { useProviderSearchStore } from "../../../hooks/useProviderSearchStore";
import { DEFAULT_PROVIDER_LOCATION_RADIUS } from "../../../constants";

export const TotalResults = () => {
	const { totalResults, errors, filters } = useProviderSearchStore();

	const hasNoErrors = Object.keys(errors)?.length === 0;

	const renderResultsText = () => {
		if (!filters?.location?.length) return;

		return (
			<span>
				in a{" "}
				<span className="text-gray-900 font-semibold">
					{DEFAULT_PROVIDER_LOCATION_RADIUS} mi
				</span>{" "}
				radius from the location
			</span>
		);
	};

	return (
		<NotificationBox isVisible={hasNoErrors} data-testid="total-results">
			<span>
				Showing <b>{totalResults}</b> results
			</span>{" "}
			{renderResultsText()}
		</NotificationBox>
	);
};
