import { render, screen } from '@testing-library/react';
import { useAppStore } from '../../../hooks/useAppStore';
import TotalResults from './TotalResults';

jest.mock('../../../hooks/useAppStore');

describe('<TotalResults />', () => {
  beforeEach(() => {
    useAppStore.mockReturnValue({
      totalResults: 10,
      errors: {},
      filters: {},
    });
  });

  it('should display the notification with the correct data', async () => {
    render(<TotalResults />);

    const notificationElement = await screen.findByTestId('total-results');

    expect(notificationElement).toBeInTheDocument();

    expect(notificationElement.textContent).toMatch(/Showing 10 results/);
  });

  it('should not display if any errors in store', () => {
    useAppStore.mockReturnValue({
      totalResults: 10,
      errors: { search: 'Error' },
      filters: {},
    });
    render(<TotalResults />);

    const notificationElement = screen.queryByTestId('total-results');

    expect(notificationElement).not.toBeInTheDocument();
  });

  it('should display location information if filter applied', async () => {
    useAppStore.mockReturnValue({
      totalResults: 10,
      errors: {},
      filters: { location: [1, 2, 3] },
    });
    render(<TotalResults />);

    const notificationElement = await screen.findByTestId('total-results');

    expect(notificationElement).toBeInTheDocument();

    expect(notificationElement.textContent).toMatch(
      /Showing 10 results in a 100 mi radius/
    );
  });
});
