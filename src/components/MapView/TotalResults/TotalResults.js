import { useAppStore } from '../../../hooks/useAppStore';
import NotificationBox from '../../shared/NotificationBox/NotificationBox';

const TotalResults = () => {
  const { totalResults, errors, filters } = useAppStore();

  return (
    <NotificationBox
      visible={Object.keys(errors)?.length === 0}
      persistVisibility
    >
      <div data-testid="total-results">
        <span>
          Showing <b>{totalResults}</b> results
        </span>{' '}
        {filters?.location?.length > 0 && (
          <span>
            in a <span className="text-gray-900 font-semibold">100 mi</span>{' '}
            radius from the location
          </span>
        )}
      </div>
    </NotificationBox>
  );
};

export default TotalResults;
