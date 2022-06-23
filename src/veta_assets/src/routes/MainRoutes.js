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
			path: 'about',
			element: <About />,
		},
		{
			path: 'contact',
			element: <Contact />,
		},
		{
			path: 'profile/:profileId',
			element: <ViewSharedProfile />,
		},
	],
};

export default MainRoutes;
function About() {
	return (
		<div className='about-page'>
			<h1>About Page</h1>
		</div>
	);
}
function Contact() {
	return (
		<div className='contact-page'>
			<h1>Contact Page</h1>
		</div>
	);
}
