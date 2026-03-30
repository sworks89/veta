// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useVetaIdentity from '../../contexts/VetaIdentityContext';
import useMainLayout from '../../layout/MainLayout/MainLayoutContext';

import ProfileCard from '../../components/ProfileCard';
import AddProfileCard from '../../components/AddProfileCard';

const ProfilesPage = () => {
	const { gridSpacing } = useMainLayout();
	const { vetaWallet } = useVetaIdentity();

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
						<ProfileCard profile={profile} />
					</Grid>
				))}
				<Grid item xs={12} sm={6} md={4}>
					<AddProfileCard />
				</Grid>
			</Grid>
		</>
	);
};

export default ProfilesPage;
