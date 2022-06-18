import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project imports 
import Logo from '../../../assets/images/veta.svg';
import config from '../../../config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
	<ButtonBase disableRipple component={Link} to={config.defaultPath}>
		<Logo style={{width: '30px'}} />
		<Typography component="span" variant="h3" sx={{ml: 2}}>VETA</Typography>
	</ButtonBase>
);

export default LogoSection;
