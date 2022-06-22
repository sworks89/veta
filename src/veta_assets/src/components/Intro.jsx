import React, { useEffect, useState } from 'react';
import useVetaIdentity from '../contexts/VetaIdentityContext';
import {
	AppBar,
	Toolbar,
	Button,
	Typography,
	Card,
	Avatar,
	Link,
	Container,
	Box,
	Paper,
	Grid,
	IconButton,
	Stack,
} from '@mui/material';
import { vetawallet } from '../../../declarations/vetawallet';
import VetaLogo from '../_assets/images/veta-logo.svg';
import DfinityLogo from '../_assets/images/infinity_logo.svg';
import background1 from '../_assets/images/home/background1.jpeg';
import background2 from '../_assets/images/home/background2.png';
import background3 from '../_assets/images/home/background3.jpeg';
import background4 from '../_assets/images/home/background4.jpeg';
import thanhPic from '../_assets/images/home/thanh.png';
import markPic from '../_assets/images/home/mark.jpeg';
import User1 from '../_assets/images/users/user-round.svg';
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
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();
	const [count, setCount] = useState();
	const [profile, setProfile] = useState();

	// const refreshCounter = async () => {
	// 	const res = await veta.getValue();
	// 	setCount(res.toString());
	// };

	// const refreshProfile = async () => {
	// 	const res = await veta.find('mark');
	// 	setProfile(res.toString());
	// };

	// const addCounter = async () => {
	// 	await veta.increment();
	// 	refreshCounter();
	// };

	// const sign = async () => {
	// 	await veta.insert('mark', count, 'Deira');
	// 	refreshProfile();
	// };
	const handleHomeLogin = () => {
		signInByICProvider(() => {
			navigate('/dashboard');
		});
	};
	useEffect(() => {
		// refreshCounter();
		// refreshProfile();
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
					justifyContent: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.87)',
					padding: '10px 24px',
				}}>
				<Box sx={{ width: '100%', maxWidth: 'xs', display: 'flex', color: 'white' }}>
					<VetaLogo style={{ height: '45px' }} />
					<Toolbar sx={{ width: '100%' }}>{/* content */}</Toolbar>
					{vetaWallet ? (
						<>
							<Button
								sx={{ marginRight: '30px' }}
								variant='text'
								color='inherit'
								onClick={() => navigate('/dashboard')}>
								<strong className='align-self-end mt-1'>Dashboard</strong>
							</Button>
							<Box sx={{ display: 'flex', flexDirection: 'column' }}>
								<Avatar
									onClick={() => navigate('/dashboard')}
									src={User1}
									sx={{
										width: '30px',
										height: '30px',
										margin: '8px 0 8px 8px !important',
										cursor: 'pointer',
										marginLeft: '30px',
									}}
									color='inherit'
								/>
								{/* <Typography variant='h6' component='h6' sx={{ color: 'white' }}>
									{vetaWallet.name}
								</Typography> */}
							</Box>
						</>
					) : (
						<Button sx={{}} variant='text' color='inherit' onClick={handleHomeLogin}>
							<DfinityLogo style={{ width: '24px', marginRight: '5px' }} />
							<strong className='align-self-end mt-1'>Login</strong>
						</Button>
					)}
				</Box>
			</AppBar>
			<Paper
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Box
					sx={{
						minHeight: '80vh',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: { xs: 'flex-start', sm: 'flex-end', xl: 'center' },
						color: '#fff',
						backgroundImage: `url(${background1})`,
						backgroundSize: 'cover',
					}}>
					<Box
						sx={{
							maxWidth: 'lg',
							padding: '50px 24px',
							display: 'flex',
							marginRight: { md: '100px', md: '200px', xl: 0 },
						}}>
						<Typography
							component='h2'
							variant='h2'
							sx={{
								// marginTop: '150px',
								fontWeight: '500',
								color: 'white',
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
				</Box>
				<Box
					style={{
						minHeight: '80vh',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						backgroundImage: `url(${background2})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
					}}>
					<Box
						sx={{
							width: '100%',
							maxWidth: 'lg',
							display: 'flex',
							flexDirection: 'column',
							padding: '50px 24px',
						}}>
						<Typography component='h2' variant='h2'>
							WHAT IS VETA
						</Typography>
						<Typography component='h5' variant='h5'>
							<p>
								Veta is not just a dApp but an ecosystem. Veta aims to build the identity layer and
								an ecosystem of verifiable data. Veta enables self sovereign identity.
							</p>
						</Typography>
						<Box
							sx={{
								height: '100%',
								width: '100%',
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'baseline',
								maxWidth: 'lg',
							}}>
							<Box sx={{ marginRight: '24px' }}>
								<Typography component='h4' variant='h4'>
									Benefits
								</Typography>
								<Typography component='h5' variant='h5'>
									<p>User have control of their data.</p>
									<p>Incentivize all participating stakeholders within the Veta ecosystem.</p>
									<p>Combat fraudulent and bad actors with verifiable data.</p>
									<p>Support businesses succeed with data driven decisions.</p>
								</Typography>
							</Box>
							<Box>
								<Typography component='h4' variant='h4'>
									Services
								</Typography>
								<Typography component='h5' variant='h5'>
									<p>Data Sharing</p>
									<p>Decentralized Voting</p>
									<p>Surveys/Polls</p>
									<p>KYC/AML Solutions</p>
									<p>Data Aggregation</p>
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								width: '100%',
								maxWidth: 'lg',
								marginTop: '24px',
							}}>
							<Typography component='h3' variant='h3'>
								Sample Use Cases
							</Typography>
							<Typography component='h4' variant='h4'>
								<p>Real World Scenarios</p>
							</Typography>
							<Typography component='h5' variant='h5' sx={{ textAlign: 'justify' }}>
								<p>
									Job Application - Bob applies for a developer position and shares his professional
									profile with data from his Educational and Work credentials issued to him like a
									diploma, transcript of records, and a certification from his previouw employer.
									Alice the recruiter can view and verify these credentials easily thus giving Alice
									the confidence on her hiring decisions.
								</p>
								<p>
									Travel - Alice an avid traveller arrived in the Bahamas, Bob the immigration
									offices requests for her covid vaccination. Alice shares her covid vaccination
									certificate issued to her by the clinic which can then be verified that Alice is
									indeed vaccinated and can enjoy her vacation.
								</p>
								<p>
									Loan Application - Bob is an aspiring businessman who wants to apply for a loan to
									start a business, the loan officer requests for KYC and AML credentials along with
									his assets for collateral. Bob can share these data issued to him by his bank and
									crypto exchange platform he uses. The Loan Officer can now verify Bob's
									qualifications and issue a loan upon approval.
								</p>
								<p>
									Smart Government - Alice was fined for a traffic violation, the highway officer
									requests for Alice's drivers licence and car registration. Alice then shared both
									of these credentials from different government bodies issues to Alice.
								</p>
							</Typography>
							<Typography
								component='h4'
								variant='h4'
								sx={{
									marginTop: '24px',
								}}>
								<p>WEB 3.0 Scenarios</p>
							</Typography>
							<Typography component='h5' variant='h5' sx={{ textAlign: 'justify' }}>
								<p>
									Decentralized Identity - Bob is a very private person and is concerned about how
									his data is shared, with Veta's decentralized identifiers and credentials Bob can
									prove his identity without showing all his data.
								</p>
								<p>
									Targeted Ads - Alice want to ensure that her product reaches her traget audience.
									With data attributed from the Veta ecosystem, advertisement services can utilize
									users' data to achieve target reach of potential customers.
								</p>
								<p>
									Market / Product Research - Bob's company is planning to launch their new product.
									With data provided by Veta, Bob can now make data driven decisions regarding his
									product.
								</p>
								<p>
									Seamless Data Sharing - Alice can login to multiple Web 3.0 platforms without
									filling up forms to register or checking out a product giving a more seamless web
									experience.
								</p>
								<p>
									Decentralized Voting - A DAO is voting for a proposal specific to updates
									regarding a new law in the US, the DAO uses Veta's voting solutions to only get
									votes from qualified voters based on the criteria to decide the voting outcome.
								</p>
							</Typography>
						</Box>
					</Box>
				</Box>
				<Box
					style={{
						minHeight: '80vh',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundImage: `url(${background4})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
					}}>
					{/* <img src={background1} style={{ width: '100%', position: 'absolute', top: '64px' }}/> */}
					<Box
						sx={{
							padding: '50px 24px',
							width: '100%',
							maxWidth: 'lg',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
						}}>
						<Typography
							component='h3'
							variant='h3'
							sx={{
								right: '50px',
								fontWeight: '500',
								color: 'white',
								textShadow: '1px 1px 1px #373737',
							}}>
							CONNECT YOUR IDENTITY TO THE DIGITAL WORLD
						</Typography>
					</Box>
				</Box>
				<Box
					style={{
						// minHeight: '80vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						color: '#000',
						backgroundImage: `url(${background2})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
					}}>
					<Box
						sx={{
							padding: '50px 24px',
							width: '100%',
							maxWidth: 'lg',
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Typography
							component='h3'
							variant='h3'
							sx={{ width: '100%', textAlign: 'center', marginBottom: '24px' }}>
							HOW DOES IT WORK
						</Typography>
						<Grid contaner>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={6} sm={4} md={2}>
										<Box
											style={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'center',
												textAlign: 'justify',
												padding: '24px',
											}}>
											<HowToReg sx={{ fontSize: 90 }} />
											<Typography component='h4' variant='h3' sx={{ marginBottom: '10px' }}>
												1. Onboard
											</Typography>
											<Typography paragraph>
												User logins to wallet and onboards through KYC
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={6} sm={4} md={2}>
										<Box
											style={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'center',
												textAlign: 'justify',
												padding: '24px',
											}}>
											<Handshake sx={{ fontSize: 90 }} />
											<Typography component='h4' variant='h3' sx={{ marginBottom: '10px' }}>
												2. Connect
											</Typography>
											<Typography paragraph>User connects wallet to data platforms</Typography>
										</Box>
									</Grid>
									<Grid item xs={6} sm={4} md={2}>
										<Box
											style={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'center',
												textAlign: 'justify',
												padding: '24px',
											}}>
											<Sync sx={{ fontSize: 90 }} />
											<Typography component='h4' variant='h3' sx={{ marginBottom: '10px' }}>
												3. Sync
											</Typography>
											<Typography paragraph>
												User manages data and syncs wallet to platform
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={6} sm={4} md={2}>
										<Box
											style={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'center',
												textAlign: 'justify',
												padding: '24px',
											}}>
											<ConnectWithoutContact sx={{ fontSize: 90 }} />
											<Typography component='h4' variant='h3' sx={{ marginBottom: '10px' }}>
												4. Share
											</Typography>
											<Typography paragraph>User shares data to verifiers and consumers</Typography>
										</Box>
									</Grid>
									<Grid item xs={6} sm={4} md={2}>
										<Box
											style={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'center',
												textAlign: 'justify',
												padding: '24px',
											}}>
											<FactCheck sx={{ fontSize: 90 }} />
											<Typography component='h4' variant='h3' sx={{ marginBottom: '10px' }}>
												5. Verify
											</Typography>
											<Typography paragraph>
												Consumers verify data credibility through cryptographic signatures
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={6} sm={4} md={2}>
										<Box
											style={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'center',
												textAlign: 'justify',
												padding: '24px',
											}}>
											<Insights sx={{ fontSize: 90 }} />
											<Typography component='h4' variant='h3' sx={{ marginBottom: '10px' }}>
												6. Process
											</Typography>
											<Typography paragraph>
												Consumers or Verifiers process verifiable data
											</Typography>
										</Box>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Box
					style={{
						minHeight: '80vh',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundImage: `url(${background3})`,
						backgroundSize: 'cover',
					}}>
					<Box
						sx={{
							padding: '50px 0',
							width: '100%',
							maxWidth: 'lg',
							display: 'flex',
							flexDirection: 'column',
							justifyCOntent: 'center',
							alignItems: 'center',
						}}>
						<Typography
							component='h2'
							variant='h2'
							sx={{
								position: 'relative',
								top: '24vh',
								// left: '34%',
								fontWeight: '500',
								width: '360px',
								color: '#fff',
								padding: '24px',
								textShadow: '1px 1px 1px #373737',
							}}>
							AN ECOSYSTEM OF TRUST
						</Typography>
					</Box>{' '}
				</Box>
				<Box
					style={{
						padding: '50px 0',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						color: '#000',
						backgroundImage: `url(${background2})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
					}}>
					<Box
						sx={{
							padding: '50px 0',
							width: '100%',
							maxWidth: 'lg',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}>
						<Typography
							component='h3'
							variant='h3'
							sx={{ width: '100%', textAlign: 'center', marginBottom: '100px' }}>
							MEET THE TEAM
						</Typography>
						{/* <Typography component='h3' variant='h3' sx={{}}>
							MEET THE TEAM
						</Typography> */}
						<Box
							sx={{
								height: '100%',
								display: 'flex',
								flexDirection: { xs: 'column', sm: 'row' },
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Card
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: 'rgba(0, 0, 0, 0.87)',
									color: '#fff',
									margin: '30px',
									padding: '30px',
									width: '350px',
								}}>
								<Avatar
									alt='Mark Albitos'
									src={markPic}
									style={{
										width: '200px',
										height: '200px',
										border: '2px solid',
										marginBottom: '30px',
									}}
								/>
								<Typography component='h4' variant='h4' sx={{ color: '#fff' }}>
									Mark Albitos
								</Typography>
								<Typography component='h5' variant='h5' sx={{ color: '#fff' }}>
									Founder / Developer
								</Typography>
								<Box
									style={{
										width: '136px',
										display: 'flex',
										justifyContent: 'space-between',
										marginTop: '30px',
									}}>
									<Link
										href='https://twitter.com/addictedToICP'
										target='_blank'
										sx={{ color: 'white' }}>
										<Twitter />
									</Link>
									<Link
										href='https://www.linkedin.com/in/mark-albitos'
										target='_blank'
										sx={{ color: 'white' }}>
										<LinkedIn />
									</Link>
									<Link href='https://github.com/sworks89' target='_blank' sx={{ color: 'white' }}>
										<GitHub />
									</Link>
								</Box>
							</Card>
							<Card
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: 'rgba(0, 0, 0, 0.87)',
									color: '#fff',
									margin: '30px',
									padding: '30px',
									width: '350px',
								}}>
								<Avatar
									alt='Thanh Tran'
									src={thanhPic}
									style={{
										width: '200px',
										height: '200px',
										border: '2px solid',
										marginBottom: '30px',
									}}
								/>
								<Typography component='h4' variant='h4' sx={{ color: '#fff' }}>
									Thanh Tran
								</Typography>
								<Typography component='h5' variant='h5' sx={{ color: '#fff' }}>
									Co-Founder / Developer
								</Typography>
								<Box
									style={{
										width: '136px',
										display: 'flex',
										justifyContent: 'space-between',
										marginTop: '30px',
									}}>
									<Link
										href='https://twitter.com/mthanh_tran'
										target='_blank'
										sx={{ color: 'white' }}>
										<Twitter />
									</Link>
									<Link
										href='https://www.linkedin.com/in/mthanhtran/'
										target='_blank'
										sx={{ color: 'white' }}>
										<LinkedIn />
									</Link>
									<Link
										href='https://github.com/mthanhtran'
										target='_blank'
										sx={{ color: 'white' }}>
										<GitHub />
									</Link>
								</Box>
							</Card>
						</Box>
					</Box>
				</Box>
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
			</Paper>
		</>
	);
};

export default Intro;
