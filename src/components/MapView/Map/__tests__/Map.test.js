import { render, screen } from '@testing-library/react';

import Map from '../Map';
import { useAppStore } from '../../../../hooks/useAppStore';

import providersDataset from '../../../../mocks/providers_with_specialties.json';

jest.mock('../../../../hooks/useAppStore');
// Mocking leaflet react library to pretend paint the component
jest.mock('react-leaflet', () => ({
  ...jest.requireActual('react-leaflet'),
  MapContainer: () => <div data-testid="map"></div>,
}));

describe('<Map />', () => {
  beforeEach(() => {
    useAppStore.mockReturnValue({
      providers: [...providersDataset],
      mapViewBounds: null,
    });
  });
  it('should render the component properly', () => {
    render(<Map />);

    const map = screen.getByTestId('map');

    expect(map).toBeInTheDocument();
  });
});
