import Intro from '../components/Intro';
import DataCenter from '../views/DataCenter';
import MinimalLayout from '../layout/MinimalLayout';
import ViewSharedProfile from '../views/Profiles/ViewSharedProfile';

const MainRoutes = {
	element: <MinimalLayout />,
	children: [
		{
			path: '/',
			element: <Intro />,
		},
		{
			path: '/center',
			element: <DataCenter />,
		},
		{
			path: 'profile/:profileId',
			element: <ViewSharedProfile />,
		},
	],
};

export default MainRoutes;
