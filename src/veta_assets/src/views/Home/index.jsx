import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, Button } from '@mui/material';
import { Auth } from './Auth';
import { veta } from '../../../../declarations/veta';
import Logo from '../../_assets/images/veta-logo.svg';
import DfinityLogo from '../../_assets/images/infinity_logo.svg';
import background1 from '../../_assets/images/home/background1.jpg';
import background2 from '../../_assets/images/home/background2.png';
import background3 from '../../_assets/images/home/background3.jpg';
import background4 from '../../_assets/images/home/background4.jpg';
import useVetaIdentity from '../../contexts/VetaIdentityContext';

const Home = () => {
	const { signInByICProvider, signOut, principal, client, vetaWallet } = useVetaIdentity();
	const [count, setCount] = useState();
	const [profile, setProfile] = useState();

	const refreshCounter = async () => {
		const res = await veta.getValue();
		setCount(res.toString());
	};

	const refreshProfile = async () => {
		const res = await veta.find('mark');
		setProfile(res.toString());
	};

	const addCounter = async () => {
		await veta.increment();
		refreshCounter();
	};

	const sign = async () => {
		await veta.insert('mark', count, 'Deira');
		refreshProfile();
	};

	useEffect(() => {
		refreshCounter();
		refreshProfile();
	}, []);

	return (
		// <>
		//   <header className="App-header">
		//     <img src={logo} className="App-logo" alt="logo" />
		//     <p style={{ fontSize: "2em", marginBottom: "0.5em" }}>Own your data</p>
		//     <div style={{
		//       display: "flex",
		//       fontSize: "0.7em",
		//       textAlign: "left",
		//       padding: "2em",
		//       borderRadius: "30px",
		//       flexDirection: "column",
		//       background: "rgb(220 218 224 / 25%)",
		//     }}>
		//       <div>
		//         <Button onClick={signInByICProvider}>ADD</Button>
		//       </div>
		//     </div>
		//   </header>
		//   <Link to="/dashboard">{count}</Link>
		//   <Button onClick={addCounter}>ADD</Button>
		//   <Button onClick={sign}>SIGN IN</Button>
		//   <span>welcome {principal}</span>
		// </>
		<>
			<AppBar
				position='sticky'
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignContent: 'center',
					alignItems: 'center',
					justifyContent: 'space-between',
					backgroundColor: 'rgba(0, 0, 0, 0.87)',
					color: '#fff',
				}}>
				<Button color='inherit' href='/'>
					<Logo className='App-logo' alt='logo' style={{ height: '20px', marginLeft: '5px' }} />
				</Button>
				<Toolbar>{/* content */}</Toolbar>
				<Button variant='text' color='inherit' onClick={signInByICProvider}>
					<DfinityLogo alt='logo' style={{ width: '24px', marginRight: '5px' }} />
					<strong className='align-self-end mt-1'>Login</strong>
				</Button>
			</AppBar>
			<Box
				sx={{
					height: '80vh',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#fff',
					backgroundImage: `url(${background1})`,
					backgroundSize: 'cover',
				}}>
				{/* <img src={background1} style={{ width: '100%', position: 'absolute', top: '64px' }}/> */}
				<Typography
					component='h2'
					variant='h2'
					sx={{
						position: 'relative',
						left: '200px',
						fontWeight: '400',
						color: '#fff',
					}}>
					OWN YOUR DATA
					<span
						style={{
							height: '5px',
							width: '116px',
							display: 'block',
							margin: '0 auto 0',
							backgroundColor: '#39b54a',
							position: 'relative',
							right: '2px',
						}}></span>
				</Typography>
			</Box>
			<section
				style={{
					height: '80vh',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#000',
					backgroundImage: `url(${background2})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
				}}>
				<Typography component='h2' variant='h2' sx={{}}>
					WHAT IS VETA
				</Typography>
			</section>
			<section
				style={{
					height: '80vh',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#fff',
					backgroundImage: `url(${background4})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
				}}>
				{/* <img src={background1} style={{ width: '100%', position: 'absolute', top: '64px' }}/> */}
				<Typography
					component='h2'
					variant='h2'
					sx={{
						position: 'relative',
						left: '200px',
						fontWeight: '400',
					}}>
					BRIDGING YOUR PHYSICAL AND DIGITAL IDENTITY
				</Typography>
			</section>
			<section
				style={{
					height: '80vh',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#000',
					backgroundImage: `url(${background2})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
				}}>
				<Typography component='h2' variant='h2' sx={{}}>
					HOW DOES IT WORK
				</Typography>
			</section>
			<section
				style={{
					height: '80vh',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#fff',
					backgroundImage: `url(${background3})`,
					backgroundSize: 'cover',
				}}>
				<Typography component='h2' variant='h2' sx={{}}>
					BUILDING AN ECOSYSTEM OF TRUST
				</Typography>
			</section>
			<section
				style={{
					height: '80vh',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#000',
					backgroundImage: `url(${background2})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
				}}>
				<Typography component='h2' variant='h2' sx={{}}>
					MEET THE TEAM
				</Typography>
			</section>
		</>
	);
};

export default Home;
