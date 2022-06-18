import { lazy } from 'react';
// project imports
import MainLayout from '../layout/MainLayout';
// import Loadable from '../ui-component/Loadable';
import { MainLayoutProvider } from '../layout/MainLayout/MainLayoutContext';
import Loadable from '../ui-component/Loadable';
import Dashboard from '../views/Dashboard'; 
import CryppoPlatformPage from '../views/Platforms/Cryppo';
import SocialNetworkPlatformPage from '../views/Platforms/SocialNetwork';
import ProfilesPage from '../views/Profiles';
import QrCodePage from '../views/QrCode';
import WalletPage from '../views/Wallet';

// // sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const DashboardRoutes = {
	element: (
		<MainLayoutProvider>
			<MainLayout />
		</MainLayoutProvider>
	),
	children: [
		{
			path: 'dashboard',
			element: <Dashboard />,
		},
		{
			path: 'dashboard/profiles',
			element: <ProfilesPage />,
		},

		{
			path: 'dashboard/wallet',
			element: <WalletPage />,
		},
		{
			path: 'dashboard/qrcode',
			element: <QrCodePage />,
		},
		{
			path: 'dashboard/help',
			element: <SamplePage />,
		},
		{
			path: 'dashboard/platforms',
			element: <CryppoPlatformPage />,
		},
		{
			path: 'dashboard/platforms/cryppo',
			element: <CryppoPlatformPage />,
		},
		{
			path: 'dashboard/platforms/socialnetwork',
			element: <SocialNetworkPlatformPage />,
		},
	],
};

export default DashboardRoutes;
