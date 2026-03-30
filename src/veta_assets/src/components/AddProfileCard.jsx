import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import * as VetaWalletServices from '../services/VetaWalletServices.ic';
import useVetaIdentity from '../contexts/VetaIdentityContext';

const AddProfileCard = () => {
	const { refreshWallet, principal } = useVetaIdentity();

	const [open, setOpen] = useState(false);
	const [profile, setProfile] = useState({ name: '', email: '', isDefault: false });
	const [saving, setSaving] = useState(false);
	const handleAddProfile = async () => {
		try {
			setSaving(true);
			await VetaWalletServices.addProfile(principal, profile);
			// Todo: Auto refresh wallet realtime
			refreshWallet();
			seOpen(false);
		} catch (e) {
			console.error(e);
		} finally {
			setSaving(false);
		}
	};
	return (
		<>
			<Card sx={{ maxWidth: 345, height: '300px' }}>
				<CardContent
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Typography gutterBottom variant='h5' component='div' sx={{ textAlign: 'center' }}>
						Add Profile
					</Typography>
					<IconButton size='small' aria-label='Edit' onClick={() => setOpen(true)}>
						<AddIcon />
					</IconButton>
				</CardContent>
			</Card>
			<Dialog fullWidth={true} maxWidth={'xs'} open={open} onClose={() => setOpenShare(false)}>
				<DialogTitle>
					<Typography component='h3' variant='h3'>
						Add profile
					</Typography>
				</DialogTitle>
				<DialogContent>
					{/* <DialogContentText>You can revoke this profile from sharing anytime.</DialogContentText> */}
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Profile name'
						type='text'
						fullWidth
						variant='standard'
						onChange={(event) => setProfile({ ...profile, name: event.target.value })}
					/>
					<TextField
						autoFocus
						margin='dense'
						id='email'
						label='email'
						type='email'
						fullWidth
						variant='standard'
						onChange={(event) => setProfile({ ...profile, email: event.target.value })}
					/>
					<FormControlLabel
						control={
							<Switch
								checked={profile.isDefault}
								onChange={(event) => setProfile({ ...profile, isDefault: event.target.checked })}
								name='isDefault'
							/>
						}
						label='Default Profile?'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Close</Button>
					<LoadingButton
						loading={saving}
						sx={{ width: '110px' }}
						loadingPosition='start'
						variant='contained'
						onClick={handleAddProfile}>
						Save
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddProfileCard;
