import Intro from '../components/Intro';
import MinimalLayout from '../layout/MinimalLayout'; 

const MainRoutes = {
	element: <MinimalLayout />,
	children: [
		{
			path: '/',
			element: <Intro />,
		},
		{
			path: 'about',
			element: <About />,
		},
		{
			path: 'contact',
			element: <Contact />,
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
