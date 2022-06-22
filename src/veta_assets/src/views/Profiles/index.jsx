// material-ui
import { Typography, Button } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { vetawallet } from '../../../../declarations/vetawallet';
import useVetaIdentity from '../../contexts/VetaIdentityContext';

// ==============================|| SAMPLE PAGE ||============================== //

const ProfilesPage = () => {
	const { signInByICProvider, signOut, principal, client, vetaWallet } = useVetaIdentity();

	const addDataToProfile = async (data) => {
		// userData.data.push(data);
		let res = await vetawallet.update(userData);
	};

	return (
		<MainCard title='Your Profile'>
			<Typography variant='body2'>Profile Page</Typography>
			{vetaWallet && vetaWallet.profiles.map(profile => (
				<>
					<p>{profile.profileName}</p>
					{profile.data.map(d => (
						<span>{`${Object.keys(d.dataCategory)}-${d.dataType} ${d.dataContent} Signature: (${d.signature})`}</span>
					))}
				</>
			))}
		</MainCard>
	)
};

export default ProfilesPage;
