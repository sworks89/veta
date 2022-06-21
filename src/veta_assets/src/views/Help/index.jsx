// material-ui
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import useMainLayout from '../../layout/MainLayout/MainLayoutContext';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

// ==============================|| SAMPLE PAGE ||============================== //

const HelpPage = () => {
	const { gridSpacing } = useMainLayout();

	return (
		<>
			<Typography variant='h2' component='h2' sx={{ marginBottom: gridSpacing }}>
				Data Generation
			</Typography>
			<Grid container spacing={gridSpacing}>
				<Grid item xs={12} md={4} lg={3}>
					<MainCard content={false}>
						<CardContent>
							<Typography component='h3' variant='h3'>
								Profile Generation
							</Typography>
							<Stack direction='column'>
								<Button size='small' variant='outlined'>
									Add Profile
								</Button>
							</Stack>
						</CardContent>
					</MainCard>
				</Grid>
				<Grid item xs={6} md={4} lg={3}>
					<MainCard content={false}>
						<CardContent>
							<Typography component='h3' variant='h3'>
								Cryppo
							</Typography>
							<Stack direction='column'>
								<Button size='small' variant='outlined' sx={{ my: 1 }}>
									Add Portfolio
								</Button>
								<Button size='small' variant='outlined' sx={{ my: 1 }}>
									Add Transactions
								</Button>
							</Stack>
						</CardContent>
					</MainCard>
				</Grid>
				<Grid item xs={6} md={4} lg={3}>
					<MainCard content={false}>
						<CardContent>
							<Typography component='h3' variant='h3'>
								Veta Network Data
							</Typography>
							<Stack direction='column'>
								<Button size='small' variant='outlined' sx={{ my: 1 }}>
									Add Hobby
								</Button>
								<Button size='small' variant='outlined' sx={{ my: 1 }}>
									Add Carrer
								</Button>
								<Button size='small' variant='outlined' sx={{ my: 1 }}>
									Add Study
								</Button>
								<Button size='small' variant='outlined' sx={{ my: 1 }}>
									Add Folower
								</Button>
								<Button size='small' variant='outlined' sx={{ my: 1 }}>
									Add Following
								</Button>
							</Stack>
						</CardContent>
					</MainCard>
				</Grid>
			</Grid>
		</>
	);
};

export default HelpPage;
