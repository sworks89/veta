// material-ui
import { useState } from 'react';
import { Typography, Button } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { vetawallet } from '../../../../declarations/vetawallet';
import useVetaIdentity from '../../contexts/VetaIdentityContext';
import useMainLayout from '../../layout/MainLayout/MainLayoutContext';
import User1 from '../../_assets/images/users/user-round.svg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { QRCodeSVG } from 'qrcode.react';
import Modal from '@mui/material/Modal';

const ProfilesPage = () => {
	const { gridSpacing, customization } = useMainLayout();
	const { signInByICProvider, signOut, principal, client, vetaWallet } = useVetaIdentity();

	const [openShare, setOpenShare] = useState(false);

	const addDataToProfile = async (data) => {
		// userData.data.push(data);
		let res = await vetawallet.update(userData);
	};

	return (
		<>
			<Typography variant='h2' component='h2' sx={{ marginBottom: gridSpacing }}>
				Your profiles
			</Typography>

			<Grid container spacing={gridSpacing}>
				{/* {vetaWallet.profiles.map((profile) => (
					<>
						<p>{profile.profileName}</p>
						{profile.data.map((d) => (
							<span>{`${Object.keys(d.dataCategory)}-${d.dataType} ${d.dataContent} Signature: (${
								d.signature
							})`}</span>
						))}
					</>
				))} */}
				<Grid item xs={12} sm={6} md={4}>
					<Card sx={{ maxWidth: 345 }}>
						<Box
							sx={{
								position: 'relative',
								paddingTop: '50px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Avatar src={User1} sx={{ width: '100px', height: '100px' }} color='inherit' />
							{vetaWallet.verified && (
								<CheckCircleIcon
									sx={{
										position: 'absolute',
										left: 'calc(50% + 40px)',
										top: '50px',
										color: '#2f7dff',
										zIndex: 1,
									}}
								/>
							)}
						</Box>
						<CardContent>
							<Typography gutterBottom variant='h5' component='div' sx={{ textAlign: 'center' }}>
								{vetaWallet.name}
							</Typography>
							{/* <Typography variant='body2' color='text.secondary'>
								Lizards are a widespread group of squamate reptiles, with over 6,000 species,
								ranging across all continents except Antarctica
							</Typography> */}
						</CardContent>
						<CardActions sx={{ alignItems: 'center' }}>
							<Button size='small' sx={{ mr: 'auto' }} onClick={() => setOpenShare(true)}>
								Share
							</Button>
							{/* <Button size='small'>Learn More</Button> */}
							<IconButton size='small' aria-label='Edit'>
								<EditIcon />
							</IconButton>
							<IconButton size='small' aria-label='delete'>
								<DeleteIcon />
							</IconButton>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

			<Dialog fullWidth={true} maxWidth={'xs'} open={openShare} onClose={() => setOpenShare(false)}>
				<DialogTitle>
					<Typography component='h3' variant='h3'>
						Share your profile
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>You can revoke this profile from sharing anytime.</DialogContentText>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '24px',
						}}>
						<QRCodeSVG value='https://reactjs.org/' />
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenShare(false)}>Close</Button>
					<Button onClick={() => setOpenShare(false)}>Share</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ProfilesPage;
