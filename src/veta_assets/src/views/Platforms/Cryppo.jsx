import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import MainCard from '../../ui-component/cards/MainCard';
// project imports
import EarningCard from '../../components/EarningCard';
import PopularCard from '../../components/PopularCard';
import TotalOrderLineChartCard from '../../components/TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../../components/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../components/TotalIncomeLightCard';
import TotalGrowthBarChart from '../../components/TotalGrowthBarChart';
import useMainLayout from '../../layout/MainLayout/MainLayoutContext';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const CryppoPlatformPage = () => {
	const { gridSpacing, customization } = useMainLayout();
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		// <MainCard title='Your Profile'>
		// 	<Typography variant='body2'>Profile Page</Typography>
		// </MainCard>
		<Grid container spacing={gridSpacing}>
			<Grid item xs={12}>
				<Grid container spacing={gridSpacing}>
					<Grid item lg={4} md={6} sm={6} xs={12}>
						<EarningCard isLoading={isLoading} />
					</Grid>
					<Grid item lg={4} md={6} sm={6} xs={12}>
						<TotalOrderLineChartCard isLoading={isLoading} />
					</Grid>
					<Grid item lg={4} md={12} sm={12} xs={12}>
						<Grid container spacing={gridSpacing}>
							<Grid item sm={6} xs={12} md={6} lg={12}>
								<TotalIncomeDarkCard isLoading={isLoading} />
							</Grid>
							<Grid item sm={6} xs={12} md={6} lg={12}>
								<TotalIncomeLightCard isLoading={isLoading} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={gridSpacing}>
					<Grid item xs={12} md={8}>
						<TotalGrowthBarChart
							isLoading={isLoading}
							gridSpacing={gridSpacing}
							customization={customization}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<PopularCard isLoading={isLoading} gridSpacing={gridSpacing} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CryppoPlatformPage;
