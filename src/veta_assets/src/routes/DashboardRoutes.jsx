import { lazy } from 'react';
import MainLayout from '../layout/MainLayout';
import { MainLayoutProvider } from '../layout/MainLayout/MainLayoutContext';
import Loadable from '../ui-component/Loadable';
import AuthGuard from '../components/AuthGuard';
import Dashboard from '../views/Dashboard';
import HelpPage from '../views/Help';
import CryppoPlatformPage from '../views/Platforms/Cryppo';
import SocialNetworkPlatformPage from '../views/Platforms/SocialNetwork';
import DataCenter from '../views/DataCenter';
import ProfilesPage from '../views/Profiles';
import ProfileDetail from '../views/Profiles/ProfileDetail';
import QrCodePage from '../views/QrCode';
import WalletPage from '../views/Wallet';

const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

const DashboardRoutes = {
	element: (
		<AuthGuard>
			<MainLayoutProvider>
				<MainLayout />
			</MainLayoutProvider>
		</AuthGuard>
	),
	children: [
		{
			path: 'dashboard',
			element: <Dashboard />,
		},
		{
			path: 'dashboard/center',
			element: <DataCenter />,
		},
		{
			path: 'dashboard/profiles',
			element: <ProfilesPage />,
		},
		{
			path: 'dashboard/profiles/:profileId',
			element: <ProfileDetail />,
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
			element: <HelpPage />,
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
