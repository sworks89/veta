import * as React from 'react';
import axios from 'axios';
import { vetawallet } from '../../../../declarations/vetawallet';
import { Principal } from '@dfinity/principal';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
// import { mainListItems, secondaryListItems } from './listItems';
import { Paper, Card } from '@mui/material';
import QRCode from 'qrcode.react';
import useVetaIdentity from '../../contexts/VetaIdentityContext';

function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='https://k3gdk-giaaa-aaaaj-aivfa-cai.ic0.app/'>
				Veta
			</Link>{' '}
			2022
		</Typography>
	);
}

function Onboard(props) {
	const { kycUrl } = props;
	return (
		<iframe
			style={{
				width: '100%',
				height: '60vh',
			}}
			className='iframe-kyc'
			src={kycUrl}
			allow='camera'></iframe>
	);
}

function Dashboard() {
	const { signInByICProvider, signOut, principal, client, vetaWallet } = useVetaIdentity();

	const [userData, setUserData] = React.useState();
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const [session, setSession] = React.useState(null);
	const [kycUrl, setKycUrl] = React.useState('');

	const onboard = async () => {
		await axios
			.get('https://us-central1-thanhpage-d.cloudfunctions.net/api/v1/identomat/getSession')
			.then((resp) => {
				setSession(resp.data);
				setKycUrl(`https://widget.identomat.com/?session_token=${resp.data}`);
			});
	};

	const getKycResult = async () => {
		await axios
			.get(`https://us-central1-thanhpage-d.cloudfunctions.net/api/v1/identomat/result/${session}`)
			.then((resp) => {
				console.log(resp);
			});
	};

	const skipKyc = async () => {
		setSession(null);
		let userData = await vetawallet.get(Principal.fromText(principal));
		userData.verified = true;
		userData.name = 'Anon';
		let res = await vetawallet.update(userData);
		console.log(res);
	};

	const getUserData = async () => {
		const res = await vetawallet.get(Principal.fromText(principal));
		// console.log(res);
		setUserData(res);
	};

	return (
		<Box
			component='main'
			sx={{
				backgroundColor: (theme) =>
					theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
				flexGrow: 1,
				height: '100vh',
				overflow: 'auto',
			}}>
			<Toolbar />
			<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
				<Paper>
					<Card>
						<span>Onboard now to get started. </span>
						<Button onClick={onboard}>KYC Onboarding</Button>
						<Button onClick={skipKyc}>Skip KYC</Button>
						<Button onClick={getUserData}>Get User Data</Button>
					</Card>
					<Card>{kycUrl && <Onboard kycUrl={kycUrl}></Onboard>}</Card>
					<Card>
						{userData && (
							<span>{`${userData.id} ${userData.name} - verified: ${userData.verified}`}</span>
						)}
						{/* <QRCode value='https://reactjs.org/' renderAs='canvas' /> */}
					</Card>
					<Card>
						{userData &&
							userData.data.map((d) => (
								<>
									<p>{d.dataType}</p>
									<p>{d.dataContent}</p>
								</>
							))}
						{/* <QRCode value='https://reactjs.org/' renderAs='canvas' /> */}
					</Card>
				</Paper>
				<Copyright sx={{ pt: 4 }} />
			</Container>
		</Box>
	);
}

export default Dashboard;
