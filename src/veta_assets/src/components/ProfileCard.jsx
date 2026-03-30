import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import User1 from '../_assets/images/users/user-round.svg';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { QRCodeSVG } from 'qrcode.react';
import LoadingButton from '@mui/lab/LoadingButton';
import * as VetaWalletServices from '../services/VetaWalletServices.ic';

const ProfileCard = ({ readonly, profile, onDelete }) => {
	const navigate = useNavigate();
	const { id: profileId, profileName, verified, data = [], isDefault } = profile;
	const [openShare, setOpenShare] = useState(false);
	const [sharing, setSharing] = useState(false);
	const [shared, setShared] = useState(false);
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

	const shareUrl = `${window.location.origin}${window.location.pathname}#/profile/${profileId}`;

	const handleShareProfile = async () => {
		try {
			setSharing(true);
			await VetaWalletServices.shareProfile(profile);
			setShared(true);
			setSnackbar({ open: true, message: 'Profile shared! Anyone with the link can view it.', severity: 'success' });
		} catch (e) {
			console.error(e);
			setSnackbar({ open: true, message: 'Failed to share profile', severity: 'error' });
		} finally {
			setSharing(false);
		}
	};

	const handleCopyLink = () => {
		navigator.clipboard?.writeText(shareUrl);
		setSnackbar({ open: true, message: 'Link copied to clipboard', severity: 'info' });
	};

	if (!profileName) return null;

	return (
		<>
			<Card sx={{ maxWidth: 345, height: '300px', display: 'flex', flexDirection: 'column' }}>
				<Box
					sx={{
						position: 'relative',
						paddingTop: '30px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Avatar src={User1} sx={{ width: '80px', height: '80px' }} color='inherit' />
					{verified && (
						<CheckCircleIcon
							sx={{
								position: 'absolute',
								left: 'calc(50% + 30px)',
								top: '30px',
								color: '#2f7dff',
								zIndex: 1,
							}}
						/>
					)}
				</Box>
				<CardContent sx={{ flex: 1, textAlign: 'center' }}>
					<Typography gutterBottom variant='h5' component='div'>
						{profileName}
					</Typography>
					<Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', flexWrap: 'wrap' }}>
						{isDefault && <Chip label='Default' size='small' color='primary' variant='outlined' />}
						{data.length > 0 && (
							<Chip label={`${data.length} ${data.length === 1 ? 'entry' : 'entries'}`} size='small' variant='outlined' />
						)}
					</Box>
				</CardContent>
				{!readonly && (
					<CardActions sx={{ justifyContent: 'center', pb: 2 }}>
						<Button size='small' onClick={() => setOpenShare(true)}>
							Share
						</Button>
						{profileId && (
							<Button size='small' onClick={() => navigate(`/dashboard/profiles/${profileId}`)}>
								View
							</Button>
						)}
						{onDelete && (
							<Button size='small' color='error' onClick={onDelete}>
								Delete
							</Button>
						)}
					</CardActions>
				)}
			</Card>

			{/* Share Dialog */}
			<Dialog fullWidth maxWidth='xs' open={openShare} onClose={() => setOpenShare(false)}>
				<DialogTitle>
					<Typography component='h3' variant='h3'>
						Share "{profileName}"
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 2 }}>
						{shared
							? 'Profile is shared! Scan the QR code or copy the link.'
							: 'Share this profile publicly. Anyone with the link can view it.'}
					</DialogContentText>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
						<QRCodeSVG value={shareUrl} size={180} />
					</Box>
					{shared && (
						<Box sx={{ textAlign: 'center', mt: 1 }}>
							<Button size='small' startIcon={<OpenInNewIcon />} onClick={handleCopyLink}>
								Copy Link
							</Button>
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenShare(false)}>Close</Button>
					{!shared && (
						<LoadingButton
							loading={sharing}
							variant='contained'
							onClick={handleShareProfile}>
							Share Profile
						</LoadingButton>
					)}
				</DialogActions>
			</Dialog>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={() => setSnackbar({ ...snackbar, open: false })}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
				<Alert severity={snackbar.severity} variant='filled'>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default ProfileCard;
