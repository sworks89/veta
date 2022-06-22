import { useState, useEffect, useRef } from 'react';
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
	const { signInByICProvider, signOut, principal, client, vetaWallet } = useVetaIdentity();

	const [userData, setUserData] = useState();
	const [anchorElUser, setAnchorElUser] = useState(null);

	const [session, setSession] = useState(null);
	const [kycUrl, setKycUrl] = useState('');
	const kycResultTimer = useRef();

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
		const { data } = await axios.get(`${apiUrl}/identomat/result/${session}`);
		const { result } = data;

		if (result == 'approved') {
			const {
				// {
				//     "result": "approved",
				//     "similarity": 0.9034052020554081,
				//     "live": false,
				//     "document_type": "id",
				//     "general_document": [],
				//     "reject_reason": {
				//         "value": "",
				//         "description": ""
				//     },
				//     "result_comment": "",
				//     "face_images": 1,
				//     "id_card_front": {
				//         "Sex_en_US": "M",
				//         "Date_of_Birth_en_US": "MM/DD/YYYY",
				//         "Date_of_Expiry_en_US": "MM/DD/YYYY",
				//         "Date_of_Issue_en_US": "MM/DD/YYYY",
				//         "Issuing_State_Code_en_US": "ARE",
				//         "Date_of_Birth_ISO": "1989-11-20T00:00:00.000Z",
				//         "Date_of_Expiry_ISO": "2025-03-23T00:00:00.000Z"
				//     },
				//     "id_card_back": {
				//         "Document_Number_en_US": "xxxxxxxx",
				//         "Issuing_State_Code_en_US": "ARE",
				//         "Given_Names_en_US": "TRAN MINH",
				//         "Surname_en_US": "THANH",
				//         "Nationality_Code_en_US": "VNM",
				//         "Sex_en_US": "M",
				//         "Personal_Number_en_US": "xxxxxxxxxx",
				//         "Date_of_Birth_en_US": "MM/DD/YYYY",
				//         "Date_of_Expiry_en_US": "MM/DD/YYYY",
				//         "Nationality_en_US": "VNM",
				//         "Date_of_Birth_ISO": "1989-11-20T00:00:00.000Z",
				//         "Date_of_Expiry_ISO": "2025-03-23T00:00:00.000Z"
				//     },
				//     "suggested": {},
				//     "person": {
				//         "first_name": "TRAN MINH",
				//         "last_name": "THANH",
				//         "birthday": "11/20/1989",
				//         "citizenship": "ARE",
				//         "nationality": "VNM",
				//         "document_number": "xxxxxxxx",
				//         "document_issued": "MM/DD/YYYY",
				//         "document_expires": "MM/DD/YYYY",
				//         "birthday_time": "1989-11-20T00:00:00.000Z",
				//         "age": 32,
				//         "document_expires_time": "2025-03-23T00:00:00.000Z",
				//         "issuing_state": "ARE",
				//         "sex": "M",
				//         "personal_number": "xxxxxxxxx",
				//         "status": "FIELDS_MISMATCH"
				//     }
				// }

				result,
				similarity,
				live,
				document_type,
				general_document,
				reject_reason,
				result_comment,
				face_images,
				id_card_front,
				id_card_back,
				suggested,
				person,
			} = data;
			const { value, description } = reject_reason;
			// const {
			// 	Sex_en_US,
			// 	Date_of_Birth_en_US,
			// 	Date_of_Expiry_en_US,
			// 	Date_of_Issue_en_US,
			// 	Issuing_State_Code_en_US,
			// 	Date_of_Birth_ISO,
			// 	Date_of_Expiry_ISO,
			// } = id_card_front;
			// const {
			// 	Document_Number_en_US,
			// 	Issuing_State_Code_en_US,
			// 	Given_Names_en_US,
			// 	Surname_en_US,
			// 	Nationality_Code_en_US,
			// 	Sex_en_US,
			// 	Personal_Number_en_US,
			// 	Date_of_Birth_en_US,
			// 	Date_of_Expiry_en_US,
			// 	Nationality_en_US,
			// 	Date_of_Birth_ISO,
			// 	Date_of_Expiry_ISO,
			// } = id_card_back;
			const {
				first_name,
				last_name,
				birthday,
				citizenship,
				nationality,
				document_number,
				document_issued,
				document_expires,
				birthday_time,
				age,
				document_expires_time,
				issuing_state,
				sex,
				personal_number,
				status,
			} = person;
			// Found result
			setKycUrl();
			let _userData = await vetawallet.get(Principal.fromText(principal));
			_userData.verified = true;
			_userData.name = first_name;
			await vetawallet.update(_userData);
			setUserData(_userData);
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
		setSession(null);
		let _userData = await vetawallet.get(Principal.fromText(principal));
		_userData.verified = true;
		_userData.name = 'Anon';
		let res = await vetawallet.update(_userData);
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
