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
import * as VetaWalletServices from '../services/VetaWalletServices.ic';
import useVetaIdentity from '../contexts/VetaIdentityContext';

const AddProfileCard = () => {
	const { refreshWallet, principal } = useVetaIdentity();

	const [open, setOpen] = useState(false);
	const [profileName, setProfileName] = useState('');
	const [isDefault, setIsDefault] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');

	const handleAddProfile = async () => {
		const name = profileName.trim();
		if (!name) {
			setError('Please enter a profile name');
			return;
		}
		try {
			setSaving(true);
			setError('');
			await VetaWalletServices.addProfile(principal, { name, isDefault, data: [] });
			await refreshWallet();
			setOpen(false);
			setProfileName('');
			setIsDefault(false);
		} catch (e) {
			console.error(e);
			setError('Failed to create profile');
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
					<IconButton size='small' aria-label='Add profile' onClick={() => setOpen(true)}>
						<AddIcon />
					</IconButton>
				</CardContent>
			</Card>
			<Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
				<DialogTitle>
					<Typography component='h3' variant='h3'>
						Create Profile
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
						Profiles let you organize and share subsets of your data.
					</Typography>
					<TextField
						autoFocus
						margin='dense'
						label='Profile name'
						placeholder='e.g. Work, Personal, Public'
						fullWidth
						variant='standard'
						value={profileName}
						onChange={(e) => {
							setProfileName(e.target.value);
							setError('');
						}}
						onKeyDown={(e) => e.key === 'Enter' && handleAddProfile()}
						error={!!error}
						helperText={error}
						inputProps={{ maxLength: 64 }}
					/>
					<FormControlLabel
						sx={{ mt: 1 }}
						control={
							<Switch
								checked={isDefault}
								onChange={(e) => setIsDefault(e.target.checked)}
								name='isDefault'
							/>
						}
						label='Default Profile'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<LoadingButton
						loading={saving}
						variant='contained'
						onClick={handleAddProfile}
						disabled={!profileName.trim()}>
						Create
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddProfileCard;
