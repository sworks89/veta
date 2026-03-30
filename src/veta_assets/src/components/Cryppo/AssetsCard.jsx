import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
	Avatar,
	Button,
	CardActions,
	CardContent,
	Divider,
	Grid,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';

// project imports
import BajajAreaChartCard from '../BajajAreaChartCard';
import MainCard from '../../ui-component/cards/MainCard';
import SkeletonPopularCard from '../../ui-component/cards/Skeleton/PopularCard';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const AssetsCard = ({ isLoading, gridSpacing, assets = [] }) => {
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			{isLoading ? (
				<SkeletonPopularCard gridSpacing={gridSpacing} />
			) : (
				<MainCard content={false}>
					<CardContent>
						<Grid container spacing={gridSpacing}>
							<Grid item xs={12}>
								<Grid container alignContent='center' justifyContent='space-between'>
									<Grid item>
										<Typography variant='h4'>All Assets</Typography>
									</Grid>
									<Grid item>
										<MoreHorizOutlinedIcon
											fontSize='small'
											sx={{
												color: theme.palette.primary[200],
												cursor: 'pointer',
											}}
											aria-controls='menu-popular-card'
											aria-haspopup='true'
											onClick={handleClick}
										/>
										<Menu
											id='menu-popular-card'
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											onClose={handleClose}
											variant='selectedMenu'
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}>
											<MenuItem onClick={handleClose}> Manage Access</MenuItem>
											<MenuItem onClick={handleClose}> Refresh </MenuItem>
											<MenuItem onClick={handleClose}> Question? </MenuItem>
										</Menu>
									</Grid>
								</Grid>
							</Grid>
							{assets && assets.length > 0 ? (
								<Grid item xs={12}>
									{assets.map((transaction) => (
										<>
											<Grid container direction='column'>
												<Grid item>
													<Grid container alignItems='center' justifyContent='space-between'>
														<Grid item>
															<Typography variant='subtitle1' color='inherit'>
																Bajaj Finery
															</Typography>
														</Grid>
														<Grid item>
															<Grid container alignItems='center' justifyContent='space-between'>
																<Grid item>
																	<Typography variant='subtitle1' color='inherit'>
																		$1839.00
																	</Typography>
																</Grid>
																<Grid item>
																	<Avatar
																		variant='rounded'
																		sx={{
																			width: 16,
																			height: 16,
																			borderRadius: '5px',
																			backgroundColor: theme.palette.success.light,
																			color: theme.palette.success.dark,
																			ml: 2,
																		}}>
																		<KeyboardArrowUpOutlinedIcon fontSize='small' color='inherit' />
																	</Avatar>
																</Grid>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
												<Grid item>
													<Typography variant='subtitle2' sx={{ color: 'success.dark' }}>
														10% Profit
													</Typography>
												</Grid>
											</Grid>
											<Divider sx={{ my: 1.5 }} />
										</>
									))}
								</Grid>
							) : (
								<Grid item xs={12}>
									<Typography component='h6' variant='h6'>
										You have no assets.
									</Typography>
								</Grid>
							)}
						</Grid>
					</CardContent>
					{/* <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
						<Button size='small' disableElevation>
							View All
							<ChevronRightOutlinedIcon />
						</Button>
					</CardActions> */}
				</MainCard>
			)}
		</>
	);
};

AssetsCard.propTypes = {
	isLoading: PropTypes.bool,
};

export default AssetsCard;
