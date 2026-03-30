import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { Paper, Card } from '@mui/material';
import * as Crypto from '../../utils/crypto';
import useVetaIdentity from '../../contexts/VetaIdentityContext';
import { getVetaWalletActor } from '../../services/actor';

const apiUrl = 'https://us-central1-thanhpage-d.cloudfunctions.net/api/v1';

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
	const { principal, vetaWallet, refreshWallet } = useVetaIdentity();

	const [userData, setUserData] = useState();
	const [encrypted, setEncrypted] = useState(null);
	const [session, setSession] = useState(null);
	const [kycUrl, setKycUrl] = useState('');
	const kycResultTimer = useRef();

	useEffect(() => {
		if (vetaWallet) {
			setUserData(vetaWallet);
		}
	}, [vetaWallet]);

	useEffect(() => {
		return () => {
			if (kycResultTimer.current) {
				clearInterval(kycResultTimer.current);
			}
		};
	}, []);

	const onboard = async () => {
		await axios.get(`${apiUrl}/identomat/getSession`).then((resp) => {
			setSession(resp.data);
			setKycUrl(`https://widget.identomat.com/?session_token=${resp.data}`);
		});
	};

	const getKycResult = async () => {
		const actor = getVetaWalletActor();
		if (!actor || !principal) return;

		const { data } = await axios.get(`${apiUrl}/identomat/result/${session}`);
		const { result } = data;

		if (result == 'approved') {
			const { person } = data;
			const { first_name } = person;

			setKycUrl('');
			let _userData = await actor.get(principal);
			_userData = { ..._userData, verified: true, name: first_name };
			await actor.update(_userData);
			setUserData(_userData);
			refreshWallet();
			if (kycResultTimer.current) {
				clearInterval(kycResultTimer.current);
			}
		}
	};

	useEffect(() => {
		if (kycUrl) {
			kycResultTimer.current = setInterval(() => {
				getKycResult();
			}, 2000);
		}
	}, [kycUrl]);

	const skipKyc = async () => {
		const actor = getVetaWalletActor();
		if (!actor || !principal) return;

		setSession(null);
		let _userData = await actor.get(principal);
		_userData = { ..._userData, verified: true, name: 'Anon' };
		await actor.update(_userData);
		setUserData(_userData);
		refreshWallet();
	};

	const getUserData = async () => {
		const actor = getVetaWalletActor();
		if (!actor || !principal) return;

		const res = await actor.get(principal);
		setUserData(res);
	};

	const signData = () => {
		const signature = Crypto.signData('hello');
		console.log('Signature:', signature);
	};

	const encryptData = () => {
		const test = { id: 1, interest: 'basketball' };
		const encryptedData = Crypto.encryptData(test);
		setEncrypted(encryptedData);
		console.log('Encrypted:', encryptedData);
	};

	const decryptData = () => {
		const decrypted = Crypto.decryptData(encrypted);
		console.log('Decrypted:', decrypted);
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
						<Button onClick={signData}>Test Signature</Button>
						<Button onClick={encryptData}>Test Encrypt</Button>
						<Button onClick={decryptData}>Test Decrypt</Button>
					</Card>
					<Card>{kycUrl && <Onboard kycUrl={kycUrl}></Onboard>}</Card>
					<Card>
						{userData && (
							<span>{`${userData.id} ${userData.name} - verified: ${userData.verified}`}</span>
						)}
					</Card>
					<Card>
						{userData?.data?.map((d, idx) => (
							<div key={idx}>
								<p>{d.dataType}</p>
								<p>{d.dataContent}</p>
							</div>
						))}
					</Card>
				</Paper>
				<Copyright sx={{ pt: 4 }} />
			</Container>
		</Box>
	);
}

export default Dashboard;
