import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
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

const SocialNetworkPlatformPage = () => {
	const { gridSpacing, customization } = useMainLayout();
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<>
			<Typography variant='h2' component='h2' sx={{ marginBottom: gridSpacing }}>
				Veta Social Network
			</Typography>
			<Grid container spacing={gridSpacing}>
				{' '}
				<Grid item xs={12} sm={6} md={8}>
					<Grid container spacing={gridSpacing}>
						<Grid item xs={12} sm={4}>
							<TotalIncomeDarkCard isLoading={isLoading} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<TotalIncomeLightCard isLoading={isLoading} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<TotalIncomeDarkCard isLoading={isLoading} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<TotalIncomeLightCard isLoading={isLoading} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<TotalIncomeDarkCard isLoading={isLoading} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<TotalIncomeLightCard isLoading={isLoading} />
						</Grid>{' '}
						<Grid item xs={12} sm={6}>
							<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
								<ListItem alignItems='flex-start'>
									<ListItemText
										primary={
											<Typography variant='h4' component='h4'>
												Personal Hobby
											</Typography>
										}
									/>
								</ListItem>
								<ListItem alignItems='flex-start'>
									<ListItemAvatar>
										<Avatar alt='Foot ball' src='/static/images/avatar/1.jpg' />
									</ListItemAvatar>
									<ListItemText primary='Football' />
								</ListItem>
								<Divider variant='inset' component='li' />
								<ListItem alignItems='flex-start'>
									<ListItemAvatar>
										<Avatar alt='Sleep' src='/static/images/avatar/2.jpg' />
									</ListItemAvatar>
									<ListItemText
										primary='Sleep'
										secondary={
											<>
												<Typography
													sx={{ display: 'inline' }}
													component='span'
													variant='body2'
													color='text.primary'>
													Life is short
												</Typography>
												{" — Wish I could come, but I'm out of town this…"}
											</>
										}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
								<ListItem alignItems='flex-start'>
									<ListItemAvatar>
										<Avatar alt='Cook' src='/static/images/avatar/3.jpg' />
									</ListItemAvatar>
									<ListItemText
										primary='Cook'
										secondary={
											<>
												<Typography
													sx={{ display: 'inline' }}
													component='span'
													variant='body2'
													color='text.primary'>
													Rice is life
												</Typography>
												{' — Do you have Kitchen recommendations? Have you ever…'}
											</>
										}
									/>
								</ListItem>
							</List>
						</Grid>{' '}
						<Grid item xs={12} sm={6}>
							<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
								<ListItem alignItems='flex-start'>
									<ListItemText
										primary={
											<Typography variant='h4' component='h4'>
												Career
											</Typography>
										}
									/>
								</ListItem>
								<ListItem alignItems='flex-start'>
									<ListItemAvatar>
										<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
									</ListItemAvatar>
									<ListItemText
										primary='Havard University'
										secondary={
											<>
												<Typography
													sx={{ display: 'inline' }}
													component='span'
													variant='body2'
													color='text.primary'>
													2020-2025
												</Typography>
												{" — I'll be in your neighborhood doing errands this…"}
											</>
										}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
								<ListItem alignItems='flex-start'>
									<ListItemAvatar>
										<Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
									</ListItemAvatar>
									<ListItemText
										primary='Emirates Aviation College'
										secondary={
											<>
												<Typography
													sx={{ display: 'inline' }}
													component='span'
													variant='body2'
													color='text.primary'>
													2010-2015
												</Typography>
												{" — Wish I could come, but I'm out of town this…"}
											</>
										}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
								<ListItem alignItems='flex-start'>
									<ListItemAvatar>
										<Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
									</ListItemAvatar>
									<ListItemText
										primary='Dubai Gems'
										secondary={
											<>
												<Typography
													sx={{ display: 'inline' }}
													component='span'
													variant='body2'
													color='text.primary'>
													2015-2020
												</Typography>
												{' — Do you have Paris recommendations? Have you ever…'}
											</>
										}
									/>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Grid container spacing={gridSpacing}>
						<Grid item xs={12}>
							<TotalOrderLineChartCard isLoading={isLoading} />
						</Grid>
						<Grid item xs={12}>
							<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
								<ListItem alignItems='flex-start'>
									<ListItemText
										primary={
											<Typography variant='h4' component='h4'>
												Study
											</Typography>
										}
									/>
								</ListItem>
								<ListItem alignItems='flex-start'>
									<ListItemAvatar>
										<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
									</ListItemAvatar>
									<ListItemText
										primary='Havard University'
										secondary={
											<>
												<Typography
													sx={{ display: 'inline' }}
													component='span'
													variant='body2'
													color='text.primary'>
													2020-2025
												</Typography>
												{" — I'll be in your neighborhood doing errands this…"}
											</>
										}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
								<ListItem alignItems='flex-start'>
									<ListItemAvatar>
										<Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
									</ListItemAvatar>
									<ListItemText
										primary='Emirates Aviation College'
										secondary={
											<>
												<Typography
													sx={{ display: 'inline' }}
													component='span'
													variant='body2'
													color='text.primary'>
													2010-2015
												</Typography>
												{" — Wish I could come, but I'm out of town this…"}
											</>
										}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
								<ListItem alignItems='flex-start'>
									<ListItemAvatar>
										<Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
									</ListItemAvatar>
									<ListItemText
										primary='Dubai Gems'
										secondary={
											<>
												<Typography
													sx={{ display: 'inline' }}
													component='span'
													variant='body2'
													color='text.primary'>
													2015-2020
												</Typography>
												{' — Do you have Paris recommendations? Have you ever…'}
											</>
										}
									/>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default SocialNetworkPlatformPage;
