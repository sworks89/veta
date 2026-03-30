import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ProfileCard from '../../components/ProfileCard';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import * as VetaWalletServices from '../../services/VetaWalletServices.ic';

const ViewSharedProfile = () => {
	const { profileId } = useParams();
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (profileId) {
			fetchProfile(profileId);
		}
	}, [profileId]);

	const fetchProfile = async (id) => {
		try {
			const result = await VetaWalletServices.getSharedProfile(id);
			// Candid opt returns [value] or [] — extract the inner value
			const found = Array.isArray(result) ? result[0] : result;
			setProfile(found || false);
		} catch (e) {
			console.warn('Failed to fetch shared profile:', e);
			setError(e.message);
			setProfile(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100vw',
				height: '100vh',
			}}>
			{loading ? (
				<CircularProgress />
			) : profile ? (
				<ProfileCard readonly profile={profile} />
			) : (
				<Typography variant='h5' color='text.secondary'>
					{error ? 'Unable to load profile' : 'Profile not found'}
				</Typography>
			)}
		</Box>
	);
};

export default ViewSharedProfile;
