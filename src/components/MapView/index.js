import { useAppStore } from '../../hooks/useAppStore';

import SearchBox from './SearchBox/SearchBox';
import Map from './Map/Map';
import MapFilters from '../MapFilters';
import NotificationBox from '../shared/NotificationBox/NotificationBox';
import TotalResults from './TotalResults/TotalResults';

import { clearErrors } from '../../actions/appActions';

const MapView = () => {
  const { errors, dispatch } = useAppStore();

  return (
    <>
      <Map />
      <SearchBox />
      <MapFilters />
      <TotalResults />
      <NotificationBox
        type="error"
        visible={Object.keys(errors).length > 0}
        onHide={() => dispatch(clearErrors())}
      >
        {Object.values(errors)[0]}
      </NotificationBox>
    </>
  );
};

export default MapView;
