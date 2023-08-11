import { render } from "@testing-library/react";
import { useMap } from "react-leaflet";
import { FitBounds } from "../FitBounds";

import { useProviderSearchStore } from "../../../../hooks/useProviderSearchStore";

jest.mock("../../../../hooks/useProviderSearchStore");
jest.mock("react-leaflet");

describe("<FitBounds />", () => {
	const fitBoundsSpy = jest.fn();
	beforeEach(() => {
		useProviderSearchStore.mockReturnValue({ mapViewBounds: [1, 2, 3] });
		useMap.mockImplementation(() => ({ fitBounds: fitBoundsSpy }));
	});

	it("should trigger fitBounds event properly", () => {
		render(<FitBounds />);

		expect(fitBoundsSpy).toHaveBeenCalled();
	});
});
