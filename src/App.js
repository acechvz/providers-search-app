import MapView from "./components/MapView";
import { AppProvider } from "./providers/AppProvider";

window.process = {};

const App = () => (
	<AppProvider>
		<MapView />
	</AppProvider>
);

export default App;
