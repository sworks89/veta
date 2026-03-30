import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useVetaIdentity from '../../contexts/VetaIdentityContext';
import useMainLayout from '../../layout/MainLayout/MainLayoutContext';
import ProfileCard from '../../components/ProfileCard';
import AddProfileCard from '../../components/AddProfileCard';
import * as VetaWalletServices from '../../services/VetaWalletServices.ic';

const ProfilesPage = () => {
	const { gridSpacing } = useMainLayout();
	const { principal, vetaWallet, refreshWallet } = useVetaIdentity();
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

	const handleDeleteProfile = async (profileId) => {
		try {
			// Also unshare if it was shared
			try {
				await VetaWalletServices.unshareProfile(profileId);
			} catch {
				// May not have been shared — ignore
			}
			await VetaWalletServices.deleteProfile(principal, profileId);
			await refreshWallet();
			setSnackbar({ open: true, message: 'Profile deleted', severity: 'success' });
		} catch (e) {
			setSnackbar({ open: true, message: 'Failed to delete: ' + e.message, severity: 'error' });
		}
	};

	return (
		<>
			<Typography variant='h2' component='h2' sx={{ marginBottom: gridSpacing }}>
				Your profiles
			</Typography>
			<Grid container spacing={gridSpacing}>
				{vetaWallet?.name && (
					<Grid item xs={12} sm={6} md={4}>
						<ProfileCard profile={{ profileName: vetaWallet.name, verified: vetaWallet.verified }} />
					</Grid>
				)}
				{vetaWallet?.profiles?.map((profile, idx) => (
					<Grid item xs={12} sm={6} md={4} key={profile.id || idx}>
						<ProfileCard profile={profile} onDelete={() => handleDeleteProfile(profile.id)} />
					</Grid>
				))}
				<Grid item xs={12} sm={6} md={4}>
					<AddProfileCard />
				</Grid>
			</Grid>

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

export default ProfilesPage;
