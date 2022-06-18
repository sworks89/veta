import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, Typography, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from '../../ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';

// assets
import { IconChevronRight } from '@tabler/icons';
import useMainLayout from './MainLayoutContext';
import Customization from '../Customization';
import dashboardMenuItems from '../../routes/dashboardMenuItems';
import useVetaIdentity from '../../contexts/VetaIdentityContext';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open, gridSpacing, drawerWidth, appDrawerWidth }) => ({
		...theme.typography.mainContent,
		...(!open && {
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			[theme.breakpoints.up('md')]: {
				marginLeft: -(drawerWidth - 20),
				width: `calc(100% - ${drawerWidth}px)`,
			},
			[theme.breakpoints.down('md')]: {
				marginLeft: '20px',
				width: `calc(100% - ${drawerWidth}px)`,
				padding: '16px',
			},
			[theme.breakpoints.down('sm')]: {
				marginLeft: '10px',
				width: `calc(100% - ${drawerWidth}px)`,
				padding: '16px',
				marginRight: '10px',
			},
		}),
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			width: `calc(100% - ${drawerWidth}px)`,
			[theme.breakpoints.down('md')]: {
				marginLeft: '20px',
			},
			[theme.breakpoints.down('sm')]: {
				marginLeft: '10px',
			},
		}),
	})
);

// ==============================|| MAIN LAYOUT ||============================== //
const MainLayout = () => {
	const { vetaWallet } = useVetaIdentity();
	const {
		gridSpacing,
		drawerWidth,
		appDrawerWidth,
		setMenuOpen,
		setMenu,
		setFontFamily,
		setBorderRadius,
		customization,
	} = useMainLayout();
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

	const handleLeftDrawerToggle = () => {
		setMenu(!customization.opened);
	};

	useEffect(() => {
		setMenu(!matchDownMd);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchDownMd]);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			{/* header */}
			<AppBar
				enableColorOnDark
				position='fixed'
				color='inherit'
				elevation={0}
				sx={{
					bgcolor: theme.palette.background.default,
					transition: customization.opened ? theme.transitions.create('width') : 'none',
				}}>
				<Toolbar>
					<Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
				</Toolbar>
			</AppBar>

			{/* drawer */}
			<Sidebar drawerOpen={customization.opened} drawerToggle={handleLeftDrawerToggle} />

			{/* main content */}
			<Main
				theme={theme}
				open={customization.opened}
				gridSpacing={gridSpacing}
				drawerWidth={drawerWidth}
				appDrawerWidth={appDrawerWidth}>
				{/* breadcrumb */}
				<Breadcrumbs
					separator={IconChevronRight}
					navigation={dashboardMenuItems}
					icon
					title
					rightAlign
				/>
				{vetaWallet ? (
					<Outlet />
				) : ( 
						<Typography variant='h4' component='h4' sx={{ textAlign: 'center', mt: 5 }}>
							Please connect your identity.
						</Typography> 
				)}
			</Main>
			{/* <Customization /> */}
		</Box>
	);
};

export default MainLayout;
