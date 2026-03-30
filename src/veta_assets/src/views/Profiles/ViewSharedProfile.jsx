import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ProfileCard from '../../components/ProfileCard';
import CircularProgress from '@mui/material/CircularProgress';
import * as VetaWalletServices from '../../services/VetaWalletServices.ic';

const ViewSharedProfile = () => {
	const { profileId } = useParams();
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		if (profileId) {
			fetchProfile(profileId);
		}
	}, [profileId]);

	const fetchProfile = async (id) => {
		const _profile = await VetaWalletServices.getSharedProfile(id);
		setProfile(_profile[0]);
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
			{profile !== null ? (
				<>{profile ? <ProfileCard readonly profile={profile} /> : <h3>Profile not found</h3>}</>
			) : (
				<CircularProgress />
			)}
		</Box>
	);
};

export default ViewSharedProfile;
