import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import User1 from '../_assets/images/users/user-round.svg';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { vetawallet } from '../../../declarations/vetawallet';
import { QRCodeSVG } from 'qrcode.react';
import LoadingButton from '@mui/lab/LoadingButton';
import * as VetaWalletServices from '../services/VetaWalletServices.ic';

const ProfileCard = ({ readonly, profile }) => {
	const { id: profileId, profileName, verified, data = [] } = profile;
	const [openShare, setOpenShare] = useState(false);
	const [sharing, setSharing] = useState(false);

	const handleShareProfile = async () => {
		try {
			setSharing(true);
			await VetaWalletServices.shareProfile(profile);
			setOpenShare(false);
		} catch (e) {
			console.log(e);
		} finally {
			setSharing(false);
		}
	};
	if (!profileId) return null;
	return (
		<>
			<Card sx={{ maxWidth: 345, height: '300px' }}>
				<Box
					sx={{
						position: 'relative',
						paddingTop: '50px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Avatar src={User1} sx={{ width: '100px', height: '100px' }} color='inherit' />
					{verified && (
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
						{profileName}
					</Typography>
					{/* <Typography variant='body2' color='text.secondary'>
								Lizards are a widespread group of squamate reptiles, with over 6,000 species,
								ranging across all continents except Antarctica
							</Typography> */}
					{data.map((d) => (
						<span>{`${Object.keys(d.dataCategory)}-${d.dataType} ${d.dataContent} Signature: (${
							d.signature
						})`}</span>
					))}
				</CardContent>
				{!readonly && (
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
				)}
			</Card>
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
						<QRCodeSVG value={`https://${window.location.hostname}/#/profile/${profileId}`} />
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenShare(false)}>Close</Button>

					<LoadingButton
						loading={sharing}
						sx={{ width: '110px' }}
						loadingPosition='start'
						variant='contained'
						onClick={handleShareProfile}>
						Share
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ProfileCard;
