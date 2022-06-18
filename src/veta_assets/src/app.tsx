// routing

import { HashRouter, BrowserRouter } from 'react-router-dom';
// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';
import Routes from './routes';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

function App() {
	const customization = {};
	return (
		<HashRouter>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={themes(customization)}>
					<CssBaseline />
					<NavigationScroll>
						<Routes />
					</NavigationScroll>
				</ThemeProvider>
			</StyledEngineProvider>
		</HashRouter>
	);
}

export default App;
