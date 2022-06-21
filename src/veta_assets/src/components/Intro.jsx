import React, { useEffect, useState } from 'react';
import useVetaIdentity from '../contexts/VetaIdentityContext';
import { AppBar, Toolbar, Button, Typography, Card, Avatar, Link } from '@mui/material';
import { veta } from '../../../declarations/veta';
import VetaLogo from '../_assets/images/veta-logo.svg';
import DfinityLogo from '../_assets/images/infinity_logo.svg';
import background1 from '../_assets/images/home/background1.jpg';
import background2 from '../_assets/images/home/background2.png';
import background3 from '../_assets/images/home/background3.jpg';
import background4 from '../_assets/images/home/background4.jpg';
import thanhPic from '../_assets/images/home/thanh.png';
import markPic from '../_assets/images/home/mark.jpeg';
import {
	Handshake,
	HowToReg,
	Sync,
	Insights,
	FactCheck,
	ConnectWithoutContact,
	Twitter,
	LinkedIn,
	GitHub,
} from '@mui/icons-material';

function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='https://mui.com/'>
				Veta
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const Intro = () => {
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
					padding: '10px 24px',
				}}>
				<VetaLogo style={{ height: '45px' }} />
				<Toolbar>{/* content */}</Toolbar>
				<Button variant='text' color='inherit' onClick={signInByICProvider}>
					<DfinityLogo style={{ width: '24px', marginRight: '5px' }} />
					<strong className='align-self-end mt-1'>Login</strong>
				</Button>
			</AppBar>
			<section
				style={{
					height: '80vh',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#fff',
					backgroundImage: `url(${background1})`,
					backgroundSize: 'cover',
				}}>
				<Typography
					component='h2'
					variant='h2'
					sx={{
						position: 'relative',
						left: '200px',
						fontWeight: '500',
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
			</section>
			<section style={{ padding: '24px', height: '80vh', display: 'flex', flexDirection: 'column', color: '#000', backgroundImage: `url(${background2})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        <div>
          <Typography
            component='h3'
            variant='h3'>
            WHAT IS VETA
          </Typography>
          <Typography
            component='h5'
            variant='h5'>
            <p>Veta is not just a dApp but an ecosystem. Veta aims to build the identity layer and an ecosystem of verifiable data. Veta enables self sovereign identity.</p>
          </Typography>
        </div>
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
            <div>
              <Typography
                component='h4'
                variant='h4'>
                Benefits
              </Typography>
              <Typography
                component='h5'
                variant='h5'>
                <p>User have control of their data.</p>
                <p>Incentivize all participating stakeholders within the Veta ecosystem.</p>
                <p>Combat fraudulent and bad actors with verifiable data.</p>
                <p>Support businesses succeed with data driven decisions.</p>
              </Typography>
            </div>
            <div>
              <Typography
                component='h4'
                variant='h4'>
                Services
              </Typography>
              <Typography
                component='h5'
                variant='h5'>
                <p>Data Sharing</p>
                <p>Decentralized Voting</p>
                <p>Surveys/Polls</p>
                <p>KYC/AML Solutions</p>
                <p>Data Aggregation</p>
              </Typography>
            </div>
        </div>
        <div>
          <Typography
            component='h4'
            variant='h4'>
            Sample Use Cases
          </Typography>
          <Typography
            component='h4'
            variant='h4'>
            <p>Real World Scenarios</p>
          </Typography>
          <Typography
            component='h5'
            variant='h5'>
            <p>Job Application - Bob applies for a developer position and shares his professional profile with data from his Educational and Work credentials issued to him like a diploma, transcript of records, and a certification from his previouw employer. Alice the recruiter can view and verify these credentials easily thus giving Alice the confidence on her hiring decisions.</p>
            <p>Travel - Alice an avid traveller arrived in the Bahamas, Bob the immigration offices requests for her covid vaccination. Alice shares her covid vaccination certificate issued to her by the clinic which can then be verified that Alice is indeed vaccinated and can enjoy her vacation.</p>
            <p>Loan Application - Bob is an aspiring businessman who wants to apply for a loan to start a business, the loan officer requests for KYC and AML credentials along with his assets for collateral. Bob can share these data issued to him by his bank and crypto exchange platform he uses. The Loan Officer can now verify Bob's qualifications and issue a loan upon approval.</p>
            <p>Smart Government -  Alice was fined for a traffic violation, the highway officer requests for Alice's drivers licence and car registration. Alice then shared both of these credentials from different government bodies issues to Alice.</p>
          </Typography>
          <Typography
            component='h4'
            variant='h4'>
            <p>WEB 3.0 Scenarios</p>
          </Typography>
          <Typography
            component='h5'
            variant='h5'>
            <p>Decentralized Identity - Bob is a very private person and is concerned about how his data is shared, with Veta's decentralized identifiers and credentials Bob can prove his identity without showing all his data.</p>
            <p>Targeted Ads - Alice want to ensure that her product reaches her traget audience. With data attributed from the Veta ecosystem, advertisement services can utilize users' data to achieve target reach of potential customers.</p>
            <p>Market / Product Research - Bob's company is planning to launch their new product. With data provided by Veta, Bob can now make data driven decisions regarding his product.</p>
            <p>Seamless Data Sharing - Alice can login to multiple Web 3.0 platforms without filling up forms to register or checking out a product giving a more seamless web experience.</p>
            <p>Decentralized Voting - A DAO is voting for a proposal specific to updates regarding a new law in the US, the DAO uses Veta's voting solutions to only get votes from qualified voters based on the criteria to decide the voting outcome.</p>
          </Typography>
        </div>
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
					component='h3'
					variant='h3'
					sx={{
						position: 'relative',
						left: '34%',
						fontWeight: '500',
						width: '500px',
					}}>
					CONNECT YOUR IDENTITY TO THE DIGITAL WORLD
				</Typography>
			</section>
			<section
				style={{
					padding: '24px',
					height: '80vh',
					display: 'flex',
					flexDirection: 'column',
					color: '#000',
					backgroundImage: `url(${background2})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
				}}>
				<Typography component='h3' variant='h3' sx={{}}>
					HOW DOES IT WORK
				</Typography>
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<div style={{ height: '100%' }}></div>
					<div style={{ height: '100%', width: '100%', maxWidth: '1200px' }}>
						<div
							style={{
								height: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'baseline',
							}}>
							<div
								style={{
									maxWidth: '150px',
									height: '210px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<HowToReg sx={{ fontSize: 90 }} />
								<Typography component='h5' variant='h5'>
									1. Onboard
								</Typography>
								<span>User logins to wallet and onboards through KYC</span>
							</div>
							<div
								style={{
									maxWidth: '150px',
									height: '210px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Handshake sx={{ fontSize: 90 }} />
								<Typography component='h5' variant='h5'>
									2. Connect
								</Typography>
								<span>User connects wallet to data platforms</span>
							</div>
							<div
								style={{
									maxWidth: '150px',
									height: '210px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Sync sx={{ fontSize: 90 }} />
								<Typography component='h5' variant='h5'>
									3. Sync
								</Typography>
								<span>User manages data and syncs wallet to platform</span>
							</div>
							<div
								style={{
									maxWidth: '150px',
									height: '210px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<ConnectWithoutContact sx={{ fontSize: 90 }} />
								<Typography component='h5' variant='h5'>
									4. Share
								</Typography>
								<span>User shares data to verifiers and consumers</span>
							</div>
							<div
								style={{
									maxWidth: '150px',
									height: '210px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<FactCheck sx={{ fontSize: 90 }} />
								<Typography component='h5' variant='h5'>
									5. Verify
								</Typography>
								<span>Consumers verify data credibility through cryptographic signatures</span>
							</div>
							<div
								style={{
									maxWidth: '150px',
									height: '210px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Insights sx={{ fontSize: 90 }} />
								<Typography component='h5' variant='h5'>
									6. Process
								</Typography>
								<span>Consumers or Verifiers process verifiable data</span>
							</div>
						</div>
					</div>
					<div style={{ height: '100%' }}></div>
				</div>
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
				<Typography
					component='h2'
					variant='h2'
					sx={{
						position: 'relative',
						top: '24vh',
						left: '34%',
						fontWeight: '500',
						width: '360px',
					}}>
					AN ECOSYSTEM OF TRUST
				</Typography>
			</section>
			<section
				style={{
					padding: '24px',
					height: '80vh',
					display: 'flex',
					flexDirection: 'column',
					color: '#000',
					backgroundImage: `url(${background2})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
				}}>
				<Typography component='h3' variant='h3' sx={{}}>
					MEET THE TEAM
				</Typography>
				<div
					style={{
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Card
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							width: '410px',
							backgroundColor: 'rgba(0, 0, 0, 0.87)',
							color: '#fff',
							padding: '30px',
							marginRight: '30px',
						}}>
						<Avatar
							alt='Mark Albitos'
							src={markPic}
							style={{ width: '200px', height: '200px', border: '2px solid', marginBottom: '30px' }}
						/>
						<Typography component='h4' variant='h4'>
							Mark Albitos
						</Typography>
						<Typography component='h5' variant='h5'>
							Founder / Developer
						</Typography>
						<div
							style={{
								width: '136px',
								display: 'flex',
								justifyContent: 'space-between',
								marginTop: '30px',
							}}>
							<Twitter />
							<LinkedIn />
							<GitHub />
						</div>
					</Card>
					<Card
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							width: '410px',
							backgroundColor: 'rgba(0, 0, 0, 0.87)',
							color: '#fff',
							padding: '30px',
						}}>
						<Avatar
							alt='Thanh Tran'
							src={thanhPic}
							style={{ width: '200px', height: '200px', border: '2px solid', marginBottom: '30px' }}
						/>
						<Typography component='h4' variant='h4'>
							Thanh Tran
						</Typography>
						<Typography component='h5' variant='h5'>
							Co-Founder / Developer
						</Typography>
						<div
							style={{
								width: '136px',
								display: 'flex',
								justifyContent: 'space-between',
								marginTop: '30px',
							}}>
							<Twitter />
							<LinkedIn />
							<GitHub />
						</div>
					</Card>
				</div>
			</section>
			<footer
				style={{
					height: '100px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#fff',
					backgroundColor: 'rgba(0, 0, 0, 0.87)',
					padding: '24px',
				}}>
				<Copyright sx={{ pt: 4, color: '#fff' }} />
			</footer>
		</>
	);
};

export default Intro;
