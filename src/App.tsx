import { MapView } from "./components/MapView";
import { AppProvider } from "./providers/AppProvider";

const App = () => (
	<AppProvider>
		<MapView />
	</AppProvider>
);

export default App;
